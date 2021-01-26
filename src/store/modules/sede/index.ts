/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { Module } from 'vuex';
import { RootState } from '@/store/types';
import mutations from '@/store/modules/sede/mutations';
import getters from '@/store/modules/sede/getters';
import actions from '@/store/modules/sede/actions';
import { SedeState } from '@/store/modules/sede/types';

export const state: SedeState = {
  sede: {
    address: '',
    code: '',
    id: 0,
    logo: '',
    name: '',
  },
  isLoading: false,
  meta: {
    current_page: 1,
    from: 1,
    to: 1,
    per_page: '10',
    total: 1,
  },
  sedes: [],
  sedeList: [],
};

export const sede: Module<SedeState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
