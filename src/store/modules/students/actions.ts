import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { StudentState } from '@/store/modules/students/types';
import StudentService from '@/services/StudentService';

type RoleActionContext = ActionContext<StudentState, RootState>

export const actions: ActionTree<StudentState, RootState> = {
  addSubject: async ({ commit }: RoleActionContext, { payload, vm }: { payload: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await StudentService.addSubject(payload.id, payload);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  updateNote: async ({ commit }: RoleActionContext, { payload, vm }: { payload: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await StudentService.updateNote(payload.id, payload);
      vm.$snotify.success('Nota actualizada correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
      return Promise.reject(response);
    } finally {
      commit('toggleLoading', false);
    }
  },
  fetchNotes: async ({ commit }: RoleActionContext, { id, vm }: { id: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const { data } = await StudentService.fetchNotes(id);
      commit('setNotes', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  fetch: async ({ commit }: RoleActionContext, { filters, vm }: { filters: Filters; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const params = { ...filters };
      const { data } = await StudentService.fetch({ params });
      const { data: students, ...rest } = data;
      commit('setStudents', { students, meta: rest });
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  show: async ({ commit }: RoleActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      const { data } = await StudentService.show(id);
      commit('setStudent', data);
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  destroy: async ({ commit }: RoleActionContext, { id, vm }: { id: number; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await StudentService.destroy(id);
      vm.$snotify.success('Estudiante eliminado correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  store: async ({ commit }: RoleActionContext, { student, vm }: { student: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await StudentService.store(student);
      vm.$snotify.success('Estudiante creado correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
  update: async ({ commit }: RoleActionContext, { student, vm }: { student: any; vm: any }) => {
    try {
      commit('toggleLoading', true);
      await StudentService.update(student);
      vm.$snotify.success('Estudiante actualizado correctamente');
    } catch ({ response }) {
      vm.$snotify.error(response.data.message);
    } finally {
      commit('toggleLoading', false);
    }
  },
};

export default actions;
