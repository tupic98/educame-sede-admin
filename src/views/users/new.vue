<template>
  <main class="pb-40">
    <page-heading title="Nuevo usuario" back-route="/users" :breadcrumbs="breadcrumbs" />
    <form-section>
      <ValidationObserver ref="form" tag="form" autocomplete="off" @submit.prevent="onSubmit">
        <div class="md:grid md:grid-cols-3 md:gap-8 ">
          <div class="md:col-span-1">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Usuario
            </h3>
            <p
              class="mt-1 text-sm leading-5 text-gray-500"
            >
              Información del usuario
            </p>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="grid grid-cols-6 row-gap-2 col-gap-6">
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="username"
                  name="username"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.username" label="Username" name="username" :error="errors[0]" />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="name"
                  name="nombre"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.firstName" label="Nombres" name="name" :error="errors[0]" />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="lastname"
                  name="apellidos"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.lastName" label="Apellidos" name="lastname" :error="errors[0]" />
                </ValidationProvider>
              </div>

              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="password"
                  name="contraseña"
                  tag="div"
                  rules="required|min:8"
                >
                  <input-group
                    id="password"
                    v-model="form.password"
                    label="Contraseña"
                    type="password"
                    name="password"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="email"
                  name="correo electrónico"
                  tag="div"
                  rules="email"
                >
                  <input-group
                    id="signin-email"
                    v-model="form.email"
                    label="Correo electrónico"
                    name="email"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="phonenumber"
                  name="teléfono"
                  tag="div"
                  rules="min:8"
                >
                  <input-mask
                    id="phonenumber"
                    v-model="form.phoneNumber"
                    mask="####-####"
                    label="Número de teléfono"
                    name="phonenumber"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="altPhoneNumber"
                  name="correo electrónico"
                  tag="div"
                  rules="min:8"
                >
                  <input-mask
                    id="altphonenumber"
                    v-model="form.altPhoneNumber"
                    mask="####-####"
                    label="Número de teléfono alterno"
                    name="altPhoneNumber"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="role"
                  name="rol"
                  tag="div"
                  rules="required"
                >
                  <input-select
                    v-model="form.roleId"
                    label="Rol"
                    placeholder="Seleccionar"
                    :options="rolesList"
                    name="role"
                    display-name="name"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="sede"
                  name="sede"
                  tag="div"
                  rules="required"
                >
                  <input-select
                    v-model="form.sedeId"
                    label="Sede"
                    placeholder="Seleccionar"
                    :options="sedeList"
                    name="sede"
                    display-name="name"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <div v-if="currentRole() && (currentRole().type !== 'superadmin' && currentRole().type !== 'admin')" class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="subject"
                  name="materia"
                  tag="div"
                >
                  <input-select
                    v-model="form.subjectId"
                    label="Materia"
                    placeholder="Seleccionar"
                    :options="subjectList"
                    name="subject"
                    display-name="name"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <div class="col-span-6 sm:col-span-4">
                <toggle-selector v-model="form.status" label="Activo" />
              </div>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </form-section>
    <div class="w-full">
      <div class="flex items-center justify-end">
        <custom-button type="submit" class="ml-2" title="Guardar" :loading="isUserLoading" @click.prevent="onSubmit" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ActionMethod } from 'vuex';
import { namespace } from 'vuex-class';
import PageHeading from '@/components/layout/PageHeading.vue';
import FormSection from '@/components/ui/FormSection.vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import ToggleSelector from '@/components/ui/ToggleSelector.vue';
import InputSelect from '@/components/ui/InputSelect.vue';
import InputGroup from '@/components/ui/InputGroup.vue';
import InputMask from '@/components/ui/InputMask.vue';

interface Breadcrumb {
  name: string;
  route?: string;
}

const Users = namespace('users');
const RoleModel = namespace('roles');
const SedeModel = namespace('sede');
const SubjectModel = namespace('subject');

@Component({
  components: {
    PageHeading,
    FormSection,
    CustomButton,
    ToggleSelector,
    InputSelect,
    InputGroup,
    InputMask,
  },
})
export default class NewUserPage extends Vue {
  form = {
    username: '',
    email: '',
    phoneNumber: '',
    altPhoneNumber: '',
    firstName: '',
    lastName: '',
    sedeId: 0,
    password: '',
    roleId: 0,
    status: true,
    subjectId: 0,
  }

  breadcrumbs: Breadcrumb[] =[
    { name: 'Administración' },
    { name: 'Usuarios', route: '/users' },
    { name: 'Nuevo' },
  ]

  @RoleModel.State('rolesList') rolesList!: Role[];
  @RoleModel.Action('list') fetchRolesList!: (vm: any) => ActionMethod;
  @SubjectModel.State('subjectList') subjectList!: Subject[];
  @SubjectModel.Action('list') fetchSubjectsList!: (vm: any) => ActionMethod;
  @SedeModel.State('sedeList') sedeList!: Sede[];
  @SedeModel.Action('list') fetchSedeList!: (vm: any) => ActionMethod;
  @Users.State('isLoading') isUserLoading!: boolean;
  @Users.Action('store') createUser!: ({ user, vm }: { user: any; vm: any }) => ActionMethod;

  async mounted() {
    try {
      await this.fetchRolesList(this);
      await this.fetchSedeList(this);
      await this.fetchSubjectsList(this);
    } catch (e) {
      this.$snotify.error('Ha ocurrido un error');
    }
  }

  currentRole() {
    return this.rolesList.find((role) => role.id === this.form.roleId);
  }

  async onSubmit() {
    const isValid = await (this.$refs.form as any).validate();
    if (isValid) {
      try {
        await this.createUser({ user: this.form, vm: this });
        this.$router.push('/users');
        // eslint-disable-next-line no-empty
      } catch (e) {
      }
    }
  }
}
</script>
