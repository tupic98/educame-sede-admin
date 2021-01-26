import BaseService from '@/services/core/BaseService';

class UserService extends BaseService {
  apiVersion = '';

  apiResource = '/admin/users';
}

export default new UserService();
