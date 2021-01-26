/* eslint import/no-cycle: "off", @typescript-eslint/no-var-requires: "off" */
import { ActionContext, ActionTree } from 'vuex';
import { AuthState } from '@/store/modules/auth/types';
import { RootState } from '@/store/types';
import * as types from '@/store/commitTypes';
import AuthService from '@/services/AuthService';
import TokenService from '@/services/core/TokenService';

type AuthActionContext = ActionContext<AuthState, RootState>

export const actions: ActionTree<AuthState, RootState> = {
  authenticate: async ({ commit }: AuthActionContext, { credentials, vm }: { credentials: LoginCredentials; vm: any }) => {
    try {
      commit(types.TOGGLE_LOADING, true);
      const { data } = await AuthService.login(credentials);
      commit(types.SET_TOKEN, data.token);
      vm.$snotify.success('Inicio de sesión correcto');
      vm.$router.push('/');
    } catch ({ response }) {
      commit(types.SET_TOKEN_ERROR);
      vm.$snotify.error(response.data.message);
    } finally {
      commit(types.TOGGLE_LOADING, false);
    }
  },
  logout: ({ commit }: AuthActionContext) => {
    TokenService.removeToken();
  },
};

export default actions;
