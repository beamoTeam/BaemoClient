import axios from 'axios';

export default class AxiosClient {
  public client = axios.create({
    timeout: 5000
  });

  public async get(url: string): Promise<any> {
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