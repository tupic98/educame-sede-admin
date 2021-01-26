/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { ModalityState } from '@/store/modules/modality/types';
import ModalityService from '@/services/ModalityService';

type ModalityActionContext = ActionContext<ModalityState, RootState>

export const actions: ActionTree<ModalityState, RootState> = {
  fetch: async ({ commit }: ModalityActionContext, { filters, vm }: { filters: Filters; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const params = { ...filters };
      const { data } = await ModalityService.fetch({ params });
      const { data: modalities, ...rest } = data;
      commit('setModalities', { modalities, meta: rest });
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  list: async ({ commit }: ModalityActionContext, vm: any) => {
    try {
      commit('toggleLoading', true);
      const { data } = await ModalityService.list();
      commit('setModalityList', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  show: async ({ commit }: ModalityActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const { data } = await ModalityService.show(id);
      commit('setModality', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  destroy: async ({ commit }: ModalityActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await ModalityService.destroy(id);
      vm.$snotify.success('Modalidad eliminada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  store: async ({ commit }: ModalityActionContext, { modality, vm }: { modality: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await ModalityService.store(modality);
      vm.$snotify.success('Modalidad creada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  update: async ({ commit }: ModalityActionContext, { modality, vm }: { modality: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await ModalityService.update(modality);
      vm.$snotify.success('Modalidad actualizada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
};

export default actions;
