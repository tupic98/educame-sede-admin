import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { AuthState } from '@/store/modules/Auth/types';

export const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated: (state) => !!state.token,
};

export default getters;
