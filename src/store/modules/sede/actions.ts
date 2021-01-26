/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { SedeState } from '@/store/modules/sede/types';
import SedeService from '@/services/SedeService';

type SedeActionContext = ActionContext<SedeState, RootState>

export const actions: ActionTree<SedeState, RootState> = {
  fetch: async ({ commit }: SedeActionContext, { filters, vm }: { filters: Filters; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const params = { ...filters };
      const { data } = await SedeService.fetch({ params });
      const { data: sedes, ...rest } = data;
      commit('setSedes', { sedes, meta: rest });
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  list: async ({ commit }: SedeActionContext, vm: any) => {
    try {
      commit('toggleLoading', true);
      const { data } = await SedeService.list();
      commit('setSedeList', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  show: async ({ commit }: SedeActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const { data } = await SedeService.show(id);
      commit('setSede', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  destroy: async ({ commit }: SedeActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await SedeService.destroy(id);
      vm.$snotify.success('Sede eliminada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  store: async ({ commit }: SedeActionContext, { sede, vm }: { sede: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await SedeService.store(sede);
      vm.$snotify.success('Sede creada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  update: async ({ commit }: SedeActionContext, { sede, vm }: { sede: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await SedeService.update(sede);
      vm.$snotify.success('Sede actualizada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
};

export default actions;
