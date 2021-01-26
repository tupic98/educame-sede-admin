<template>
  <div class="min-h-screen">
    <router-view />
    <vue-snotify></vue-snotify>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AuthLayout extends Vue {
}
</script>
