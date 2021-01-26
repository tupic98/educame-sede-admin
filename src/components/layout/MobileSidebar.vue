<template>
  <div v-show="showMenu" class="md:hidden">
    <div class="fixed inset-0 flex z-40">
      <transition
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-show="showMenu" class="fixed inset-0">
          <div class="absolute inset-0 bg-gray-600 opacity-75" />
        </div>
      </transition>
      <transition
        enter-active-class="transition ease-in-out duration-300 transform"
        enter-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition ease-in-out duration-300 transform"
        leave-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <div
          v-show="showMenu"
          class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
        >
          <div class="absolute top-0 right-0 -mr-14 p-1">
            <button
              class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
              aria-label="Close sidebar"
              @click="closeSidebar"
            >
              <svg
                class="h-6 w-6 text-white"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="flex-shrink-0 flex items-center px-4">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-on-white.svg"
              alt="Workflow"
            >
          </div>
          <div class="mt-5 flex-grow flex flex-col">
            <nav class="flex-1 px-2 bg-white">
              <a
                href="#"
                class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
              >
                <svg
                  class="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Inicio
              </a>
              <div>
                <button
                  class="mt-1 group w-full flex items-center pl-2 pr-1 py-2 text-sm leading-5 font-medium rounded-md bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                  @click="showUsersMenu = !showUsersMenu"
                >
                  <svg
                    class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-600 group-focus:text-gray-600 transition ease-in-out duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Administración
                  <svg
                    class="ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"
                    :class="[showUsersMenu ? 'text-gray-400 rotate-90' : 'text-gray-300']"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                </button>

                <div v-show="showUsersMenu" class="mt-1">
                  <a
                    href="#"
                    class="group w-full flex items-center pl-11 pr-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                  >Usuarios</a>
                  <a
                    href="#"
                    class="mt-1 group w-full flex items-center pl-11 pr-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                  >Roles</a>
                  <a
                    href="#"
                    class="mt-1 group w-full flex items-center pl-11 pr-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                  >Permisos</a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </transition>
      <div class="flex-shrink-0 w-14" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch, Emit,
} from 'vue-property-decorator';

@Component
export default class MobileSidebar extends Vue {
  @Prop(Boolean) readonly show!: boolean
  showUsersMenu = false
  showMenu = false

  @Watch('show')
  handleSidebar(newVal: boolean) {
    this.showMenu = newVal;
  }

  @Emit()
  emitCloseSidebar() {
    return false;
  }

  closeSidebar() {
    this.showMenu = false;
    this.emitCloseSidebar();
  }
}
</script>
