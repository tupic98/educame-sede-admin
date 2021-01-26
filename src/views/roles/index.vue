<template>
  <main class="pb-40">
    <page-heading
      title="Roles"
      :show-return="false"
      :breadcrumbs="breadcrumbs"
    >
      <template slot="actions">
        <custom-button title="Nuevo rol" color="secondary" to="/roles/new">
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
        :is-loading="isRolesLoading"
        :filters="filters"
        :total-items="meta.total"
        @filter-change="onFiltersChange"
        @select:all="selectAllCurrent"
        @unselect:all="selectAllCurrent"
      >
        <template slot="items">
          <table-item
            v-for="(role, index) in roles"
            :key="index"
            :item="role.id"
            :selected="selectedItems"
            :edit="role.type !== 'superadmin' && role.type !== 'admin'"
            :remove="role.type !== 'superadmin' && role.type !== 'admin'"
            page="roles"
            @update:selected="setItems"
            @delete="deleteItem"
          >
            <td
              class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap"
            >
              <div class="flex items-center">
                <div class="">
                  <div class="text-sm font-medium leading-5 text-gray-900">
                    {{ role.id }}
                  </div>
                </div>
              </div>
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
            >
              {{ role.name }}
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
            >
              {{ role.type }}
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-center text-gray-500 whitespace-no-wrap inline-flex justify-center items-center"
            >
              {{ role.permissions && role.permissions ? role.permissions.length : '0' }}
            </td>
          </table-item>
        </template>
      </table-list>
    </section>
    <delete-item
      :show="showDeleteModal"
      title="rol"
      @update:show="showDeleteModal = false"
      @action="deleteComplete"
    />
    <confirmation-modal
      :show="showDeleteCompleted"
      title="Rol eliminado"
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
import { AxiosResponse } from 'axios';

interface Breadcrumb {
  name: string;
  route?: string;
}

const Roles = namespace('roles');

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
export default class RolesPage extends Vue {
  selectedItems: Array<string | number> = []
  showDeleteModal = false
  showDeleteCompleted = false
  breadcrumbs: Breadcrumb[] = [{ name: 'Administración' }, { name: 'Roles' }]

  headers: Array<object> = [
    {
      name: 'ID',
      key: 'id',
    },
    {
      name: 'Nombre',
      key: 'name',
    },
    {
      name: 'Tipo',
      key: 'type',
    },
    {
      name: 'Cantidad de permisoss',
      key: 'permissions',
    },
  ]

  // eslint-disable-next-line @typescript-eslint/camelcase
  filters: Filters = { search: '', per_page: '10', page: 1 }
  selectedItem = 0
  @Roles.State('roles') roles!: Role[];
  @Roles.State('meta') meta!: Meta;
  @Roles.State('isLoading') isRolesLoading!: boolean;
  @Roles.Action('fetch') fetchRoles!: ({ filters, vm }: { filters: Filters; vm: any }) => AxiosResponse;
  @Roles.Action('destroy') deleteRole!: ({ id, vm }: { id: number; vm: any }) => AxiosResponse;

  async mounted() {
    await this.fetchRoles({ filters: this.filters, vm: this });
  }

  @Watch('filters', { deep: true })
  async handleFilterChange(value: Filters) {
    if (value) {
      await this.fetchRoles({ filters: this.filters, vm: this });
    }
  }

  get lastPage() {
    return Math.ceil(this.meta?.total / this.meta?.per_page) || 1;
  }

  onFiltersChange(value: Filters) {
    this.filters = value;
  }

  setItems(value: Array<string | number>) {
    this.selectedItems = value;
  }

  selectAllCurrent(value: boolean) {
    if (value) {
      this.roles.forEach((item: any) => {
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
      await this.deleteRole({ id: this.selectedItem, vm: this });
      await this.fetchRoles({ filters: this.filters, vm: this });

      this.showDeleteCompleted = true;
    }
  }
}
</script>
