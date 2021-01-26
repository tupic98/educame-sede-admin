/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { MutationTree } from 'vuex';
import { ModalityState } from '@/store/modules/modality/types';

export const mutations: MutationTree<ModalityState> = {
  setModalities(state, { modalities, meta }: { modalities: Modality[], meta: Meta }) {
    state.modalities = modalities;
    state.meta = meta;
  },
  setModality(state, modality: Modality) {
    state.modality = modality;
  },
  setModalityList(state, modalities: Modality[]) {
    state.modalityList = modalities;
  },
  toggleLoading(state, status: boolean) {
    state.isLoading = status;
  },
};

export default mutations;
