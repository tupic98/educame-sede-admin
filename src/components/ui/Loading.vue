<template>
  <transition :name="animation">
    <div
      v-show="active"
      class="loading-overlay is-active"
      :class="{ 'is-full-page': isFullPage }"
    >
      <div class="loading-background" />
      <slot>
        <div class="loading-icon" />
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  @Prop({ default: false }) active!: boolean
  @Prop({ default: true }) isFullPage!: boolean
  @Prop({ default: 'fade' }) animation!: string
}
</script>
