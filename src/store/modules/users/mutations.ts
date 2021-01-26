/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { MutationTree } from 'vuex';
import { UserState } from '@/store/modules/users/types';

export const mutations: MutationTree<UserState> = {
  setUsers(state, { users, meta }: { users: User[], meta: Meta }) {
    state.users = users;
    state.meta = meta;
  },
  setUser(state, user: User) {
    state.user = user;
  },
  toggleLoading(state, status: boolean) {
    state.isLoading = status;
  },
};

export default mutations;
