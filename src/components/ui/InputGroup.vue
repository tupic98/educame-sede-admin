<template>
  <div :class="noMargin ? 'mb-0' : 'mb-4'">
    <div class="flex w-full justify-between">
      <label
        :for="id"
        class="block text-sm font-medium leading-5 text-gray-700"
      >{{ label }}</label>
      <span v-if="optional" class="text-sm text-gray-500">Opcional</span>
    </div>
    <p v-if="description" class="mb-1 text-sm leading-5 text-gray-500">
      {{ description }}
    </p>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        :id="id"
        v-model="inputValue"
        :type="showPassword ? 'text' : type"
        class="block w-full form-input focus:shadow-outline sm:text-md sm:leading-5"
        :class="{
          'border-red-300  placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : error,
          'bg-gray-100 text-gray-400 cursor-not-allowed': disabled,
          'pr-10': error}"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        aria-invalid="true"
        aria-describedby="email-error"
      >
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute inset-y-0 right-0 z-20 flex items-center pr-3 focus:outline-none"
        @click="showPassword = !showPassword"
      >
        <svg
          v-if="!showPassword"
          class="w-5 h-5 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>

      <div
        v-if="error && showIconError"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-xs text-red-500">
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
export default class InputGroup extends Vue {
  inputValue = '';

  @Prop(String) readonly id!: string;
  @Prop(String) readonly label!: string;
  @Prop({ type: String, default: '' }) readonly modifiers!: string;
  @Prop(String) readonly description!: string;
  @Prop(String) readonly placeholder!: string;
  @Prop(String) readonly min!: string;
  @Prop(String) readonly max!: string;
  @Prop(String) readonly step!: string;
  @Prop(String) readonly type!: string;
  @Prop({ type: Boolean, default: false }) readonly noMargin!: boolean;
  @Prop({ type: Boolean, default: false }) readonly optional!: boolean;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Boolean, default: false }) showPassword!: boolean;
  @Prop({ type: [String, Boolean], default: false }) readonly error!:
    | string
    | boolean;

  @Prop({ type: Boolean, default: true }) readonly showIconError!: boolean;

  @Model('input', { type: String }) value!: string;

  @Watch('inputValue')
  handleValue(newVal: string) {
    let value = newVal;
    const modifiers = this.modifiers.split(',');
    if (modifiers.find((c) => c === 'upperCase')) {
      value = value.toUpperCase();
      this.$set(this, 'inputValue', value);
    } else if (modifiers.find((c) => c === 'lowerCase')) {
      value = value.toLowerCase();
      this.$set(this, 'inputValue', value);
    }
    if (modifiers.find((c) => c === 'withoutSpaces')) {
      value = value.trim();
      this.$set(this, 'inputValue', value);
    }
    this.emitValue(newVal);
  }

  @Watch('value')
  handlePropValue(value: string) {
    this.inputValue = value;
  }

  @Emit('input')
  emitValue(value: string) {
    return value;
  }

  mounted() {
    if (this.modifiers === 'upperCase') {
      this.inputValue = this.value.toUpperCase();
    } else if (this.modifiers === 'lowerCase') {
      this.inputValue = this.value.toLowerCase();
    } else {
      this.inputValue = this.value;
    }
  }
}
</script>
