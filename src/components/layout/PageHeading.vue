<template>
  <div class="pb-8 mb-12 border-b border-gray-200">
    <div v-show="showReturn" class="mb-6">
      <router-link
        :to="backRoute || ''"
        class="flex items-center text-gray-500 active:outline-none focus:outline-none"
      >
        <svg
          class="w-5 h-5 mr-2 text-gray-500 fill-current"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span class="text-sm">Volver</span>
      </router-link>
    </div>
    <div class="my-2 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2
          class="text-2xl font-semibold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate"
        >
          {{ title || '' }}
        </h2>
      </div>
      <div class="flex flex-shrink-0 mt-4 md:mt-0 md:ml-4">
        <slot name="actions" />
      </div>
    </div>
    <nav class="items-center hidden text-sm font-medium leading-5 sm:flex">
      <div
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="flex items-center"
      >
        <router-link
          v-if="item.route"
          :to="`${item.route}`"
          class="text-gray-500 transition duration-150 ease-in-out hover:text-gray-700"
        >
          {{ item.name === 'id' ? `#${$route.params.id}` : item.name }}
        </router-link>
        <span v-else class="text-gray-500" :class="{'w-25 truncate':truncate}">{{ item.name }}</span>
        <svg
          v-if="index + 1 < breadcrumbs.length"
          class="flex-shrink-0 w-5 h-5 mx-2 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PageHeading extends Vue {
  @Prop(String) readonly title!: string
  @Prop({ type: Boolean, default: true }) readonly showReturn!: boolean
  @Prop({ type: Boolean, default: false }) readonly truncate!: boolean
  @Prop(String) readonly backRoute!: string
  @Prop(Array) readonly breadcrumbs!: Array<object>
}
</script>
