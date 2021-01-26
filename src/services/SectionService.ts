import BaseService from '@/services/core/BaseService';
import { AxiosResponse } from 'axios';

class SectionService extends BaseService {
  apiVersion = '';

  apiResource = '/admin/sections';

  list(): Promise<AxiosResponse> {
    const url = `${this.apiResource}/list`;
    return this.get({ url });
  }
}

export default new SectionService();
