<template>
  <main class="pb-40">
    <page-heading title="Detalle rol" back-route="/roles" :breadcrumbs="breadcrumbs">
      <template slot="actions">
        <custom-button
          v-if="role.type !== 'superadmin' && role.type !== 'admin'"
          title="Editar"
          color="white"
          size="small"
          class="mr-2"
          :to="`/roles/${role.id}/edit`"
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
              <path
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </template>
        </custom-button>
        <custom-button
          v-if="role.type !== 'superadmin' && role.type !== 'admin'"
          title="Eliminar"
          color="secondary"
          size="small"
          @click="showDeleteModal = true"
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
              <path
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </template>
        </custom-button>
      </template>
    </page-heading>
    <section v-if="role">
      <div class="overflow-hidden bg-white border border-gray-100 shadow sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-100 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Rol #{{ role.id }}
          </h3>
          <p class="max-w-2xl mt-1 text-sm leading-5 text-gray-500">
            Información general de rol.
          </p>
        </div>
        <div>
          <dl>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Nombre
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {{ role.name }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Tipo
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {{ typesList.find((type) => type.id === role.type).name || 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Permisos
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <div class="mt-5 mb-4 md:mt-0 md:col-span-2">
                  <div class="grid grid-cols-6 row-gap-2 col-gap-6">
                    <div v-if="role.permissions && role.permissions.length > 0" class="col-span-6 mt-4 sm:col-span-4">
                <span
                  v-for="(permission, index) in role.permissions"
                  :key="index"
                  class="inline-flex px-3 py-2 mb-2 mr-2 text-xs font-semibold leading-5 text-green-700 bg-green-100 rounded-full"
                >{{ permission.name }}</span>
                    </div>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
    <delete-item
      :show="showDeleteModal"
      :title="role.name"
      @update:show="showDeleteModal = false"
      @action="deleteItem"
    />
    <confirmation-modal
      :show="showConfirmationModal"
      title="Role Eliminado"
      @update:show="showConfirmationModal = false"
      @action="redirectBack"
    />
    <loading :active="isRolesLoading" :is-full-page="false" />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ActionMethod } from 'vuex';
import PageHeading from '@/components/layout/PageHeading.vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import ActiveIndicator from '@/components/ui/ActiveIndicator.vue';
import DeleteItem from '@/components/general/DeleteItem.vue';
import ConfirmationModal from '@/components/general/ConfirmationModal.vue';
import Loading from '@/components/ui/Loading.vue';

interface Breadcrumb {
  name: string;
  route?: string;
}

const Roles = namespace('roles');

@Component({
  components: {
    PageHeading,
    CustomButton,
    ActiveIndicator,
    DeleteItem,
    ConfirmationModal,
    Loading,
  },
})
export default class ShowRolePage extends Vue {
  breadcrumbs: Breadcrumb[] = [
    { name: 'Administración' },
    { name: 'Roles', route: '/roles' },
    { name: 'Detalle' },
  ]

  typesList = [
    { id: 'superadmin', name: 'Superadmin' },
    { id: 'admin', name: 'Administrador' },
    { id: 'tutor', name: 'Tutor' },
  ]

  showConfirmationModal = false
  showDeleteModal = false

  @Roles.State('isLoading') isRolesLoading!: boolean
  @Roles.State('role') role!: Role
  @Roles.Action('show') fetchRole!: ({ id, vm }: { id: number; vm: any }) => ActionMethod
  @Roles.Action('destroy') deleteRole!: ({ id, vm }: { id: number; vm: any }) => ActionMethod

  async mounted() {
    const { id } = this.$route.params;
    await this.fetchRole({ id: +id, vm: this });
    if (!this.role.id) {
      this.redirectBack();
    }
  }

  async deleteItem() {
    await this.deleteRole({ id: this.role?.id, vm: this });
    this.showConfirmationModal = true;
  }

  formattedDate(date: Date) {
    if (date) {
      const newDate = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('es-US', options).format(newDate);
    }
  }

  redirectBack() {
    this.$router.push('/roles');
  }
}
</script>
