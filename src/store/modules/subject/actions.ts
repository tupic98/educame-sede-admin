/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { SubjectState } from '@/store/modules/subject/types';
import SubjectService from '@/services/SubjectService';

type SubjectActionsContext = ActionContext<SubjectState, RootState>

export const actions: ActionTree<SubjectState, RootState> = {
  fetch: async ({ commit }: SubjectActionsContext, { filters, vm }: { filters: Filters; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const params = { ...filters };
      const { data } = await SubjectService.fetch({ params });
      const { data: subjects, ...rest } = data;
      commit('setSubjects', { subjects, meta: rest });
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  list: async ({ commit }: SubjectActionsContext, vm: any) => {
    try {
      commit('toggleLoading', true);
      const { data } = await SubjectService.list();
      commit('setSubjectList', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  show: async ({ commit }: SubjectActionsContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const { data } = await SubjectService.show(id);
      commit('setSubject', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  destroy: async ({ commit }: SubjectActionsContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await SubjectService.destroy(id);
      vm.$snotify.success('Materia eliminada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  store: async ({ commit }: SubjectActionsContext, { subject, vm }: { subject: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await SubjectService.store(subject);
      vm.$snotify.success('Materia creada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  update: async ({ commit }: SubjectActionsContext, { subject, vm }: { subject: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await SubjectService.update(subject);
      vm.$snotify.success('Materia actualizada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
};

export default actions;
