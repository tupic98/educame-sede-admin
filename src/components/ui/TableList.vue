<template>
  <div
    class="flex flex-col overflow-x-auto"
    style="overflow-y: hidden"
    :class="[paddingOff ? 'padding-bottom: 0rem' : 'padding-bottom: 8rem']"
  >
    <div class="py-2 -my-2">
      <div v-if="totalItems" class="flex justify-end my-2">
        <p class="text-sm font-semibold tracking-wide text-right text-gray-500">
          Mostrando {{ currentPage }} - {{ filters.per_page }} de {{ totalItems }}
        </p>
      </div>
      <div
        class="relative inline-block min-w-full align-middle bg-white border border-gray-100 shadow sm:rounded-lg"
      >
        <div class="flex justify-between pr-4 my-2">
          <div class="flex items-center w-3/5">
            <form
              class="flex w-full px-2 bg-white rounded-md md:ml-0"
              @submit.prevent="onSearchChange"
            >
              <div class="flex w-3/4 rounded-md shadow-sm">
                <div class="relative flex-grow focus-within:z-10">
                  <input
                    v-model="search"
                    class="block w-full transition duration-150 ease-in-out rounded-none form-input rounded-l-md sm:text-sm sm:leading-5"
                    placeholder="Buscar"
                    @keyup.enter="onSearchChange"
                  >
                </div>
                <button
                  class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-r-md bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
                  type="submit"
                >
                  <svg
                    class="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div class="flex justify-end flex-grow w-2/5">
            <table-pages-filter @change="onFilterChange" />
            <button
              v-show="selected.length"
              id="options-menu"
              type="button"
              class="inline-flex items-center justify-center w-32 h-10 px-4 ml-1 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-gray-100 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              aria-haspopup="true"
              aria-expanded="true"
              @click="showOptions = !showOptions"
            >
              <svg
                class="w-5 h-5"
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
              <span class="ml-2 -mr-1">Eliminar</span>
            </button>
            <button
              v-show="selected.length && editable"
              id="options-menu"
              type="button"
              class="inline-flex items-center justify-center w-32 h-10 px-4 ml-1 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-gray-100 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              aria-haspopup="true"
              aria-expanded="true"
              @click="editSelected"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span class="ml-2 -mr-1">Editar</span>
            </button>
            <slot name="action" />
          </div>
        </div>
        <table class="min-w-full overflow-x-scroll">
          <thead>
          <tr>
<!--            <th class="border-b border-gray-200 bg-gray-50" />-->
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="px-6 py-3 border-b border-gray-200 bg-gray-50"
            >
              <button
                class="flex items-center text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase focus:outline-none"
                :class="{ 'cursor-not-allowed': !header.sort }"
                :disabled="!header.sort"
                @click="sortHeader(header)"
              >
                {{ header.name }}
                <svg
                  v-show="header.sort"
                  class="w-5 h-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </th>
            <th class="border-b border-gray-200 bg-gray-50" />
          </tr>
          </thead>
          <tbody>
          <slot name="items" />
          </tbody>
        </table>
        <div
          v-show="lastPage !== 1"
          class="flex items-center justify-between px-4 border-t border-gray-200 rounded-b-lg bg-gray-50"
        >
          <div class="flex flex-1 w-0">
            <button
              class="inline-flex items-center py-3 pr-1 -mt-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400"
              @click="currentPage > 1 ? newFilters.page-- : false"
            >
              <svg
                class="w-5 h-5 mr-3 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              Anterior
            </button>
          </div>
            <paginate
              v-model="newFilters.page"
              :page-count="lastPage"
              :page-range="3"
              :force-page="currentPage"
              :margin-pages="3"
              :prev-class="'hidden'"
              :next-class="'hidden'"
              :container-class="'pagination'"
              :page-class="'-mt-px border-t-2 border-transparent inline-flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150 mx-4'"
              :active-class="'text-blue-500'"
              :click-handler="clickCallback"
              :first-last-button="false"
            />
          <div class="flex justify-end flex-1 w-0">
            <button
              class="inline-flex items-center py-3 pl-1 -mt-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400"
              @click="currentPage < lastPage ? newFilters.page++ : false"
            >
              Siguiente
              <svg
                class="w-5 h-5 ml-3 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <loading :active="isLoading" :is-full-page="false" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch, Emit,
} from 'vue-property-decorator';
import TablePagesFilter from '@/components/ui/Table/TablePagesFilter.vue';
import Loading from '@/components/ui/Loading.vue';

