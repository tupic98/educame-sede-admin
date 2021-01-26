<template>
  <modal :show="showModal">
    <div
      class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div>
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <svg
            class="h-6 w-6 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3
            id="modal-headline"
            class="text-lg leading-6 font-medium text-gray-900"
          >
            {{ title }}
          </h3>
          <div class="mt-2">
            <p
              class="text-sm leading-5 text-gray-500"
            >
              {{ detail }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6">
        <span class="flex w-full rounded-md shadow-sm">
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            @click="showModal = false"
          >Continuar</button>
        </span>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, PropSync,
} from 'vue-property-decorator';
import Modal from '@/components/ui/Modal.vue';

@Component({
  components: {
    Modal,
  },
})
export default class WarningModal extends Vue {
  @Prop({ type: Boolean, default: false }) readonly show!: boolean
  @Prop(String) readonly title!: string
  @Prop({ type: String, default: '' }) readonly detail!: string
  @PropSync('show', Boolean) showModal!: boolean
}
</script>
