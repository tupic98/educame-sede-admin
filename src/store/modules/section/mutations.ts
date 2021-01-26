/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { MutationTree } from 'vuex';
import { SectionState } from '@/store/modules/section/types';

export const mutations: MutationTree<SectionState> = {
  setSections(state, { sections, meta }: { sections: Section[], meta: Meta }) {
    state.sections = sections;
    state.meta = meta;
  },
  setSection(state, section: Section) {
    state.section = section;
  },
  setSectionList(state, sections: Section[]) {
    state.sectionList = sections;
  },
  toggleLoading(state, status: boolean) {
    state.isLoading = status;
  },
};

export default mutations;
