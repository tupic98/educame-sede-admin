/* eslint import/no-cycle: "off" */
import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/store/modules/auth';
import { users } from '@/store/modules/users';
import { roles } from '@/store/modules/roles';
import { subject } from '@/store/modules/subject';
import { sede } from '@/store/modules/sede';
import { permissions } from '@/store/modules/permissions';
import { students } from '@/store/modules/students';
import { modality } from '@/store/modules/modality';
import { section } from '@/store/modules/section';
import { grade } from '@/store/modules/grade';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    roles,
    subject,
    sede,
    permissions,
    students,
    modality,
    section,
    grade,
  },
});
