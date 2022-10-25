import axios from 'axios';
import AccessToken from '../../hooks/useToken';

export default class AxiosClient {
  public client = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000
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
      baseUrl: `http://3.94.44.116:3000`,
      Authorization: "Bearer " + token,
    },
  })
  return authInstance;
}


export const ChatClient = () => {
  const token = AccessToken.get();

  const authInstance = axios.create({
    headers: {
      // baseUrl: `http://3.94.44.116:3999`,
      Authorization: "Bearer " + token,
    },
  })
  return authInstance;
}
