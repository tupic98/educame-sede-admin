<template>
  <main class="pb-40">
    <page-heading
      title="Estudiantes"
      :show-return="false"
      :breadcrumbs="breadcrumbs"
    >
      <template slot="actions">
        <custom-button title="Nuevo estudiante" color="secondary" to="/students/new">
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
        :is-loading="isStudentsLoading"
        :filters="filters"
        :total-items="meta.total"
        @filter-change="onFiltersChange"
        @select:all="selectAllCurrent"
        @unselect:all="selectAllCurrent"
      >
        <template slot="items">
          <table-item
            v-for="(student, index) in students"
            :key="index"
            :item="student.id"
            :selected="selectedItems"
            page="students"
            @update:selected="setItems"
            @delete="deleteItem"
          >
            <td
              class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap"
            >
              {{ student.code }}
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
            >
              <div class="flex items-center">
                <div class="">
                  <div class="text-sm font-medium leading-5 text-gray-900">
                    {{ (`${student.person.firstName} ${student.person.lastName}`) }}
                  </div>
                </div>
              </div>
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
            >
              {{ student.grade ? student.grade.grade : 'N/A' }}
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
            >
              {{ student.section ? student.section.name : 'N/A' }}
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-center text-gray-500 whitespace-no-wrap inline-flex justify-center items-center"
            >
              <active-indicator :status="Boolean(student.approved)" />
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
            >
              {{ student.year }}
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-center text-gray-500 whitespace-no-wrap inline-flex justify-center items-center"
            >
              <active-indicator :status="Boolean(student.person.status)" />
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

const Students = namespace('students');

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
export default class StudentsPage extends Vue {
  selectedItems: Array<string | number> = []
  showDeleteModal = false
  showDeleteCompleted = false
  breadcrumbs: Breadcrumb[] = [{ name: 'Administración' }, { name: 'Estudiantes' }]

  headers: Array<object> = [
    {
      name: 'Código',
      key: 'code',
    },
    {
      name: 'Nombre',
      key: 'name',
    },
    {
      name: 'Grado',
      key: 'grade',
    },
    {
      name: 'Sección',
      key: 'section',
    },
    {
      name: 'Aprobado',
      key: 'approved',
    },
    {
      name: 'Año',
      key: 'year',
    },
    {
      name: 'Activo',
      key: 'status',
    },
  ]

  // eslint-disable-next-line @typescript-eslint/camelcase
  filters: Filters = { search: '', per_page: '30', page: 1 }
  selectedItem = 0
  @Students.State('students') students!: Student[]
  @Students.State('meta') meta!: Meta
  @Students.State('isLoading') isStudentsLoading!: boolean
  @Students.Action('fetch') fetchStudents!: ({ filters, vm }: { filters: Filters; vm: any }) => ActionMethod
  @Students.Action('destroy') deleteStudent!: ({ id, vm }: { id: number; vm: any }) => ActionMethod

  async mounted() {
    await this.fetchStudents({ filters: this.filters, vm: this });
  }

  @Watch('filters', { deep: true })
  async handleFilterChange(value: Filters) {
    if (value) {
      await this.fetchStudents({ filters: this.filters, vm: this });
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
      this.students.forEach((item: any) => {
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
      await this.deleteStudent({ id: this.selectedItem, vm: this });
      await this.fetchStudents({ filters: this.filters, vm: this });

      this.showDeleteCompleted = true;
    }
  }
}
</script>
