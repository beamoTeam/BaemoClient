import axios from 'axios';
import AccessToken from '../../hooks/useToken';

export default class AxiosClient {
  public client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000
  });

<<<<<<< HEAD
  public async get(url: string): Promise<any> {
=======
  public authClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers : {
      Authorization: AccessToken.get(),
    }
  })

  async get(url: string): Promise<any> {
>>>>>>> 9893d184ae93da73f4b8e38806dd00762547c9b1
    try {
      const res = await this.client.get(url);
      if (res.status === 200) {
        return res.data;
      }
    }
    catch (err: any) {
      throw new Error(err);
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
      throw new Error(err);
    }
  }
}