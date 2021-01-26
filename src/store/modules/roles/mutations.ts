/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { MutationTree } from 'vuex';
import { RoleState } from '@/store/modules/roles/types';

export const mutations: MutationTree<RoleState> = {
  setRoles(state, { roles, meta }: { roles: Role[], meta: Meta }) {
    state.roles = roles;
    state.meta = meta;
  },
  setRole(state, role: Role) {
    state.role = role;
  },
  setRolesList(state, roles: Role[]) {
    state.rolesList = roles;
  },
  toggleLoading(state, status: boolean) {
    state.isLoading = status;
  },
};

export default mutations;
