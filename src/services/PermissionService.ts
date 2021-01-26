import BaseService from '@/services/core/BaseService';
import { AxiosResponse } from 'axios';

class PermissionService extends BaseService {
  apiVersion = '';

  apiResource = '/admin/permissions';

  list(): Promise<AxiosResponse> {
    const url = `${this.apiResource}/list`;
    return this.get({ url });
  }
}

export default new PermissionService();
