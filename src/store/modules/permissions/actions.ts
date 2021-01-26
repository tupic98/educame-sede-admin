import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { PermissionsState } from '@/store/modules/permissions/types';
import PermissionService from '@/services/PermissionService';

type PermissionActionsContext = ActionContext<PermissionsState, RootState>

export const actions: ActionTree<PermissionsState, RootState> = {
  fetch: async ({ commit }: PermissionActionsContext , { filters, vm }: { filters: Filters; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const params = { ...filters };
      const { data } = await PermissionService.fetch({ params });
      const { data: permissions, ...rest } = data;
      commit('setPermissions', { permissions, meta: rest });
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  list: async ({ commit }: PermissionActionsContext, vm: any) => {
    try {
      commit('toggleLoading', true);
      const { data } = await PermissionService.list();
      commit('setPermissionsList', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
};

export default actions;
