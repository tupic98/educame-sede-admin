<template>
  <main class="pb-40">
    <page-heading title="Nuevo rol" back-route="/roles" :breadcrumbs="breadcrumbs" />
    <form-section>
      <ValidationObserver ref="form" tag="form" autocomplete="off" @submit.prevent="onSubmit">
        <div class="md:grid md:grid-cols-3 md:gap-8 ">
          <div class="md:col-span-1">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Rol
            </h3>
            <p
              class="mt-1 text-sm leading-5 text-gray-500"
            >
              Información del rol
            </p>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="grid grid-cols-6 row-gap-2 col-gap-6">
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="name"
                  name="nombre"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.name" label="Nombre" name="name" :error="errors[0]" />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="type"
                  name="tipo"
                  tag="div"
                  rules="required"
                >
                  <input-select
                    v-model="form.type"
                    label="Tipo"
                    placeholder="Seleccionar"
                    :options="typesList"
                    name="type"
                    display-name="name"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>
            </div>
          </div>
        </div>
        <div class="md:grid md:grid-cols-3 md:gap-8 ">
          <div class="md:col-span-1">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Permisos
            </h3>
            <p class="mt-1 text-sm leading-5 text-gray-500">
              Permisos a asignar
            </p>
          </div>
          <div class="mt-5 mb-4 md:mt-0 md:col-span-2">
            <div class="grid grid-cols-6 row-gap-2 col-gap-6">
              <div v-if="newRolePermissions && newRolePermissions.length > 0" class="col-span-6 mt-4 sm:col-span-4">
                <span
                  v-for="(permission, index) in newRolePermissions"
                  :key="index"
                  class="inline-flex px-3 py-2 mb-2 mr-2 text-xs font-semibold leading-5 text-green-700 bg-green-100 rounded-full"
                >{{ permission.name }}</span>
              </div>
            </div>
          </div>
          <div class="md:col-span-1" />
          <div class="mt-5 mb-4 md:mt-0 md:col-span-2">
            <div class="grid grid-cols-6 row-gap-2 col-gap-6">
              <div class="col-span-6 mt-4 sm:col-span-4">
                <custom-button
                  type="button"
                  color="secondary"
                  title="Asignar permisos"
                  @click="showPermissionsModal = true"
                >
                  <template #icon>
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 4v16m8-8H4" />
                    </svg>
                  </template>
                </custom-button>
              </div>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </form-section>
    <div class="w-full">
      <div class="flex items-center justify-end">
        <custom-button type="submit" class="ml-2" title="Guardar" :loading="isRolesLoading" @click.prevent="onSubmit" />
      </div>
    </div>
    <permissions-modal
      :show="showPermissionsModal"
      :new-permissions="newPermissions"
      :list="permissionsList"
      @update:show="showPermissionsModal = false"
      @update-permissions="updateNewPermissions"
    />
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ActionMethod } from 'vuex';
import { namespace } from 'vuex-class';
import PageHeading from '@/components/layout/PageHeading.vue';
import FormSection from '@/components/ui/FormSection.vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import ToggleSelector from '@/components/ui/ToggleSelector.vue';
import InputSelect from '@/components/ui/InputSelect.vue';
import InputGroup from '@/components/ui/InputGroup.vue';
import InputMask from '@/components/ui/InputMask.vue';
import PermissionsModal from '@/components/general/PermissionsModal.vue';

interface Breadcrumb {
  name: string;
  route?: string;
}

const RoleModel = namespace('roles');
const PermissionModel = namespace('permissions');

@Component({
  components: {
    PageHeading,
    FormSection,
    CustomButton,
    ToggleSelector,
    InputSelect,
    InputGroup,
    InputMask,
    PermissionsModal,
  },
})
export default class NewUserPage extends Vue {
  showPermissionsModal = false;
  newPermissions: Array<number> = [];
  newRolePermissions: Permission[] = [];
  form = {
    name: '',
    type: '',
    permissionId: [],
  }

  typesList = [
    { id: 'superadmin', name: 'Superadmin' },
    { id: 'admin', name: 'Administrador' },
    { id: 'tutor', name: 'Tutor' },
  ]

  breadcrumbs: Breadcrumb[] = [
    { name: 'Administración' },
    { name: 'Roles', route: '/roles' },
    { name: 'Nuevo' },
  ]

  @RoleModel.State('isLoading') isRolesLoading!: boolean;
  @RoleModel.Action('store') createRole!: ({ role, vm }: { role: any; vm: any }) => ActionMethod;
  @PermissionModel.Action('list') fetchPermissionsList!: (vm: any) => ActionMethod;
  @PermissionModel.State('isLoading') isPermissionsLoading!: boolean;
  @PermissionModel.State('permissionsList') permissionsList!: Permission[];

  async mounted() {
    try {
      await this.fetchPermissionsList(this);
    } catch (e) {
      this.$snotify.error('Ha ocurrido un error');
    }
  }

  @Watch('newPermissions', { immediate: true, deep: true })
  handleNewPermissionChange(value: Array<number>) {
    if (value && this.permissionsList) {
      this.newRolePermissions = this.permissionsList.filter((permission: Permission) => value.includes(permission.id));
    }
  }

  updateNewPermissions(value: Array<number>) {
    this.newPermissions = value;
  }

  async onSubmit() {
    const isValid = await (this.$refs.form as any).validate();
    if (isValid) {
      try {
        this.$set(this.form, 'permissionId', this.newPermissions);
        await this.createRole({ role: this.form, vm: this });
        this.$router.push('/roles');
        // eslint-disable-next-line no-empty
      } catch (e) {
      }
    }
  }
}
</script>
