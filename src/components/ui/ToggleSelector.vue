<template>
  <div>
    <label for="email" class="block text-sm font-medium leading-5 text-gray-700 mb-1">{{ label }}</label>
    <p v-if="description" class="text-sm leading-5 text-gray-500 mb-4">
      {{ description }}
    </p>
    <span
      role="checkbox"
      tabindex="0"
      aria-checked="false"
      class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline"
      :class="[inputValue ? `bg-${color}` : 'bg-gray-200', !disabled ? 'cursor-pointer' : 'cursor-not-allowed']"
      @click="!disabled ? inputValue = !inputValue : null"
    >
      <span
        aria-hidden="true"
        class="translate-x-0 relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
        :class="[inputValue ? 'translate-x-5' : 'translate-x-0']"
      >
        <span
          class="ease-in duration-200 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
          :class="[inputValue ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200']"
        >
          <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span
          class="opacity-0 ease-out duration-100 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
          :class="[inputValue ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100']"
        >
          <svg
            class="h-3 w-3"
            :class="`text-${color}`"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
            />
          </svg>
        </span>
      </span>
    </span>
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
export default class ToggleSelector extends Vue {
  inputValue = false
  @Prop(String) readonly label!: string
  @Prop(String) readonly description!: string
  @Prop({ type: String, default: 'blue-600' }) readonly color!: string
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  @Model('input') value!: boolean
  @Watch('inputValue')
  handleValue(newVal: boolean) {
    this.emitValue(newVal);
  }

  @Watch('value')
  handlePropValue(value: boolean) {
    this.inputValue = value;
  }

  @Emit('input')
  emitValue(value: boolean) {
    return value;
  }

  mounted() {
    this.inputValue = this.value;
  }
}
</script>
