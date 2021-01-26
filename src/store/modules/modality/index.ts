/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { Module } from 'vuex';
import { RootState } from '@/store/types';
import mutations from '@/store/modules/modality/mutations';
import getters from '@/store/modules/modality/getters';
import actions from '@/store/modules/modality/actions';
import { ModalityState } from '@/store/modules/modality/types';

export const state: ModalityState = {
  modality: {
    id: 0,
    type: '',
  },
  isLoading: false,
  meta: {
    current_page: 1,
    from: 1,
    to: 1,
    per_page: '10',
    total: 1,
  },
  modalities: [],
  modalityList: [],
};

export const modality: Module<ModalityState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
