<template>
  <main class="pb-40">
    <page-heading
      title="Usuarios"
      :show-return="false"
      :breadcrumbs="breadcrumbs"
    >
      <template slot="actions">
        <custom-button title="Nuevo usuario" color="secondary" to="/users/new">
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
      </template>
    </page-heading>
    <section>
      <table-list
        :headers="headers"
        :selected="selectedItems"
        :current-page="filters.page"
        :last-page="lastPage"
        :per-page="filters.per_page"
        :is-loading="isUsersLoading"
        :filters="filters"
        :total-items="meta.total"
        @filter-change="onFiltersChange"
        @select:all="selectAllCurrent"
        @unselect:all="selectAllCurrent"
      >
        <template slot="items">
          <table-item
            v-for="(user, index) in users"
            :key="index"
            :item="user.id"
            :selected="selectedItems"
            :edit="user.role.type !== 'superadmin'"
            :remove="user.role.type !== 'superadmin' && user.role.type !== 'admin'"
            page="users"
            @update:selected="setItems"
            @delete="deleteItem"
          >
            <td
              class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap"
            >
              <div class="flex items-center">
                <div class="">
                  <div class="text-sm font-medium leading-5 text-gray-900">
                    {{ (`${user.firstName} ${user.lastName}`)| truncate(20) }}
                  </div>
                </div>
              </div>
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
            >
              {{ user.email }}
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
            >
              {{ user.role ? user.role.name : 'N/A'}}
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-center text-gray-500 whitespace-no-wrap inline-flex justify-center items-center"
            >
              <active-indicator :status="Boolean(user.status)" />
            </td>
          </table-item>
        </template>
      </table-list>
    </section>
    <delete-item
      :show="showDeleteModal"
      title="usuario"
      @update:show="showDeleteModal = false"
      @action="deleteComplete"
    />
    <confirmation-modal
      :show="showDeleteCompleted"
      title="Usuario eliminado"
      @update:show="showDeleteCompleted = false"
    />
  </main>
</template>

<script lang="ts">
import {
  Vue, Component, Watch,
} from 'vue-property-decorator';
import { ActionMethod } from 'vuex';
import { namespace } from 'vuex-class';
import PageHeading from '@/components/layout/PageHeading.vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import TableList from '@/components/ui/TableList.vue';
import DeleteItem from '@/components/general/DeleteItem.vue';
import ConfirmationModal from '@/components/general/ConfirmationModal.vue';
import TableItem from '@/components/ui/Table/TableItem.vue';
import ActiveIndicator from '@/components/ui/ActiveIndicator.vue';

interface Breadcrumb {
  name: string;
  route?: string;
}

const Roles = namespace('roles');
const Users = namespace('users');

@Component({
  components: {
    PageHeading,
    CustomButton,
    TableList,
    DeleteItem,
    ConfirmationModal,
    TableItem,
    ActiveIndicator,
  },
})
export default class UsersPage extends Vue {
  selectedItems: Array<string | number> = []
  showDeleteModal = false
  showDeleteCompleted = false
  breadcrumbs: Breadcrumb[] = [{ name: 'Administración' }, { name: 'Usuarios' }]

  headers: Array<object> = [
    {
      name: 'Nombre',
      key: 'name',
    },
    {
      name: 'Correo Electrónico',
      key: 'email',
    },
    {
      name: 'Rol',
      key: 'role',
    },
    {
      name: 'Activo',
      key: 'active',
    },
  ]

  // eslint-disable-next-line @typescript-eslint/camelcase
  filters: Filters = { search: '', per_page: '10', page: 1 }
  selectedItem = 0
  @Users.State('users') users!: User[]
  @Users.State('meta') meta!: Meta
  @Users.State('isLoading') isUsersLoading!: boolean
  @Users.Action('fetch') fetchUsers!: ({ filters, vm }: { filters: Filters; vm: any }) => ActionMethod
  @Users.Action('destroy') deleteUser!: ({ id, vm }: { id: number; vm: any }) => ActionMethod
  @Roles.Action('list') fetchRolesList!: (vm: any) => ActionMethod

  async mounted() {
    await this.fetchUsers({ filters: this.filters, vm: this });
    await this.fetchRolesList(this);
  }

  @Watch('filters', { deep: true })
  async handleFilterChange(value: Filters) {
    if (value) {
      await this.fetchUsers({ filters: this.filters, vm: this });
    }
  }

  get lastPage() {
    return Math.ceil(+this.meta?.total / +this.meta?.per_page) || 1;
  }

  onFiltersChange(value: Filters) {
    this.filters = value;
  }

  setItems(value: Array<string | number>) {
    this.selectedItems = value;
  }

  selectAllCurrent(value: boolean) {
    if (value) {
      this.users.forEach((item: any) => {
        this.selectedItems.push(item.id);
      });
    } else {
      this.selectedItems = [];
    }
  }

  deleteItem(id: number) {
    this.showDeleteModal = true;
    this.selectedItem = id;
  }

  async deleteComplete() {
    if (this.selectedItem !== 0) {
      await this.deleteUser({ id: this.selectedItem, vm: this });
      await this.fetchUsers({ filters: this.filters, vm: this });

      this.showDeleteCompleted = true;
    }
  }
}
</script>
