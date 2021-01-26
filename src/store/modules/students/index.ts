/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { Module } from 'vuex';
import mutations from '@/store/modules/students/mutations';
import getters from '@/store/modules/students/getters';
import actions from '@/store/modules/students/actions';
import { RootState } from '@/store/types';
import { StudentState } from '@/store/modules/students/types';

export const state: StudentState = {
  student: {
    id: 0,
    year: 0,
    report: '',
    approved: false,
    finalAverage: null,
    institutionalAverage: null,
    code: '0',
    firstTime: false,
    person: {
      id: '0',
      username: '',
      firstName: '',
      lastName: '',
      phoneNumber: null,
      email: null,
      altPhoneNumber: null,
      status: false,
      sede: {
        id: 0,
        name: '',
        logo: '',
        code: '',
        address: '',
      },
    },
    modality: {
      id: 0,
      type: '',
    },
    section: {
      id: 0,
      name: '',
    },
    grade: {
      id: 0,
      grade: '',
      institutionalPercentage: '',
      externalPercentage: '',
    },
  },
  isLoading: false,
  meta: {
    current_page: 1,
    from: 1,
    to: 1,
    per_page: '10',
    total: 1,
  },
  students: [],
  notes: {},
};

export const students: Module<StudentState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
