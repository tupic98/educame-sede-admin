<template>
  <main class="pb-40">
    <page-heading title="Detalle materia" back-route="/subject" :breadcrumbs="breadcrumbs">
      <template slot="actions">
        <custom-button
          title="Editar"
          color="white"
          size="small"
          class="mr-2"
          :to="`/subject/${subject.id}/edit`"
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
      </template>
    </page-heading>
    <section v-if="subject">
      <div class="overflow-hidden bg-white border border-gray-100 shadow sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-100 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Materia #{{ subject.id }}
          </h3>
          <p class="max-w-2xl mt-1 text-sm leading-5 text-gray-500">
            Información general de la materia {{ subject.name }}.
          </p>
        </div>
        <div>
          <dl>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Nombre
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {{ subject.name }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Grado
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {{ subject.grade.grade }}
              </dd>
            </div>
            <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium leading-5 text-gray-500">
                Es prueba externa
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <active-indicator :status="Boolean(subject.isExternalTest)" />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
    <loading :active="isSubjectLoading" :is-full-page="false" />
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

interface Breadcrumb {
  name: string;
  route?: string;
}

const SubjectModel = namespace('subject');

@Component({
  components: {
    PageHeading,
    CustomButton,
    ActiveIndicator,
    Loading,
  },
})
export default class ShowSubjectPage extends Vue {
  breadcrumbs: Breadcrumb[] = [
    { name: 'Administración' },
    { name: 'Materia', route: '/subject' },
    { name: 'Detalle' },
  ]

  @SubjectModel.State('isLoading') isSubjectLoading!: boolean;
  @SubjectModel.State('subject') subject!: Subject;
  @SubjectModel.Action('show') fetchSubject!: ({ id, vm }: { id: number; vm: any }) => ActionMethod

  async mounted() {
    const { id } = this.$route.params;
    await this.fetchSubject({ id: +id, vm: this });
    if (!this.subject.id) {
      this.redirectBack();
    }
  }

  redirectBack() {
    this.$router.push('/subject');
  }
}
</script>
