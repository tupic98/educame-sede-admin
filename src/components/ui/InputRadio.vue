<template>
  <div class="flex items-center mb-2">
    <input
      :id="id"
      v-model="inputValue"
      :name="name"
      type="radio"
      class="w-4 h-4 text-blue-600 transition duration-150 ease-in-out form-radio"
      :value="selectedValue"
    >
    <label :for="id" class="w-full ml-3">
      <span class="block text-sm font-medium leading-5 text-gray-700 truncate ...">{{ label | truncate(75)}}</span>
    </label>
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
export default class InputRadio extends Vue {
  inputValue: string | number = ''

  @Prop([String, Number]) readonly id!: string | number
  @Prop(String) readonly label!: string
  @Prop(String) readonly name!: string
  @Prop([String, Number]) readonly selectedValue!: string | number
  @Prop({ type: Boolean, default: false }) readonly error!: boolean

  @Model('input') value!: string | number

  @Watch('inputValue')
  handleValue() {
    this.emitValue();
    this.pushValue();
  }

  @Watch('value', { immediate: true })
  hanldeSelectedValue(newValue: string) {
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
