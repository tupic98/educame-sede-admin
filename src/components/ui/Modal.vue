<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="show"
      class="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75" />
      </div>
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        enter-to-class="translate-y-0 opacity-100 sm:scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-class="translate-y-0 opacity-100 sm:scale-100"
        leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-show="show"
          class="overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:w-auto"
          :class="isFullWidth ? '' : 'sm:max-w-xl xl:max-w-full'"
          :style="{ maxWidth: maxWidth + 'px' }"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Prop({ type: Boolean, default: false }) readonly show!: boolean
  @Prop({ type: Boolean, default: false }) readonly isFullWidth!: boolean;
  @Prop({ type: Number, default: 624 }) readonly maxWidth!: number;
}
</script>
