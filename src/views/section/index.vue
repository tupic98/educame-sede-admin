<template>
  <main class="pb-40">
    <page-heading
      title="Sección"
      :show-return="false"
      :breadcrumbs="breadcrumbs"
    >
      <template slot="actions">
        <custom-button title="Nueva sección" color="secondary" to="/section/new">
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
        :is-loading="isSectionLoading"
        :filters="filters"
        :total-items="meta.total"
        @filter-change="onFiltersChange"
        @select:all="selectAllCurrent"
        @unselect:all="selectAllCurrent"
      >
        <template slot="items">
          <table-item
            v-for="(section, index) in sections"
            :key="index"
            :item="section.id"
            :selected="selectedItems"
            :remove="false"
            page="section"
            @update:selected="setItems"
          >
            <td
              class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap"
            >
              <div class="flex items-center">
                <div class="">
                  <div class="text-sm font-medium leading-5 text-gray-900">
                    {{ section.id }}
                  </div>
                </div>
              </div>
            </td>
            <td
              class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
            >
              {{ section.name }}
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

const SectionModel = namespace('section');

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
export default class SectionPage extends Vue {
  selectedItems: Array<string | number> = []
  showDeleteModal = false
  showDeleteCompleted = false
  breadcrumbs: Breadcrumb[] = [{ name: 'Administración' }, { name: 'Sección' }]

  headers: Array<object> = [
    {
      name: 'ID',
      key: 'id',
    },
    {
      name: 'Nombre',
      key: 'name',
    },
  ]

  // eslint-disable-next-line @typescript-eslint/camelcase
  filters: Filters = { search: '', per_page: '10', page: 1 }
  selectedItem = 0
  @SectionModel.State('sections') sections!: Section[];
  @SectionModel.State('meta') meta!: Meta;
  @SectionModel.State('isLoading') isSectionLoading!: boolean;
  @SectionModel.Action('fetch') fetchSections!: ({ filters, vm }: { filters: Filters; vm: any }) => AxiosResponse;

  async mounted() {
    await this.fetchSections({ filters: this.filters, vm: this });
  }

  @Watch('filters', { deep: true })
  async handleFilterChange(value: Filters) {
    if (value) {
      await this.fetchSections({ filters: this.filters, vm: this });
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
      this.sections.forEach((item: any) => {
        this.selectedItems.push(item.id);
      });
    } else {
      this.selectedItems = [];
    }
  }
}
</script>
