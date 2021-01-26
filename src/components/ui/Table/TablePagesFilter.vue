<template>
  <div v-click-outside="closeOptions" class="relative inline-block text-left">
    <div>
      <span class="rounded-md shadow-sm">
        <button
          id="options-menu"
          type="button"
          class="inline-flex items-center justify-center w-full h-10 px-4 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-gray-100 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
          aria-haspopup="true"
          aria-expanded="true"
          @click="showOptions = !showOptions"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>

          <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </span>
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
        v-show="showOptions"
        class="absolute right-0 z-50 w-56 mt-2 origin-top-right rounded-md shadow-lg"
      >
        <div
          class="bg-white rounded-md shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div class="px-4 py-3">
            <p class="text-sm font-semibold leading-5 uppercase">
              Por página
            </p>
          </div>
          <div class="border-t border-gray-100" />
          <div class>
            <div
              class="block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              role="menuitem"
              @click="onChange('10')"
            >
              10
            </div>
            <div
              class="block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              role="menuitem"
              @click="onChange('25')"
            >
              25
            </div>
            <div
              class="block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              role="menuitem"
              @click="onChange('50')"
            >
              50
            </div>
            <div
              class="block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              role="menuitem"
              @click="onChange('100')"
            >
              100
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Emit,
} from 'vue-property-decorator';

@Component
export default class TablePagesFilter extends Vue {
  showOptions = false

  closeOptions() {
    this.showOptions = false;
  }

  @Emit('change')
  onChange(value: string) {
    this.showOptions = !this.showOptions;
    return value;
  }
}
</script>
