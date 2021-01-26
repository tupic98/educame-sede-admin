import BaseService from '@/services/core/BaseService';
import { AxiosResponse } from 'axios';

class GradeService extends BaseService {
  apiVersion = '';

  apiResource = '/admin/grades';

  list(): Promise<AxiosResponse> {
    const url = `${this.apiResource}/list`;
    return this.get({ url });
  }
}

export default new GradeService();
