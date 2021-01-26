<template>
  <div class="relative flex items-start mb-4">
    <div class="flex items-center h-5">
      <input
        :id="id"
        v-model="inputValue"
        :disabled="disabled"
        type="checkbox"
        :class="`text-${color}`"
        class="form-checkbox h-4 w-4 transition duration-150 ease-in-out"
        :value="selectedValue"
      >
    </div>
    <div v-show="label " class="ml-3 text-sm leading-5">
      <label :for="id" class="font-medium text-gray-700">{{ label }}</label>
      <p class="text-gray-500">
        {{ description }}
      </p>
    </div>
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
export default class InputCheckbox extends Vue {
  inputValue: any = null

  @Prop({ type: String, default: 'blue-600' }) readonly color!: string;
  @Prop([String, Number]) readonly id!: string | number
  @Prop(String) readonly label!: string
  @Prop(String) readonly description!: string
  @Prop([String, Number]) readonly selectedValue!: string | number
  @Prop({ type: Boolean, default: false }) readonly error!: boolean
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean

  @Model('input') value!: boolean

  @Watch('inputValue')
  handleValue() {
    this.emitValue();
    this.pushValue();
  }

  @Watch('value', { immediate: true })
  handleSelectedValue(newValue: boolean) {
    this.inputValue = newValue;
  }

  @Emit('input')
  emitValue() {
    return this.inputValue;
  }

  pushValue() {
    if (this.inputValue) { this.$emit('change-value', this.id); } else { this.$emit('remove-value', this.id); }
  }

  mounted() {
    this.inputValue = this.value;
  }
}
</script>
