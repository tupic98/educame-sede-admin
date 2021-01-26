<template>
  <div class="mb-4 space-y-1">
    <div class="flex w-full justify-between">
      <label
        :for="id"
        class="block text-sm font-medium leading-5 text-gray-700"
      >{{ label }}</label>
      <span v-if="optional" class="text-sm text-gray-500">Opcional</span>
    </div>
    <p v-if="description" class="mb-4 text-sm leading-5 text-gray-500">
      {{ description }}
    </p>
    <div v-click-outside="closeList" class="relative">
      <div
        aria-haspopup="listbox"
        aria-expanded="true"
        :aria-labelledby="id"
        class="relative inline-block w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-md sm:leading-5"
        :class="{
          'border-red-300  placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : error,
          'bg-gray-100 border-gray-400 text-gray-400 cursor-not-allowed focus:outline-none focus:shadow-outline-gray focus:border-gray-400': disable
        }"
      >
        <div class="relative flex items-center">
          <span
            class="absolute left-0 z-10 flex-shrink-0 block leading-5 truncate"
            :class="{'text-gray-400' : !inputValue}"
          >{{ inputValue ? (options.find(option => option.id === inputValue )|| {name:placeholder})[displayName] : placeholder }}</span>
          <input
            v-model="inputSearch"
            :disabled="disable"
            type="string"
            class="z-20 w-full pr-10 text-left transition duration-150 ease-in-out rounded-md focus:outline-none sm:text-md sm:leading-5"
            :class="[showList ? 'bg-white' : 'bg-transparent']"
            @focus="disable ? '' : showList=true"
            @keydown.enter.prevent
            @keyup="disable ? '' : showList=true"
          >
        </div>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-400"
            :class="{'text-red-300' : error}"
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
        </span>
      </div>

      <div v-show="showList && !disable" class="absolute z-40 w-full mt-1 bg-white rounded-md shadow-lg">
        <ul
          v-if="selectOptions.length"
          tabindex="-1"
          role="listbox"
          :aria-labelledby="id"
          aria-activedescendant="listbox-item-3"
          class="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-40 focus:outline-none sm:text-sm sm:leading-5"
        >
          <li
            v-for="(item, index) in selectOptions"
            id="listbox-option-0"
            :key="index"
            role="option"
            class="relative py-2 pl-3 text-gray-900 cursor-pointer select-none pr-9 hover:bg-blue-600 hover:text-white group"
            @click="inputValue = item.id"
          >
            <div
              class="block text-base font-normal truncate"
              :class="{'font-semibold': inputValue === item.id, 'inline-flex': item.type && showType}"
            >
              {{ item[displayName] }}
              <span
                v-if="item.type && showType"
                class="block text-xs font-light truncate"
              > &nbsp; {{ `- ${item.type}` }}</span>
            </div>

            <span
              v-show="inputValue === item.id"
              class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-500 group-hover:text-white"
            >
              <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>
        </ul>
        <div v-else class="py-2 text-center text-gray-400">
          <p>Sin resultados</p>
        </div>
      </div>
    </div>
    <p v-if="error" id="email-error" class="mt-1 text-xs text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Model,
  Watch,
  Emit,
} from 'vue-property-decorator';

@Component
export default class InputSelect extends Vue {
  showList = false
  inputValue: any = null
  inputSearch = ''
  selectOptions: Array<object> = []

  @Prop({ type: Boolean, default: false }) readonly showType!: boolean
  @Prop(String) readonly id!: string
  @Prop(String) readonly label!: string
  @Prop(String) readonly description!: string
  @Prop(String) readonly placeholder!: string
  @Prop(String) readonly searchableField!: string
  @Prop({ type: Boolean, default: false }) readonly optional!: boolean
  @Prop({ type: Array, default: () => [] }) readonly options!: Array<object>
  @Prop({ type: Boolean, default: false }) readonly disable!: boolean
  @Prop({ type: String, default: 'name' }) readonly displayName!: string
  @Prop({ type: [String, Boolean], default: false }) readonly error!:
    | string
    | boolean

  @Model('input') value!: any

  @Watch('value')
  handlePropValue(value: string) {
    this.inputValue = value;
  }

  @Watch('inputValue')
  handleValue(value: string) {
    this.showList = false;
    this.inputSearch = '';
    this.emitValue(value);
  }

  @Watch('inputSearch')
  handleInputSearch(value: string) {
    try {
      if (this.options.length) {
        if (Boolean(value) === false) {
          this.selectOptions = this.options
            .sort((a: any, b: any) => a[this.searchableField].length - b[this.searchableField].length)
            .slice(0, 20);
        } else {
          this.selectOptions = this.options.filter((option: any) => option[this.searchableField].toLowerCase().includes(value.toLowerCase()))
            .sort((a: any, b: any) => a[this.searchableField].length - b[this.searchableField].length)
            .slice(0, 20);
        }
      }
    } catch (error) {
      this.selectOptions = [];
    }
  }

  @Watch('options', { immediate: true, deep: true })
  handleOptionsChange(value: Array<object>) {
    this.$set(this, 'selectOptions', JSON.parse(JSON.stringify(value.slice(0, 20))));
  }

  @Emit('input')
  emitValue(value: string) {
    return value;
  }

  mounted() {
    this.inputValue = this.value;
    this.selectOptions = this.options
      .slice(0, 20);
  }

  closeList() {
    this.inputSearch = '';
    this.showList = false;
  }

  leaveInput() {
    this.inputSearch = '';
  }
}
</script>
