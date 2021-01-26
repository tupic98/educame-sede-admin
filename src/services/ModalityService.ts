import BaseService from '@/services/core/BaseService';
import { AxiosResponse } from 'axios';

class ModalityService extends BaseService {
  apiVersion = '';

  apiResource = '/admin/modality';

  list(): Promise<AxiosResponse> {
    const url = `${this.apiResource}/list`;
    return this.get({ url });
  }
}

export default new ModalityService();
