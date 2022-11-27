import axios, { AxiosError } from 'axios';
import AccessToken from '../../hooks/useToken';

export default class AxiosClient {
  public client = axios.create({
    timeout: 20000
  });

  public async get(url: string): Promise<any> {
    try {
      const res = await this.client.get(url);
      if (res.status === 200) {
        return res.data;
      }
    }
    catch (err: any) {
      console.error(err);
      return err.response;
    }
  }

  public async post(url: string, data: any): Promise<any> {
    try {
      const res = await this.client.post(url, data);
      if (res.status === 200) {
        return res.data;
      }
    }
    catch (err: any) {
      console.error(err);
      return err.response;
    }
  }
}

export const AuthClient = () => {
  const token = AccessToken.get();
  // console.log({ token });
  const authInstance = axios.create({
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  return authInstance;
}


export const ChatClient = () => {
  const token = AccessToken.get();

  const authInstance = axios.create({
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  return authInstance;
}

axios.interceptors.response.use(
  (res) => {
    if (!(res.status === 200 || res.status === 201 || res.status === 204))
      throw new Error();

    if (res.data.errors) throw new Error(res.data.errors);

    return res.data.data;
  },
  async (error) => {
    const err = error as AxiosError;

    if (err.response?.status === 401) {
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);