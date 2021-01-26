/* eslint-disable import/no-named-as-default, @typescript-eslint/camelcase, @typescript-eslint/member-delimiter-style */
import { MutationTree } from 'vuex';
import { StudentState } from '@/store/modules/students/types';

export const mutations: MutationTree<StudentState> = {
  setStudents(state, { students, meta }: { students: Student[], meta: Meta }) {
    state.students = students;
    state.meta = meta;
  },
  setStudent(state, student: Student) {
    state.student = student;
  },
  setNotes(state, notes: any) {
    state.notes = notes;
  },
  toggleLoading(state, status: boolean) {
    state.isLoading = status;
  },
};

export default mutations;
