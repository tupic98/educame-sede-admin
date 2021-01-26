/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { RoleState } from '@/store/modules/roles/types';
import { Module } from 'vuex';
import mutations from '@/store/modules/permissions/mutations';
import getters from '@/store/modules/permissions/getters';
import actions from '@/store/modules/permissions/actions';
import { RootState } from '@/store/types';
import { PermissionsState } from '@/store/modules/permissions/types';

export const state: PermissionsState = {
  permissions: [],
  isLoading: false,
  meta: {
    current_page: 1,
    from: 1,
    to: 1,
    per_page: '10',
    total: 1,
  },
  permissionsList: [],
};

export const permissions: Module<PermissionsState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
