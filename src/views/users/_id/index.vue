<template>
  <main class="pb-40">
    <page-heading title="Detalle usuario" back-route="/users" :breadcrumbs="breadcrumbs">
      <template slot="actions">
        <custom-button
          v-if="user.role.type !== 'superadmin'"
          title="Editar"
          color="white"
          size="small"
          class="mr-2"
          :to="`/users/${user.id}/edit`"
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
          v-if="user.role.type !== 'superadmin' && user.role.type !== 'admin'"
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
    <section v-if="user">
      <div class="overflow-hidden bg-white border border-gray-100 shadow sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-100 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Usuario #{{ user.id }}
          </h3>
          <p class="max-w-2xl mt-1 text-sm leading-5 text-gray-500">
            Información general de usuario.
          </p>
        </div>
        <div>
          <dl>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Nombres
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {{ user.firstName }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Apellidos
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {{ user.lastName }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Nombre de usuario
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {{ user.username }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Número de teléfono
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ user.phoneNumber ? user.phoneNumber : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Número de teléfono alternativo
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ user.altPhoneNumber ? user.altPhoneNumber : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Correo electrónico
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ user.email ? user.email : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Rol
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ user.role && user.role.name ? user.role.name : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Tipo de rol
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ user.role && user.role.type ? user.role.type : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Activo
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <active-indicator :status="Boolean(user.status)" />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
    <delete-item
      :show="showDeleteModal"
      :title="`${user.firstName} ${user.lastName}`"
      @update:show="showDeleteModal = false"
      @action="deleteItem"
    />
    <confirmation-modal
      :show="showConfirmationModal"
      title="Usuario Eliminado"
      @update:show="showConfirmationModal = false"
      @action="redirectBack"
    />
    <loading :active="isUserLoading" :is-full-page="false" />
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

const Users = namespace('users');

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
export default class ShowUserPage extends Vue {
  breadcrumbs: Breadcrumb[] = [
    { name: 'Administración' },
    { name: 'Usuarios', route: '/users' },
    { name: 'Detalle' },
  ]

  showConfirmationModal = false
  showDeleteModal = false

  @Users.State('isLoading') isUserLoading!: boolean
  @Users.State('user') user!: User
  @Users.Action('show') fetchUser!: ({ id, vm }: { id: number; vm: any }) => ActionMethod
  @Users.Action('destroy') deleteUser!: ({ id, vm }: { id: number; vm: any }) => ActionMethod

  async mounted() {
    const { id } = this.$route.params;
    await this.fetchUser({ id, vm: this });
    if (!this.user.id) {
      this.redirectBack();
    }
  }

  async deleteItem() {
    await this.deleteUser(this.user?.id);
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
    this.$router.push('/users');
  }
}
</script>
