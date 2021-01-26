<template>
  <span
    class="inline-flex px-1 py-1 text-xs font-semibold leading-5 rounded-full"
    :class="[status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
  >
    <svg
      v-if="status"
      class="w-4 h-4 text-green-600"
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-else
      class="w-4 h-4 text-red-600"
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ActiveIndicator extends Vue {
  @Prop(Boolean) readonly status!: any
}
</script>
