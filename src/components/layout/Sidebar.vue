<template>
  <div class>
    <MobileSidebar :show="show" @emit-close-sidebar="closeSidebar" />
    <div
      class="hidden h-full border-r border-gray-200 md:flex md:flex-shrink-0"
    >
      <div class="flex flex-col w-64">
        <div
          class="flex flex-col flex-grow px-4 pt-3 pb-4 overflow-y-auto bg-white border-gray-200"
        >
          <div class="flex flex-col flex-grow">
            <nav class="flex-1 px-2 pt-12">
              <nuxt-link
                to="/"
                exact-active-class="text-blue-500 "
                class="flex items-center px-2 pt-1 mb-6 text-sm font-medium leading-5 transition duration-150 ease-in-out rounded-md group text-dark-blue-700 hover:text-dark-blue-700 focus:outline-none"
              >
                <svg
                  class="w-5 h-5 mr-3 transition duration-150 ease-in-out text-dark-blue-500 group-hover:text-dark-blue-500 group-focus:text-dark-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
                Inicio
              </nuxt-link>
              <div>
                <button
                  class="flex items-center w-full px-2 pt-1 mt-1 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out rounded-md group hover:text-blue-500 focus:outline-none"
                  @click="activeMenu('administration')"
                >
                  <svg
                    class="w-5 h-5 mr-3 transition duration-150 ease-in-out text-dark-blue-500 group-hover:text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                    />
                  </svg>
                  Administración
                  <svg
                    class="w-5 h-5 ml-auto text-gray-500 transition-all duration-200 ease-in-out transform chevron-right group-hover:text-gray-600 group-focus:text-gray-600"
                    :class="[
                      menuItems.administration
                        ? 'text-gray-400 rotate-90'
                        : 'text-gray-300',
                    ]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <transition
                  enter-active-class="transition duration-150 ease-out"
                  enter-class="transform opacity-0 "
                  enter-to-class="transform opacity-100"
                  leave-active-class="transition duration-200 ease-linear"
                  leave-class="transform opacity-100 "
                  leave-to-class="transform opacity-0 "
                >
                  <div
                    v-show="menuItems.administration"
                    class="my-2 text-gray-700"
                  >
                    <nuxt-link
                      to="/users"
                      exact-active-class="font-bold text-blue-600 "
                      active-class="font-bold text-blue-600"
                      class="flex items-center w-full pt-1 text-sm font-medium leading-5 transition-all duration-150 ease-in-out rounded-md group hover:text-blue-500 pl-11"
                    >
                      Usuarios
                    </nuxt-link>
                    <nuxt-link
                      to="/roles"
                      exact-active-class="font-bold text-blue-600"
                      active-class="font-bold text-blue-600"
                      class="flex items-center w-full pt-1 mt-1 text-sm font-medium leading-5 transition-all duration-150 ease-in-out rounded-md group hover:text-blue-500 pl-11"
                    >
                      Roles
                    </nuxt-link>
                    <nuxt-link
                      to="/permissions"
                      exact-active-class="font-bold text-blue-600"
                      active-class="font-bold text-blue-600"
                      class="flex items-center w-full pt-1 mt-1 text-sm font-medium leading-5 transition-all duration-150 ease-in-out rounded-md group hover:text-blue-500 pl-11"
                    >
                      Permisos
                    </nuxt-link>
                  </div>
                </transition>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Emit,
} from 'vue-property-decorator';
import MobileSidebar from '@/components/layout/MobileSidebar.vue';

interface Menu {
  [key: string]: boolean;
}

@Component({
  components: { MobileSidebar },
})
export default class Sidebar extends Vue {
  @Prop(Boolean) readonly show!: boolean
  menuItems: Menu = {
    administration: false,
  }

  activeItem = ''

  @Emit()
  closeSidebar() {
    return false;
  }

  activeMenu(item: any) {
    if (item !== this.activeItem) {
      this.menuItems = {
        pages: false,
        administration: false,
        users: false,
        products: false,
        settings: false,
        warehouse: false,
        customers: false,
        marketing: false,
      };
    }
    this.activeItem = item;
    switch (item) {
      case 'administration':
        this.menuItems.administration = !this.menuItems.administration;
        break;
      default:
        break;
    }
  }
}
</script>
