<template>
  <div id="app" class="flex flex-col h-screen overflow-hidden bg-gray-100">
    <Navbar @show-menu="handleSidebar" />
    <div class="flex flex-1 w-full h-full overflow-hidden">
      <Sidebar :show="showSidebar" @close-sidebar="showSidebar = false" />
      <div id="app-container" class="relative w-full pt-8 overflow-y-auto">
        <div class="min-h-screen mx-auto overflow-y-auto md:px-20">
          <div class="h-full px-4 pt-4 md:px-10 focus:outline-none">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

@Component({
  components: { Sidebar, Navbar },
})
export default class DefaultLayout extends Vue {
  showSidebar = false;

  handleSidebar(value: boolean) {
    this.showSidebar = value;
  }
}
</script>
