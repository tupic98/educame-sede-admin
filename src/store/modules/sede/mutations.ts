/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { MutationTree } from 'vuex';
import { SedeState } from '@/store/modules/sede/types';

export const mutations: MutationTree<SedeState> = {
  setSedes(state, { sedes, meta }: { sedes: Sede[], meta: Meta }) {
    state.sedes = sedes;
    state.meta = meta;
  },
  setSede(state, sede: Sede) {
    state.sede = sede;
  },
  setSedeList(state, sedes: Sede[]) {
    state.sedeList = sedes;
  },
  toggleLoading(state, status: boolean) {
    state.isLoading = status;
  },
};

export default mutations;
