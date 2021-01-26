/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { RoleState } from '@/store/modules/roles/types';
import { Module } from 'vuex';
import mutations from '@/store/modules/roles/mutations';
import getters from '@/store/modules/roles/getters';
import actions from '@/store/modules/roles/actions';
import { RootState } from '@/store/types';

export const state: RoleState = {
  role: {
    type: '',
    name: '',
    id: 0,
  },
  isLoading: false,
  meta: {
    current_page: 1,
    from: 1,
    to: 1,
    per_page: '10',
    total: 1,
  },
  roles: [],
  rolesList: [],
};

export const roles: Module<RoleState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
