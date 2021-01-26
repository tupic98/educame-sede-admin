/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { MutationTree } from 'vuex';
import { PermissionsState } from '@/store/modules/permissions/types';

export const mutations: MutationTree<PermissionsState> = {
  setPermissions(state, { permissions, meta }: { permissions: Permission[], meta: Meta }) {
    state.permissions = permissions;
    state.meta = meta;
  },
  setPermissionsList(state, permissions: Permission[]) {
    state.permissionsList = permissions;
  },
  toggleLoading(state, status: boolean) {
    state.isLoading = status;
  },
};

export default mutations;
