<template>
  <div class="mb-4">
    <label for="email" class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <div class="rounded-md shadow-sm">
        <textarea
          :id="id"
          v-model="inputValue"
          rows="3"
          class="block w-full mt-1 transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"
          :class="{
            'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : error,
            'bg-gray-100 text-gray-400 cursor-not-allowed': disabled,
          }"
          :style="{
            'height': height
          }"
          :placeholder="placeholder"
          :disabled="disabled"
        />
      </div>
    </div>
    <p
      v-if="error"
      id="email-error"
      class="mt-1 text-xs text-red-600"
    >
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
export default class InputTextArea extends Vue {
  inputValue = ''

  @Prop(String) readonly id!: string
  @Prop(String) readonly label!: string
  @Prop(String) readonly placeholder!: string
  @Prop({ type: String, default: null }) readonly height!: string
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  @Prop({ type: [String, Boolean], default: false }) readonly error!:
    | string
    | boolean

  @Model('input', { type: String }) value!: string

  @Watch('inputValue')
  handleValue(newVal: string) {
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
    this.inputValue = this.value;
  }
}
</script>
