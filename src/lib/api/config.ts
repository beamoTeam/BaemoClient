import axios from 'axios';
import AccessToken from '../../hooks/useToken';

export default class AxiosClient {
  public client = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000
  });

  public authClient = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    headers : {
      Authorization: "Bearer " + AccessToken.get(),
    }
  })
  
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