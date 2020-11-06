import { AuthState } from '@/store/modules/Auth/types';
import { Module } from 'vuex';
import { RootState } from '@/store/types';
import mutations from '@/store/modules/Auth/mutations';
import getters from '@/store/modules/Auth/getters';
import actions from '@/store/modules/Auth/actions';
import TokenService from '@/services/core/TokenService';

export const state: AuthState = {
  token: TokenService.getToken(),
  isLoading: false,
}

export const auth: Module<AuthState, RootState> = {
  state,
  getters,
  actions,
  mutations,
};
