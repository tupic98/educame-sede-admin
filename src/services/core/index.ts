import HttpService from '@/services/core/HttpService';
import TokenService from '@/services/core/TokenService';

HttpService.setBaseUrl(process.env.VUE_APP_API_URL);
const token = TokenService.getToken();

if (token) {
  HttpService.setAuthorizationHeader(token);
  HttpService.mount401Interceptor();
}
