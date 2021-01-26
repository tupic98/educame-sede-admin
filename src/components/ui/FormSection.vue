<template>
  <section class="mb-6">
    <div class="sm:rounded-lg shadow bg-white px-4 py-5 sm:p-6">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class FormSection extends Vue {}
</script>
