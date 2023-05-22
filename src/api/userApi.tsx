import Api from "./api";
import { Iuser } from "../interface";
export default class userApi extends Api {
  Getme(token: string) {
    console.log(this.token);

    return this.axiosClient.get(`${this.HOSTNAME}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateMe(body: Iuser) {
    const url = `${this.HOSTNAME}/user`;

    return this.axiosClient.put(url, body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
