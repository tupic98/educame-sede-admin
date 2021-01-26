<template>
  <main class="pb-40">
    <page-heading title="Detalle modalidad" back-route="/modality" :breadcrumbs="breadcrumbs">
      <template slot="actions">
        <custom-button
          title="Editar"
          color="white"
          size="small"
          class="mr-2"
          :to="`/modality/${modality.id}/edit`"
        >
          <template #icon>
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </template>
        </custom-button>
        <custom-button
          title="Eliminar"
          color="secondary"
          size="small"
          @click="showDeleteModal = true"
        >
          <template #icon>
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </template>
        </custom-button>
      </template>
    </page-heading>
    <section v-if="modality">
      <div class="overflow-hidden bg-white border border-gray-100 shadow sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-100 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Modalidad #{{ modality.id }}
          </h3>
          <p class="max-w-2xl mt-1 text-sm leading-5 text-gray-500">
            Información general de la modalidad {{ modality.type }}.
          </p>
        </div>
        <div>
          <dl>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Tipo
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {{ modality.type }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
    <delete-item
      :show="showDeleteModal"
      :title="`modalidad ${modality.type}`"
      @update:show="showDeleteModal = false"
      @action="deleteItem"
    />
    <confirmation-modal
      :show="showConfirmationModal"
      title="Modalidad Eliminada"
      @update:show="showConfirmationModal = false"
      @action="redirectBack"
    />
    <loading :active="isModalityLoading" :is-full-page="false" />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ActionMethod } from 'vuex';
import PageHeading from '@/components/layout/PageHeading.vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import ActiveIndicator from '@/components/ui/ActiveIndicator.vue';
import Loading from '@/components/ui/Loading.vue';
import DeleteItem from '@/components/general/DeleteItem.vue';
import ConfirmationModal from '@/components/general/ConfirmationModal.vue';

interface Breadcrumb {
  name: string;
  route?: string;
}

const ModalityModel = namespace('modality');

@Component({
  components: {
    PageHeading,
    CustomButton,
    ActiveIndicator,
    Loading,
    DeleteItem,
    ConfirmationModal,
  },
})
export default class ShowModalityPage extends Vue {
  showConfirmationModal = false
  showDeleteModal = false
  breadcrumbs: Breadcrumb[] = [
    { name: 'Administración' },
    { name: 'Modalidad', route: '/modality' },
    { name: 'Detalle' },
  ]

  @ModalityModel.State('isLoading') isModalityLoading!: boolean;
  @ModalityModel.State('modality') modality!: Modality;
  @ModalityModel.Action('show') fetchModality!: ({ id, vm }: { id: number; vm: any }) => ActionMethod
  @ModalityModel.Action('destroy') deleteModality!: ({ id, vm }: { id: number; vm: any }) => ActionMethod

  async mounted() {
    const { id } = this.$route.params;
    await this.fetchModality({ id: +id, vm: this });
    if (!this.modality.id) {
      this.redirectBack();
    }
  }

  async deleteItem() {
    const id = Number(this.modality?.id);
    await this.deleteModality({ id, vm: this });
    this.showConfirmationModal = true;
  }

  redirectBack() {
    this.$router.push('/modality');
  }
}
</script>
