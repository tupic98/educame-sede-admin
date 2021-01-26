<template>
  <main class="pb-40">
    <page-heading title="Nueva materia" :back-route="`/subject/${$route.params.id}`" :breadcrumbs="breadcrumbs" />
    <form-section>
      <ValidationObserver ref="form" tag="form" autocomplete="off" @submit.prevent="onSubmit">
        <div class="md:grid md:grid-cols-3 md:gap-8 ">
          <div class="md:col-span-1">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Materia
            </h3>
            <p
              class="mt-1 text-sm leading-5 text-gray-500"
            >
              Información de la materia
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
                  <input-group v-model="form.name" label="Nombre" name="name" :error="errors[0]" />
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
                <toggle-selector v-model="form.isExternalTest" label="Es prueba externa" />
              </div>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </form-section>
    <div class="w-full">
      <div class="flex items-center justify-end">
        <custom-button type="submit" class="ml-2" title="Guardar" :loading="isSubjectLoading" @click.prevent="onSubmit" />
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ActionMethod } from 'vuex';
import PageHeading from '@/components/layout/PageHeading.vue';
import FormSection from '@/components/ui/FormSection.vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import ToggleSelector from '@/components/ui/ToggleSelector.vue';
import InputGroup from '@/components/ui/InputGroup.vue';
import InputSelect from '@/components/ui/InputSelect.vue';

const SubjectModel = namespace('subject');
const GradeModel = namespace('grade');

@Component({
  components: {
    PageHeading,
    FormSection,
    CustomButton,
    ToggleSelector,
    InputGroup,
    InputSelect,
  },
})
export default class EditSubjectPage extends Vue {
  breadcrumbs: Breadcrumb[] = [
    { name: 'Administración' },
    { name: 'Materia', route: '/subject' },
    { name: 'Nuevo' },
  ]

  form: Subject = {
    id: 0,
    name: '',
    gradeId: 0,
    isExternalTest: false,
  };

  @SubjectModel.State('isLoading') isSubjectLoading!: boolean;
  @SubjectModel.State('subject') subject!: Subject;
  @SubjectModel.Action('update') updateSubject!: ({ subject, vm }: { subject: any; vm: any }) => ActionMethod;
  @SubjectModel.Action('show') fetchSubject!: ({ id, vm }: { id: number; vm: any }) => ActionMethod;
  @GradeModel.State('gradeList') gradeList!: Grade[];
  @GradeModel.Action('list') fetchGradeList!: (vm: any) => ActionMethod;

  async mounted() {
    try {
      await this.fetchSubject({ id: +this.$route.params.id, vm: this });
      await this.fetchGradeList(this);
      this.setCurrentSubject();
    } catch (e) {
      (this as any).$snotify.error('Ha ocurrido un error');
    }
  }

  setCurrentSubject() {
    this.form = {
      ...this.subject,
    };
    this.form.gradeId = this.form.grade?.id;
  }

  async onSubmit() {
    const isValid = await (this.$refs.form as any).validate();
    if (isValid) {
      try {
        await this.updateSubject({ subject: this.form, vm: this });
        this.$router.push('/subject');
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>
