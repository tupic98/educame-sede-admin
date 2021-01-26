<template>
  <div class="space-y-1">
    <label :id="id" class="block text-sm leading-5 font-medium text-gray-700">{{ label }}</label>
    <div v-click-outside="closeList" class="relative">
      <span class="inline-block w-full rounded-md shadow-sm">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          :aria-labelledby="id"
          class="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-md sm:leading-5"
          :class="{
            'border-red-300  placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : error,
            'bg-gray-100 border-gray-400 text-gray-400 cursor-not-allowed focus:outline-none focus:shadow-outline-gray focus:border-gray-400': disable
          }"
          @click="togleInput"
        >
          <span
            class="block truncate"
            :class="{'text-gray-400' : inputValue.length===0}"
          >{{ inputValue.length !== 0 ? inputValue.join(", ") : placeholder }}</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              class="h-5 w-5 text-gray-400"
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
        </button>
      </span>

      <div v-show="showList" class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-20">
        <ul
          tabindex="-1"
          role="listbox"
          :aria-labelledby="id"
          aria-activedescendant="listbox-item-3"
          class="max-h-40 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
        >
          <li
            v-for="(item, index) in options"
            id="listbox-option-0"
            :key="index"
            role="option"
            class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-600 hover:text-white group"
            @click="setValue(item.id)"
          >
            <span
              class="font-normal block truncate"
              :class="{'font-semibold': inputValue.findIndex(i=>i===item.id) >= 0 }"
            >{{ item.name }}</span>

            <span
              v-show="inputValue.findIndex(i=>i===item.id) >= 0"
              class="text-blue-500 absolute inset-y-0 right-0 flex items-center pr-4 group-hover:text-white"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>
        </ul>
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
export default class InputMultipleSelect extends Vue {
  showList = false
  inputValue: string[] = []

  @Prop(String) readonly id!: string
  @Prop(String) readonly label!: string
  @Prop(String) readonly placeholder!: string
  @Prop(Array) readonly options!: Array<object>
  @Prop({ type: Boolean, default: false }) readonly disable!: boolean
  @Prop({ type: [String, Boolean], default: false }) readonly error!:
    | string
    | boolean

  @Model('input') value!: any

  @Watch('inputValue')
  handleValue(newVal: string) {
    this.emitValue(newVal);
  }

  setValue(value: string) {
    const index = this.inputValue.findIndex((item) => item === value);
    if (index < 0) {
      this.inputValue.push(value);
    } else {
      this.inputValue.splice(index, 1);
    }
  }

  @Emit('input')
  emitValue(value: string) {
    return value;
  }

  mounted() {
    this.inputValue = this.value;
  }

  closeList() {
    this.showList = false;
  }

  togleInput() {
    if (!this.disable) {
      this.showList = !this.showList;
    }
  }
}
</script>
