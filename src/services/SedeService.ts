import BaseService from '@/services/core/BaseService';
import { AxiosResponse } from 'axios';

class SedeService extends BaseService {
  apiVersion = '';

  apiResource = '/admin/sede';

  list(): Promise<AxiosResponse> {
    const url = `${this.apiResource}/list`;
    return this.get({ url });
  }
}

export default new SedeService();
