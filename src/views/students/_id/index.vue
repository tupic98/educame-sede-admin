<template>
  <main class="pb-40">
    <page-heading title="Detalle estudiante" back-route="/students" :breadcrumbs="breadcrumbs">
      <template slot="actions">
        <custom-button
          title="Ver notas"
          color="secondary"
          size="small"
          class="mr-2"
          :to="`/students/${student.id}/notes`"
        >
          <template #icon>
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
          </template>
        </custom-button>
        <custom-button
          title="Editar"
          color="white"
          size="small"
          class="mr-2"
          :to="`/students/${student.id}/edit`"
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
          color="red"
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
    <section v-if="student">
      <div class="overflow-hidden bg-white border border-gray-100 shadow sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-100 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Estudiante #{{ student.id }}
          </h3>
          <p class="max-w-2xl mt-1 text-sm leading-5 text-gray-500">
            Información general de estudiante.
          </p>
        </div>
        <div>
          <dl>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Nombres
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {{ student.person.firstName }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Apellidos
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {{ student.person.lastName }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Código
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {{ student.code }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Número de teléfono
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ student.person.phoneNumber ? student.person.phoneNumber : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Número de teléfono alternativo
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ student.person.altPhoneNumber ? student.person.altPhoneNumber : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Correo electrónico
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ student.person.email ? student.person.email : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Modalidad
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ student.modality ? student.modality.type : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Grado
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ student.grade ? student.grade.grade : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Sección
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ student.section ? student.section.name : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Sede
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ student.person && student.person.sede ? student.person.sede.name : 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Año
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ student.year || 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Promedio Final
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ student.finalAverage || 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Promedio Instituional
              </dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >
                {{ student.institutionalAverage || 'N/A' }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Aprobado
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <active-indicator :status="Boolean(student.approved)" />
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Activo
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <active-indicator :status="Boolean(student.person.status)" />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
    <delete-item
      :show="showDeleteModal"
      :title="`${student.person.firstName} ${student.person.lastName}`"
      @update:show="showDeleteModal = false"
      @action="deleteItem"
    />
    <confirmation-modal
      :show="showConfirmationModal"
      title="Estudiante Eliminado"
      @update:show="showConfirmationModal = false"
      @action="redirectBack"
    />
    <loading :active="isStudentsLoading" :is-full-page="false" />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ActionMethod } from 'vuex';
import PageHeading from '@/components/layout/PageHeading.vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import ActiveIndicator from '@/components/ui/ActiveIndicator.vue';
import DeleteItem from '@/components/general/DeleteItem.vue';
import ConfirmationModal from '@/components/general/ConfirmationModal.vue';
import Loading from '@/components/ui/Loading.vue';

interface Breadcrumb {
  name: string;
  route?: string;
}

const Students = namespace('students');

@Component({
  components: {
    PageHeading,
    CustomButton,
    ActiveIndicator,
    DeleteItem,
    ConfirmationModal,
    Loading,
  },
})
export default class ShowStudentPage extends Vue {
  breadcrumbs: Breadcrumb[] = [
    { name: 'Administración' },
    { name: 'Estudiantes', route: '/students' },
    { name: 'Detalle' },
  ]

  showConfirmationModal = false
  showDeleteModal = false

  @Students.State('isLoading') isStudentsLoading!: boolean
  @Students.State('student') student!: Student
  @Students.Action('show') fetchStudent!: ({ id, vm }: { id: number; vm: any }) => ActionMethod
  @Students.Action('destroy') deleteStudent!: ({ id, vm }: { id: number; vm: any }) => ActionMethod

  async mounted() {
    const { id } = this.$route.params;
    await this.fetchStudent({ id, vm: this });
    if (!this.student.id) {
      this.redirectBack();
    }
  }

  async deleteItem() {
    await this.deleteStudent({ id: this.student?.id, vm: this });
    this.showConfirmationModal = true;
  }

  formattedDate(date: Date) {
    if (date) {
      const newDate = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('es-US', options).format(newDate);
    }
  }

  redirectBack() {
    this.$router.push('/students');
  }
}
</script>
