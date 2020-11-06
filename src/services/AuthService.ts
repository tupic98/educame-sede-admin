import BaseService from '@/services/core/BaseService';
import { AxiosResponse } from 'axios';

class AuthService extends BaseService {
  apiVersion = '/v1';

  apiResource = '/admin/auth';

  login(payload: LoginCredentials): Promise<AxiosResponse> {
    const url = `${this.apiResource}/login`;
    return this.post({ payload, url });
  }

  me(): Promise<AxiosResponse> {
    const url = `${this.apiResource}/me`;
    return this.get({ url });
  }
}

export default new AuthService();
