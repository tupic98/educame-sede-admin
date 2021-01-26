/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { ActionContext, ActionTree } from 'vuex';
import { UserState } from '@/store/modules/users/types';
import { RootState } from '@/store/types';
import UserService from '@/services/UserService';

type UserActionContext = ActionContext<UserState, RootState>

export const actions: ActionTree<UserState, RootState> = {
  fetch: async ({ commit }: UserActionContext, { filters, vm }: { filters: Filters, vm: any }) => {
    try {
      commit('toggleLoading', true);
      const params = { ...filters };
      const { data } = await UserService.fetch({ params });
      const { data: users, ...rest } = data;
      commit('setUsers', { users, meta: rest });
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  show: async ({ commit }: UserActionContext, { id, vm }: { id: number, vm: any }) => {
    try {
      commit('toggleLoading', true);
      const { data } = await UserService.show(id);
      commit('setUser', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  destroy: async ({ commit }: UserActionContext, { id, vm }: { id: number, vm: any }) => {
    try {
      commit('toggleLoading', true);
      await UserService.destroy(id);
      vm.$snotify.success('Usuario eliminado correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  store: async ({ commit }: UserActionContext, { user, vm }: { user: any, vm: any }) => {
    try {
      commit('toggleLoading', true);
      await UserService.store(user);
      vm.$snotify.success('Usuario creado correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
      await Promise.reject(response);
    } finally {
      commit('toggleLoading', false);
    }
  },
  update: async ({ commit }: UserActionContext, { user, vm }: { user: any, vm: any }) => {
    try {
      commit('toggleLoading', true);
      await UserService.update(user);
      vm.$snotify.success('Usuario actualizado correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
};

export default actions;
