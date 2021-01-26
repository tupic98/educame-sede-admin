<template>
  <main class="pb-40">
    <page-heading title="Nuevo estudiante" back-route="/students" :breadcrumbs="breadcrumbs" />
    <form-section>
      <ValidationObserver ref="form" tag="form" autocomplete="off" @submit.prevent="onSubmit">
        <div class="md:grid md:grid-cols-3 md:gap-8 ">
          <div class="md:col-span-1">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Estudiante
            </h3>
            <p
              class="mt-1 text-sm leading-5 text-gray-500"
            >
              Información del estudiante
            </p>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="grid grid-cols-6 row-gap-2 col-gap-6">
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="name"
                  name="nombre"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.firstName" label="Nombres" name="name" :error="errors[0]" />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="lastname"
                  name="apellidos"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.lastName" label="Apellidos" name="lastname" :error="errors[0]" />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="code"
                  name="código"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.code" label="Código del estudiante" name="code" :error="errors[0]" />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="report"
                  name="reporte"
                  tag="div"
                  rules=""
                >
                  <input-group
                    id="password"
                    v-model="form.report"
                    label="Reporte"
                    name="report"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="year"
                  name="año"
                  tag="div"
                  rules="required"
                >
                  <input-group
                    v-model="form.year"
                    label="Año"
                    name="year"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="sede"
                  name="sede"
                  tag="div"
                  rules="required"
                >
                  <input-select
                    v-model="form.sedeId"
                    label="Sede"
                    placeholder="Seleccionar"
                    :options="sedeList"
                    name="role"
                    display-name="name"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div><div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="modality"
                  name="modalidad"
                  tag="div"
                  rules="required"
                >
                  <input-select
                    v-model="form.modalityId"
                    label="Modalidad"
                    placeholder="Seleccionar"
                    :options="modalityList"
                    name="modality"
                    display-name="type"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="grade"
                  name="grado"
                  tag="div"
                  rules="required"
                >
                  <input-select
                    v-model="form.gradeId"
                    label="Grado"
                    placeholder="Seleccionar"
                    :options="gradeList"
                    name="role"
                    display-name="grade"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="section"
                  name="sección"
                  tag="div"
                  rules="required"
                >
                  <input-select
                    v-model="form.sectionId"
                    label="Sección"
                    placeholder="Seleccionar"
                    :options="sectionList"
                    name="section"
                    display-name="name"
                    :error="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <div class="col-span-6 sm:col-span-4">
                <toggle-selector v-model="form.status" label="Activo" />
              </div>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </form-section>
    <div class="w-full">
      <div class="flex items-center justify-end">
        <custom-button type="submit" class="ml-2" title="Guardar" :loading="isStudentsLoading" @click.prevent="onSubmit" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ActionMethod } from 'vuex';
import { namespace } from 'vuex-class';
import PageHeading from '@/components/layout/PageHeading.vue';
import FormSection from '@/components/ui/FormSection.vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import ToggleSelector from '@/components/ui/ToggleSelector.vue';
import InputSelect from '@/components/ui/InputSelect.vue';
import InputGroup from '@/components/ui/InputGroup.vue';
import InputMask from '@/components/ui/InputMask.vue';

interface Breadcrumb {
  name: string;
  route?: string;
}

const Students = namespace('students');
const SedeModel = namespace('sede');
const ModalityModel = namespace('modality');
const SectionModel = namespace('section');
const GradeModel = namespace('grade');

@Component({
  components: {
    PageHeading,
    FormSection,
    CustomButton,
    ToggleSelector,
    InputSelect,
    InputGroup,
    InputMask,
  },
})
export default class NewStudentPage extends Vue {
  form = {
    year: 0,
    report: '',
    code: '',
    firstName: '',
    lastName: '',
    sedeId: 0,
    modalityId: 0,
    sectionId: 0,
    gradeId: 0,
    status: true,
  }

  breadcrumbs: Breadcrumb[] =[
    { name: 'Administración' },
    { name: 'Estudiantes', route: '/students' },
    { name: 'Nuevo' },
  ]

  @SedeModel.State('sedeList') sedeList!: Sede[];
  @SedeModel.Action('list') fetchSedeList!: (vm: any) => ActionMethod;
  @ModalityModel.State('modalityList') modalityList!: Modality[];
  @ModalityModel.Action('list') fetchModalityList!: (vm: any) => ActionMethod;
  @SectionModel.State('sectionList') sectionList!: Section[];
  @SectionModel.Action('list') fetchSectionList!: (vm: any) => ActionMethod;
  @GradeModel.State('gradeList') gradeList!: Grade[];
  @GradeModel.Action('list') fetchGradeList!: (vm: any) => ActionMethod;
  @Students.State('isLoading') isStudentsLoading!: boolean;
  @Students.Action('store') createStudent!: ({ student, vm }: { student: any; vm: any }) => ActionMethod;

  async mounted() {
    try {
      await this.fetchSedeList(this);
      await this.fetchModalityList(this);
      await this.fetchSectionList(this);
      await this.fetchGradeList(this);
    } catch (e) {
      this.$snotify.error('Ha ocurrido un error');
    }
  }

  async onSubmit() {
    const isValid = await (this.$refs.form as any).validate();
    if (isValid) {
      try {
        this.form.year = +this.form.year;
        await this.createStudent({ student: this.form, vm: this });
        this.$router.push('/students');
        // eslint-disable-next-line no-empty
      } catch (e) {
      }
    }
  }
}
</script>
