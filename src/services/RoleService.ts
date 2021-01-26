import BaseService from '@/services/core/BaseService';
import { AxiosResponse } from 'axios';

class RoleService extends BaseService {
  apiVersion = '';

  apiResource = '/admin/roles';

  list(): Promise<AxiosResponse> {
    const url = `${this.apiResource}/list`;
    return this.get({ url });
  }
}

export default new RoleService();
