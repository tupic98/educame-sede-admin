/* eslint import/no-cycle: "off", import/no-named-as-default: "off" */
import { AuthState } from '@/store/modules/auth/types';
import { Module } from 'vuex';
import { RootState } from '@/store/types';
import mutations from '@/store/modules/auth/mutations';
import getters from '@/store/modules/auth/getters';
import actions from '@/store/modules/auth/actions';
import TokenService from '@/services/core/TokenService';

export const state: AuthState = {
  token: TokenService.getToken(),
  isLoading: false,
};

export const auth: Module<AuthState, RootState> = {
  state,
  getters,
  actions,
  mutations,
};
