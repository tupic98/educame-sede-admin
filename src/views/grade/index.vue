<template>
  <main class="pb-40">
    <page-heading
      title="Grado"
      :show-return="false"
      :breadcrumbs="breadcrumbs"
    >
      <template slot="actions">
        <custom-button title="Nuevo grado" color="secondary" to="/grade/new">
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
        :is-loading="isGradeLoading"
        :filters="filters"
        :total-items="meta.total"
        @filter-change="onFiltersChange"
        @select:all="selectAllCurrent"
        @unselect:all="selectAllCurrent"
      >
        <template slot="items">
          <table-item
            v-for="(grade, index) in grades"
            :key="index"
            :item="grade.id"
            :selected="selectedItems"
            :remove="false"
            page="grade"
            @update:selected="setItems"
          >
            <td
              class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap"
            >
              <div class="flex items-center">
                <div class="">
                  <div class="text-sm font-medium leading-5 text-gray-900">
                    {{ grade.id }}
                  </div>
                </div>
              </div>
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
            >
              {{ grade.grade }}
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
            >
              {{ Number(grade.externalPercentage) * 100 }}%
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-center text-gray-500 whitespace-no-wrap inline-flex justify-center items-center"
            >
              {{ Number(grade.institutionalPercentage) * 100 }}%
            </td>
          </table-item>
        </template>
      </table-list>

    </section>
  </main>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import PageHeading from '@/components/layout/PageHeading.vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import TableList from '@/components/ui/TableList.vue';
import ConfirmationModal from '@/components/general/ConfirmationModal.vue';
import TableItem from '@/components/ui/Table/TableItem.vue';
import ActiveIndicator from '@/components/ui/ActiveIndicator.vue';
import { AxiosResponse } from 'axios';

interface Breadcrumb {
  name: string;
  route?: string;
}

const GradeModel = namespace('grade');

@Component({
  components: {
    PageHeading,
    CustomButton,
    TableList,
    ConfirmationModal,
    TableItem,
    ActiveIndicator,
  },
})
export default class GradePage extends Vue {
  selectedItems: Array<string | number> = []
  showDeleteModal = false
  showDeleteCompleted = false
  breadcrumbs: Breadcrumb[] = [{ name: 'Administración' }, { name: 'Grado' }]

  headers: Array<object> = [
    {
      name: 'ID',
      key: 'id',
    },
    {
      name: 'Grado',
      key: 'grade',
    },
    {
      name: '% Externo',
      key: 'externalPercentage',
    },
    {
      name: '% Institucional',
      key: 'institutionalPercentage',
    },
  ]

  // eslint-disable-next-line @typescript-eslint/camelcase
  filters: Filters = { search: '', per_page: '10', page: 1 }
  selectedItem = 0
  @GradeModel.State('grades') grades!: Grade[];
  @GradeModel.State('meta') meta!: Meta;
  @GradeModel.State('isLoading') isGradeLoading!: boolean;
  @GradeModel.Action('fetch') fetchGrades!: ({ filters, vm }: { filters: Filters; vm: any }) => AxiosResponse;

  async mounted() {
    await this.fetchGrades({ filters: this.filters, vm: this });
  }

  @Watch('filters', { deep: true })
  async handleFilterChange(value: Filters) {
    if (value) {
      await this.fetchGrades({ filters: this.filters, vm: this });
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
      this.grades.forEach((item: any) => {
        this.selectedItems.push(item.id);
      });
    } else {
      this.selectedItems = [];
    }
  }
}
</script>
