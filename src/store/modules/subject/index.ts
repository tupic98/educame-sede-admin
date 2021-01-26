/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { SubjectState } from '@/store/modules/subject/types';
import { Module } from 'vuex';
import { RootState } from '@/store/types';
import getters from '@/store/modules/subject/getters';
import actions from '@/store/modules/subject/actions';
import mutations from '@/store/modules/subject/mutations';

export const state: SubjectState = {
  subject: {
    grade: {
      externalPercentage: 0,
      grade: '',
      id: 0,
      institutionalPercentage: 0,
    },
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
  subjects: [],
  subjectList: [],
};

export const subject: Module<SubjectState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
