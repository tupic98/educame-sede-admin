<template>
  <tr class="bg-gray-50 odd:bg-white">
<!--    <td class="w-4 px-4">-->
<!--      <input-checkbox-->
<!--        v-model="selectedItems"-->
<!--        :selected-value="item"-->
<!--        style="margin: 0"-->
<!--      />-->
<!--    </td>-->
    <slot />
    <td class="w-8">
      <div
        v-click-outside="closeItemOptions"
        class="relative inline-block text-left"
      >
        <div>
          <div class="rounded-md">
            <div
              class="flex py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <slot name="options" />
              <router-link
                v-if="product"
                :to="product"
                class="flex items-center px-2 py-2 text-sm leading-5 text-gray-700 group hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
                v-tooltip="{
                  content: 'Ver',
                  classes: ['tooltip-width text-xs'],
                }"
              >
                <svg
                  class="w-5 h-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </router-link>
              <router-link
                v-if="show"
                v-tooltip="{
                  content: 'Ver',
                  classes: ['tooltip-width text-xs'],
                }"
                :to="`/${page}/${item}`"
                class="flex items-center px-2 py-2 text-sm leading-5 text-gray-700 group hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                <svg
                  class="w-5 h-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </router-link>
              <router-link
                v-if="edit"
                v-tooltip="{
                  content: 'Editar',
                  classes: ['tooltip-width text-xs'],
                }"
                :to="`/${page}/${item}/edit`"
                class="flex items-center px-2 py-2 text-sm leading-5 text-gray-700 group hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                <svg
                  class="w-5 h-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </router-link>
              <button
                v-if="remove"
                v-tooltip="{
                  content: 'Eliminar',
                  classes: ['tooltip-width text-xs'],
                }"
                class="flex items-center px-2 py-2 text-sm leading-5 text-gray-700 group hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
                @click="emitDeleteModal"
              >
                <svg
                  class="w-5 h-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <router-link
                v-if="redirectToPage"
                v-tooltip="{
                  content: `${redirectContent}`,
                  classes: ['tooltip-width text-xs'],
                }"
                :to="`/page/${redirectToPage}`"
                class="flex items-center px-2 py-2 text-sm leading-5 text-gray-700 group hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                <svg
                  class="w-5 h-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import {
  Vue, Component, Emit, Prop, PropSync,
} from 'vue-property-decorator';
import InputCheckbox from '@/components/ui/InputCheckbox.vue';

@Component({
  components: {
    InputCheckbox,
  },
})
export default class TableItem extends Vue {
  showItemOptions = false
  @PropSync('selected', Array) selectedItems!: Array<string | number>
  @Prop([String, Number]) readonly item!: string | number
  @Prop(String) readonly page!: string
  @Prop({ type: [String, Number], default: 0 }) readonly redirectToPage!: string | number | null
  @Prop({ type: Boolean, default: true }) readonly edit!: boolean
  @Prop({ type: Boolean, default: true }) readonly show!: boolean
  @Prop({ type: Boolean, default: true }) readonly remove!: boolean
  @Prop({ type: String, default: '' }) readonly product!: string
  @Prop({ type: String, default: '' }) readonly redirectContent!: string

  closeItemOptions() {
    this.showItemOptions = false;
  }

  @Emit('delete')
  emitDeleteModal() {
    this.showItemOptions = false;
    return this.item;
  }
}
</script>
