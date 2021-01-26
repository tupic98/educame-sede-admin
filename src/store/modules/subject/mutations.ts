/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { MutationTree } from 'vuex';
import { SubjectState } from '@/store/modules/subject/types';

export const mutations: MutationTree<SubjectState> = {
  setSubjects(state, { subjects, meta }: { subjects: Subject[], meta: Meta }) {
    state.subjects = subjects;
    state.meta = meta;
  },
  setSubject(state, subject: Subject) {
    state.subject = subject;
  },
  setSubjectList(state, subjects: Subject[]) {
    state.subjectList = subjects;
  },
  toggleLoading(state, status: boolean) {
    state.isLoading = status;
  },
};

export default mutations;
