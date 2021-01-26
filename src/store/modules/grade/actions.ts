/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { GradeState } from '@/store/modules/grade/types';
import GradeService from '@/services/GradeService';

type GradeActionContext = ActionContext<GradeState, RootState>

export const actions: ActionTree<GradeState, RootState> = {
  fetch: async ({ commit }: GradeActionContext, { filters, vm }: { filters: Filters; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const params = { ...filters };
      const { data } = await GradeService.fetch({ params });
      const { data: grades, ...rest } = data;
      commit('setGrades', { grades, meta: rest });
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  list: async ({ commit }: GradeActionContext, vm: any) => {
    try {
      commit('toggleLoading', true);
      const { data } = await GradeService.list();
      commit('setGradeList', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  show: async ({ commit }: GradeActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const { data } = await GradeService.show(id);
      commit('setGrade', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  destroy: async ({ commit }: GradeActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await GradeService.destroy(id);
      vm.$snotify.success('Grado eliminado correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  store: async ({ commit }: GradeActionContext, { grade, vm }: { grade: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await GradeService.store(grade);
      vm.$snotify.success('Grado creada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  update: async ({ commit }: GradeActionContext, { grade, vm }: { grade: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await GradeService.update(grade);
      vm.$snotify.success('Grado actualizado correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
};

export default actions;
