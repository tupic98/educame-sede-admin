/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { SectionState } from '@/store/modules/section/types';
import SectionService from '@/services/SectionService';

type SectionActionContext = ActionContext<SectionState, RootState>

export const actions: ActionTree<SectionState, RootState> = {
  fetch: async ({ commit }: SectionActionContext, { filters, vm }: { filters: Filters; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const params = { ...filters };
      const { data } = await SectionService.fetch({ params });
      const { data: sections, ...rest } = data;
      commit('setSections', { sections, meta: rest });
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  list: async ({ commit }: SectionActionContext, vm: any) => {
    try {
      commit('toggleLoading', true);
      const { data } = await SectionService.list();
      commit('setSectionList', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  show: async ({ commit }: SectionActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const { data } = await SectionService.show(id);
      commit('setSection', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  destroy: async ({ commit }: SectionActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await SectionService.destroy(id);
      vm.$snotify.success('Sección eliminada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  store: async ({ commit }: SectionActionContext, { section, vm }: { section: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await SectionService.store(section);
      vm.$snotify.success('Sección creada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  update: async ({ commit }: SectionActionContext, { section, vm }: { section: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await SectionService.update(section);
      vm.$snotify.success('Sección actualizada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
};

export default actions;
