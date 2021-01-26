/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { MutationTree } from 'vuex';
import { GradeState } from '@/store/modules/grade/types';

export const mutations: MutationTree<GradeState> = {
  setGrades(state, { grades, meta }: { grades: Grade[], meta: Meta }) {
    state.grades = grades;
    state.meta = meta;
  },
  setGrade(state, grade: Grade) {
    state.grade = grade;
  },
  setGradeList(state, grades: Grade[]) {
    state.gradeList = grades;
  },
  toggleLoading(state, status: boolean) {
    state.isLoading = status;
  },
};

export default mutations;
