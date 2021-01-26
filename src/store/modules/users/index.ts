/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { UserState } from '@/store/modules/users/types';
import { RootState } from '@/store/types';
import mutations from '@/store/modules/users/mutations';
import getters from '@/store/modules/users/getters';
import actions from '@/store/modules/users/actions';
import { Module } from 'vuex';

export const state: UserState = {
  user: {
    altPhoneNumber: '',
    email: '',
    firstName: '',
    id: 0,
    lastName: '',
    phoneNumber: '',
    role: {
      id: 0,
      name: '',
      type: '',
    },
    status: false,
    subject: null,
    username: '',
  },
  isLoading: false,
  meta: {
    current_page: 1,
    from: 1,
    to: 1,
    per_page: '10',
    total: 1,
  },
  users: [],
  usersList: [],
};

export const users: Module<UserState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
