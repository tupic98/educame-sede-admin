<template>
  <h1>{{ id }}</h1>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Test extends Vue {
  id = 0;

  mounted() {
    this.id = +this.$route.params.id;
  }
}
</script>
