<template>
  <main class="pb-40">
    <page-heading title="Nueva sede" back-route="/sede" :breadcrumbs="breadcrumbs" />
    <form-section>
      <ValidationObserver ref="form" tag="form" autocomplete="off" @submit.prevent="onSubmit">
        <div class="md:grid md:grid-cols-3 md:gap-8 ">
          <div class="md:col-span-1">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Sede
            </h3>
            <p
              class="mt-1 text-sm leading-5 text-gray-500"
            >
              Información de la sede
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
                  vid="logo"
                  name="logo"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.logo" label="Link del logo" name="logo" :error="errors[0]" />
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
                  <input-group v-model="form.code" label="Código" name="code" :error="errors[0]" />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="address"
                  name="dirección"
                  tag="div"
                  rules="required"
                >
                  <input-group v-model="form.address" label="Dirección" name="address" :error="errors[0]" />
                </ValidationProvider>
              </div>
              <div class="col-span-6 sm:col-span-4">
                <toggle-selector v-model="form.active" label="Activo" />
              </div>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </form-section>
    <div class="w-full">
      <div class="flex items-center justify-end">
        <custom-button type="submit" class="ml-2" title="Guardar" :loading="isSedeLoading" @click.prevent="onSubmit" />
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

const Sedes = namespace('sede');

@Component({
  components: {
    PageHeading,
    FormSection,
    CustomButton,
    ToggleSelector,
    InputGroup,
  },
})
export default class NewSedePage extends Vue {
  breadcrumbs: Breadcrumb[] = [
    { name: 'Administración' },
    { name: 'Sede', route: '/sede' },
    { name: 'Nuevo' },
  ]

  form = {
    name: '',
    logo: '',
    code: '',
    address: '',
    active: false,
  };

  @Sedes.State('isLoading') isSedeLoading!: boolean;
  @Sedes.Action('store') createSede!: ({ sede, vm }: { sede: any; vm: any }) => ActionMethod;

  async onSubmit() {
    const isValid = await (this.$refs.form as any).validate();
    if (isValid) {
      try {
        await this.createSede({ sede: this.form, vm: this });
        this.$router.push('/sede');
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>
