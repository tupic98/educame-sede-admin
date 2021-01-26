<template>
  <modal :show="showModal">
    <div
      class="px-4 pt-5 pb-4 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-sm sm:w-full sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div>
        <div class="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
          <svg
            class="w-6 h-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3
            id="modal-headline"
            class="text-lg font-medium leading-6 text-gray-900"
          >
            {{ title }}
          </h3>
          <div class="mt-2">
            <p
              class="text-sm leading-5 text-gray-500"
            >
              <!-- TODO: Description of card section -->
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6">
        <span class="flex w-full rounded-md shadow-sm">
          <button
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue sm:text-sm sm:leading-5"
            @click="actionContinue"
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
export default class ConfirmationModal extends Vue {
  @Prop({ type: Boolean, default: false }) readonly show!: boolean
  @Prop(String) readonly title!: string
  @PropSync('show', Boolean) showModal!: boolean
  actionContinue() {
    this.showModal = false;
    this.$emit('action');
  }
}
</script>
