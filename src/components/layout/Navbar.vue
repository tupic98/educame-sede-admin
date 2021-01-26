<template>
  <nav class="flex-shrink-0 bg-blue-600">
    <div class="px-2 mx-auto sm:px-4 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex items-center px-2 lg:px-0 xl:w-64">
          <div class="flex-shrink-0">
            <router-link to="/">
              Logo
            </router-link>
          </div>
        </div>

        <div class="flex lg:hidden">
          <button
            class="inline-flex items-center justify-center p-2 text-blue-400 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 focus:text-white"
            aria-label="Main menu"
            aria-expanded="false"
            @click="showMenu"
          >
            <svg
              class="block w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>

        <div class="hidden lg:block lg:w-80">
          <div class="flex items-center justify-end">
            <div
              v-click-outside="closeUserMenu"
              class="relative flex-shrink-0 ml-4"
            >
              <div>
                <button
                  id="user-menu"
                  class="flex text-sm text-white transition duration-150 ease-in-out rounded-full active:outline-none focus:outline-none"
                  aria-label="User menu"
                  aria-haspopup="true"
                  @click="showUserMenu = !showUserMenu"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-6 h-6 user-circle"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div
                  v-show="showUserMenu"
                  class="absolute right-0 z-50 w-48 mt-2 origin-top-right rounded-md shadow-lg"
                >
                  <div
                    class="py-3 bg-white rounded-md shadow-xs"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div v-if="isAuthenticated" class="pb-3 mb-3 border-b">
                      <p
                        class="block px-3 font-semibold leading-5 text-gray-700 text-md"
                      >
                       Nombre
                      </p>
                      <span
                        class="block px-3 text-xs leading-5 text-gray-600"
                      >Administrador</span>
                    </div>
                    <!--<a
                      href="#"
                      @click="profile()"
                      class="flex items-center w-full h-8 px-4 text-sm font-semibold leading-5 text-blue-500 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                    >
                      Perfil
                    </a>-->
                    <button
                      class="flex items-center w-full h-8 px-4 text-sm font-semibold leading-5 text-blue-500 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                      @click.prevent="signOut"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden lg:hidden">
      <div class="px-2 pt-2 pb-3">
        <a
          href="#"
          class="block px-3 py-2 text-base font-medium text-white transition duration-150 ease-in-out bg-indigo-800 rounded-md focus:outline-none focus:text-indigo-100 focus:bg-indigo-600"
        >Dashboard</a>
        <a
          href="#"
          class="block px-3 py-2 mt-1 text-base font-medium text-indigo-200 transition duration-150 ease-in-out rounded-md hover:text-indigo-100 hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600"
        >Support</a>
      </div>
      <div class="pt-4 pb-3 border-t border-indigo-800">
        <div class="px-2">
          <a
            href="#"
            class="block px-3 py-2 text-base font-medium text-indigo-200 transition duration-150 ease-in-out rounded-md hover:text-indigo-100 hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600"
          >Your Profile</a>
          <a
            href="#"
            class="block px-3 py-2 mt-1 text-base font-medium text-indigo-200 transition duration-150 ease-in-out rounded-md hover:text-indigo-100 hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600"
          >Settings</a>
          <a
            href="#"
            class="block px-3 py-2 mt-1 text-base font-medium text-indigo-200 transition duration-150 ease-in-out rounded-md hover:text-indigo-100 hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600"
          >Sign out</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { ActionMethod } from 'vuex';

@Component
export default class Navbar extends Vue {
  @Action('logout') logout!: () => ActionMethod;
  @Getter('isAuthenticated') isAuthenticated!: boolean;

  showUserMenu = false;

  @Emit()
  showMenu() {
    return true;
  }

  closeUserMenu() {
    this.showUserMenu = false;
  }

  profile() {
    this.closeUserMenu();
    this.$router.push('/profile');
  }

  async signOut() {
    try {
      await this.logout();
      this.$router.replace('/login');
    } catch (error) {
      return error;
    }
  }
}
</script>