interface Header {
  name: string;
  key: string;
  sort: boolean;
}

interface Filters {
  search: string;
  per_page: string;
  page: number;
  order?: string;
  order_by?: string;
  parent?: number;
}

@Component({
  components: {
    TablePagesFilter,
    Loading,
  },
})
export default class TableList extends Vue {
  isSelectedItems = false
  showOptions = false
  newFilters: Filters = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    search: '', per_page: '100', page: 1, parent: 0,
  }
  search = ''
  @Prop({
    default: () => ({
      // eslint-disable-next-line @typescript-eslint/camelcase
      search: '', per_page: '100', page: 1, parent: 0,
    }),
  })
  readonly filters!: Filters

  @Prop({ default: 1 }) lastPage!: number
  @Prop({ default: true }) editable!: boolean

  @Prop() totalItems!: number
  @Prop({ default: false }) isLoading!: boolean
  @Prop() nextPage!: string
  @Prop() paddingOff!: boolean
  @Prop() prevPage!: string
  @Prop(Array) readonly headers!: Array<object>
  @Prop({ type: Array, default: () => [] }) selected!: Array<string | number>

  @Watch('filters', { immediate: true, deep: true })
  handleFilterProp(value: Filters) {
    if (value) {
      this.$set(this, 'newFilters', value);
    }
  }

  @Watch('isSelectedItems')
  handleAllSelectedItems(value: boolean) {
    if (value) {
      this.$emit('select:all', value);
    } else {
      this.$emit('unselect:all', value);
    }
  }

  @Watch('showOptions')
  handleDeleteItems(value: boolean) {
    if (value) {
      this.$emit('delete');
    }
  }

  @Watch('newFilters.page')
  handlePageChange(value: number) {
    if (value) {
      this.$set(this.newFilters, 'page', value);
      this.$emit('filter-change', this.newFilters);
    }
  }

  @Emit('filter-change')
  onSearchChange() {
    this.$set(this.newFilters, 'page', 1);
    this.$set(this.newFilters, 'search', this.search);
    return this.newFilters;
  }

  @Emit('filter-change')
  onFilterChange(value: string) {
    this.$set(this.newFilters, 'page', 1);
    this.$set(this.newFilters, 'per_page', value);
    return this.newFilters;
  }

  @Emit('filter-change')
  clickCallback(pageNum: number) {
    this.$set(this.newFilters, 'page', pageNum);
    return this.newFilters;
  }

  get perPage() {
    return this.filters.per_page || '10';
  }

  get currentPage() {
    return this?.filters?.page || 1;
  }

  @Emit('filter-change')
  sortHeader(header: Header) {
    if (header.name === 'Estado') {
      this.$emit('status:change', true);
    } else if (this.newFilters.order_by && this.newFilters.order_by === header.key) {
      if (this.newFilters.order === 'ASC') {
        this.$set(this.newFilters, 'order', 'DESC');
      } else {
        this.$set(this.newFilters, 'order', 'ASC');
      }
    } else {
      this.$set(this.newFilters, 'order_by', header.key);
      this.$set(this.newFilters, 'order', 'ASC');
    }
    return this.newFilters;
  }

  setItems(value: boolean) {
    this.isSelectedItems = value;
  }

  unsetItems(value: boolean) {
    this.isSelectedItems = value;
  }

  editSelected() {
    this.$emit('edited');
  }
}
</script>
