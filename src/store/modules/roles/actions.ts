import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { RoleState } from '@/store/modules/roles/types';
import RoleService from '@/services/RoleService';

type RoleActionContext = ActionContext<RoleState, RootState>

export const actions: ActionTree<RoleState, RootState> = {
  fetch: async ({ commit }: RoleActionContext, { filters, vm }: { filters: Filters; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const params = { ...filters };
      const { data } = await RoleService.fetch({ params });
      const { data: roles, ...rest } = data;
      commit('setRoles', { roles, meta: rest });
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  list: async ({ commit }: RoleActionContext, vm: any) => {
    try {
      commit('toggleLoading', true);
      const { data } = await RoleService.list();
      commit('setRolesList', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  show: async ({ commit }: RoleActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const { data } = await RoleService.show(id);
      commit('setRole', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  destroy: async ({ commit }: RoleActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await RoleService.destroy(id);
      vm.$snotify.success('Rol eliminado correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  store: async ({ commit }: RoleActionContext, { role, vm }: { role: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await RoleService.store(role);
      vm.$snotify.success('Rol creado correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  update: async ({ commit }: RoleActionContext, { role, vm }: { role: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await RoleService.update(role);
      vm.$snotify.success('Rol actualizado correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
};

export default actions;
