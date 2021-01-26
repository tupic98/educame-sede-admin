/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { Module } from 'vuex';
import { RootState } from '@/store/types';
import mutations from '@/store/modules/grade/mutations';
import getters from '@/store/modules/grade/getters';
import actions from '@/store/modules/grade/actions';
import { GradeState } from '@/store/modules/grade/types';

export const state: GradeState = {
  grade: {
    id: 0,
    grade: '',
    institutionalPercentage: 0,
    externalPercentage: 0,
  },
  isLoading: false,
  meta: {
    current_page: 1,
    from: 1,
    to: 1,
    per_page: '10',
    total: 1,
  },
  grades: [],
  gradeList: [],
};

export const grade: Module<GradeState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
