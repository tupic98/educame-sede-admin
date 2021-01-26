/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { Module } from 'vuex';
import { RootState } from '@/store/types';
import mutations from '@/store/modules/section/mutations';
import getters from '@/store/modules/section/getters';
import actions from '@/store/modules/section/actions';
import { SectionState } from '@/store/modules/section/types';

export const state: SectionState = {
  section: {
    id: 0,
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
  sections: [],
  sectionList: [],
};

export const section: Module<SectionState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
