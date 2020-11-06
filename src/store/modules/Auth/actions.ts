import { ActionContext, ActionTree } from 'vuex';
import { AuthState } from '@/store/modules/Auth/types';
import { RootState } from '@/store/types';
import * as types from '@/store/commitTypes';
import AuthService from '@/services/AuthService';
import TokenService from '@/services/core/TokenService';

const localStore = require('store');

interface AuthActionContext extends ActionContext<AuthState, RootState> { }

export const actions: ActionTree<AuthState, RootState> = {
  authenticate: async ({ commit }: AuthActionContext, credentials: LoginCredentials) => {
    try {
      commit(types.TOGGLE_LOADING, true);
      const { data } = await AuthService.login(credentials);
      commit(types.SET_TOKEN, data.access_token);
    } catch (e) {
      commit(types.SET_TOKEN_ERROR);
    } finally {
      commit(types.TOGGLE_LOADING, true);
    }
  },
  logout: ({ commit }: AuthActionContext) => {
    TokenService.removeToken();
  }
}

export default actions;
