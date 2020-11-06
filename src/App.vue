<template>
  <div id="app">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <component class="layout" :class="layout" :is="layout"></component>
    </transition>
    <vue-snotify />

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  // eslint-disable-next-line class-methods-use-this
  get defaultLayout() {
    return 'home';
  }

  get layout() {
    return `${this.$route.meta.layout || this.defaultLayout}-layout`;
  }
}
</script>

<style lang="scss">
</style>
