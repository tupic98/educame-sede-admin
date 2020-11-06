import HttpService from '@/services/core/HttpService';
import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRATION_DAYS = 7;

export default {
  /**
   * Get token from Cookies
   *
   * @return {string|null}
   **/
  getToken(): string | undefined {
    return Cookies.get(TOKEN_KEY);
  },
  /**
   * Get refresh token from Cookies
   *
   * @return {string|null}
   **/
  getRefreshToken(): string | undefined {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },
  /**
   * Set token in Cookies
   *
   * @param {string} token
   * @param {boolean} [remember=true]
   **/
  setToken(token: string, remember:boolean = true) {
    Cookies.set(TOKEN_KEY, token, { expires: remember ? TOKEN_EXPIRATION_DAYS : undefined });
    HttpService.setAuthorizationHeader(token);
  },
  removeToken() {
    Cookies.remove(TOKEN_KEY);
  },
  setRefreshToken(refreshToken: string, remember: boolean = true) {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: remember ? TOKEN_EXPIRATION_DAYS : undefined });
  },
  removeRefreshToken() {
    Cookies.remove(REFRESH_TOKEN_KEY);
  }
}

