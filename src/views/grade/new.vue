<template>
  <main class="pb-40">
    <page-heading title="Nuevo grado" back-route="/grade" :breadcrumbs="breadcrumbs" />
    <form-section>
      <ValidationObserver ref="form" tag="form" autocomplete="off" @submit.prevent="onSubmit">
        <div class="md:grid md:grid-cols-3 md:gap-8 ">
          <div class="md:col-span-1">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Grado
            </h3>
            <p
              class="mt-1 text-sm leading-5 text-gray-500"
            >
              Información del grado
            </p>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="grid grid-cols-6 row-gap-2 col-gap-6">
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="grade"
                  name="grado"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.grade" label="Grado" name="grade" :error="errors[0]" />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="ipercentage"
                  name="porcentaje institucional"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.institutionalPercentage" label="Porcentaje Institucional" name="ipercentage" :error="errors[0]" />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="epercentage"
                  name="porcentaje externo"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.externalPercentage" label="Porcentaje Externo" name="epercentage" :error="errors[0]" />
                </ValidationProvider>
              </div>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </form-section>
    <div class="w-full">
      <div class="flex items-center justify-end">
        <custom-button type="submit" class="ml-2" title="Guardar" :loading="isGradeLoading" @click.prevent="onSubmit" />
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

const GradeModel = namespace('grade');

@Component({
  components: {
    PageHeading,
    FormSection,
    CustomButton,
    ToggleSelector,
    InputGroup,
  },
})
export default class NewGradePage extends Vue {
  breadcrumbs: Breadcrumb[] = [
    { name: 'Administración' },
    { name: 'Grado', route: '/grade' },
    { name: 'Nuevo' },
  ]

  form = {
    grade: '',
    institutionalPercentage: 0,
    externalPercentage: 0,
  };

  @GradeModel.State('isLoading') isGradeLoading!: boolean;
  @GradeModel.Action('store') createGrade!: ({ grade, vm }: { grade: any; vm: any }) => ActionMethod;

  async onSubmit() {
    const isValid = await (this.$refs.form as any).validate();
    if (isValid) {
      try {
        await this.createGrade({ grade: this.form, vm: this });
        this.$router.push('/grade');
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>
