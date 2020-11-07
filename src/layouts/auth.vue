<template>
  <div class="min-h-screen">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AuthLayout extends Vue {
}
</script>
