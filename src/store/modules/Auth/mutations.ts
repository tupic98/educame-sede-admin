import { MutationTree } from 'vuex';
import { AuthState } from '@/store/modules/Auth/types';
import * as types from '@/store/commitTypes';
import TokenService from '@/services/core/TokenService';

export const mutations: MutationTree<AuthState> = {
  [types.SET_TOKEN](state, token) {
    TokenService.setToken(token);
    state.token = token;
  },
  [types.SET_TOKEN_ERROR](state) {
    state.token = '';
  },
  [types.TOGGLE_LOADING](state, status: boolean) {
    state.isLoading = status;
  }
}

export default mutations;
