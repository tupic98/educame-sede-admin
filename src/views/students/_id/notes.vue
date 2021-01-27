<template>
  <main class="pb-40">
    <page-heading title="Notas estudiante" :back-route="`/students/${$route.params.id}`" :breadcrumbs="breadcrumbs">
    </page-heading>
    <section v-if="student">
      <div class="overflow-hidden bg-white border border-gray-100 shadow sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-100 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Estudiante -  {{ `${student.person.firstName} ${student.person.lastName}` }}
          </h3>
          <p class="max-w-2xl mt-1 text-sm leading-5 text-gray-500">
            Notas del estudiante.
          </p>
        </div>
        <div>
          <div class="hidden sm:block px-3 pb-3 overflow-x-auto tabs">
            <div class="border-b border-gray-200 w-full">
              <div class="flex -mb-px items-center">
                <div
                  v-for="(module, key) in notes"
                  :key="key"
                  class="group py-4 px-1 text-center cursor-pointer border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 mr-6 transition duration-150 ease-in whitespace-no-wrap"
                  :class="selectedModule === key ? 'border-blue-500 text-blue-600 outline-none' : 'hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'"
                  @click="selectedModule = key"
                >
                  {{ getTabName(module, key) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-2 sm:px-6">
          <dl class="divide-y divide-gray-200">
            <div v-for="(subject, index) in notes[selectedModule]" :key="index" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-bold text-gray-900 flex items-center">
                {{ subject.subject }}
              </dt>
              <dd class="mt-1 flex text-sm sm:mt-0 sm:col-span-2" :class="modifyingNotes[selectedModule] && !modifyingNotes[selectedModule][subject.id] ? +subject.note >= 6 ? 'text-green-600' : 'text-red-600' : 'text-black'">
                <span
                  v-if="modifyingNotes[selectedModule] && !modifyingNotes[selectedModule][subject.id]"
                  class="flex-grow">{{ subject.note || '' }}
                </span>
                <div v-else class="flex-grow flex items-center">
                  <input-group
                    v-model="notesForm[selectedModule][subject.id].note"
                    :max="10"
                    type="number"
                    label="Nota"
                    no-margin
                  />
                  <input-group
                    v-model="notesForm[selectedModule][subject.id].recoveryLink"
                    label="Link de recuperación"
                    class="mx-4"
                    no-margin
                  />
                  <toggle-selector v-model="notesForm[selectedModule][subject.id].recoveryEnabled" label="Activar recuperación" />
                </div>
                <div class="ml-auto flex-shrink-0 flex items-center">
                  <button
                    v-if="modifyingNotes[selectedModule] && !modifyingNotes[selectedModule][subject.id]"
                    type="button"
                    class="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="modifyNote(subject.id, true)"
                  >
                    Modificar
                  </button>
                  <div v-else class="inline-flex ml-auto">
                    <button
                      type="button"
                      class="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                      @click="modifyNote(subject.id, false)"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      class="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      @click="updateNotes(subject.id)"
                    >
                      Guardar
                  </button>
                  </div>
                </div>
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
    <loading :active="isStudentsLoading" :is-full-page="false"/>
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
import InputGroup from '@/components/ui/InputGroup.vue';
import ToggleSelector from '@/components/ui/ToggleSelector.vue';

interface Breadcrumb {
  name: string;
  route?: string;
}

const Students = namespace('students');

@Component({
  components: {
    ToggleSelector,
    InputGroup,
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
  ];

  selectedModule = '1';
  showConfirmationModal = false;
  showDeleteModal = false;
  modifyingNotes: {
    [key: string]: number | string | any;
  } = {};
  notesForm: {
    [key: string]: number | string | any;
  } = {};

  @Students.State('isLoading') isStudentsLoading!: boolean;
  @Students.State('student') student!: Student;
  @Students.State('notes') notes!: any;
  @Students.Action('show') fetchStudent!: ({ id, vm }: { id: number; vm: any }) => ActionMethod;
  @Students.Action('updateNote') updateNote!: ({ payload, vm }: { payload: any; vm: any }) => ActionMethod;
  @Students.Action('fetchNotes') fetchNotes!: ({ id, vm }: { id: number; vm: any }) => ActionMethod;
  @Students.Action('destroy') deleteStudent!: ({ id, vm }: { id: number; vm: any }) => ActionMethod;

  async mounted() {
    const { id } = this.$route.params;
    await this.fetchStudent({ id: +id, vm: this });
    await this.fetchNotes({ id: +id, vm: this });
    Object.keys(this.notes).forEach((key: any) => {
      this.$set(this.modifyingNotes, key, {});
      this.$set(this.notesForm, key, {});
      this.notes[key].forEach((subject: any) => {
        this.$set(this.modifyingNotes[key], subject.id, false);
        this.$set(this.notesForm[key], subject.id, {
          id,
          qualificationId: subject.id,
          userId: 0,
          note: subject.note,
          recoveryLink: subject.recoverLink ?? '',
          recoveryEnabled: subject.recoverEnabled ?? false,
        });
      });
    });
    if (!this.student.id) {
      this.redirectBack();
    }
  }

  async deleteItem() {
    await this.deleteStudent({ id: +this.student?.id, vm: this });
    this.showConfirmationModal = true;
  }

  modifyNote(key: string, status: boolean) {
    this.$set(this.modifyingNotes[this.selectedModule], key, status);
  }

  getTabName(section: any, key: string) {
    if (key === 'externalTest') {
      return 'Prueba externa';
    }
    return `Modulo ${key}`;
  }

  formattedDate(date: Date) {
    if (date) {
      const newDate = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('es-US', options).format(newDate);
    }
  }

  async updateNotes(key: string) {
    try {
      const { id } = this.$route.params;
      if (this.notesForm[this.selectedModule][key].note > 10) {
        this.notesForm[this.selectedModule][key].note = 10;
      }
      if (this.notesForm[this.selectedModule][key].note < 0) {
        this.notesForm[this.selectedModule][key].note = 0;
      }
      await this.updateNote({ payload: this.notesForm[this.selectedModule][key], vm: this });
      this.$set(this.modifyingNotes[this.selectedModule], key, false);
      await this.fetchNotes({ id: +id, vm: this });
      // eslint-disable-next-line no-empty
    } catch (e) {
    }
  }

  redirectBack() {
    this.$router.push('/students');
  }
}
</script>
