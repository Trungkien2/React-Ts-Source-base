import axiosClient from "./axiosClient";
import { AxiosInstance } from "axios";
const token = JSON.parse(localStorage.getItem("token") as string);

export default class Api {
  public HOSTNAME = process.env.REACT_APP_API;
  private table = "";
  public fields = "";
  public token = "";
  public axiosClient: AxiosInstance = axiosClient;

  constructor(table: string) {
    this.table = table;
    this.token = token;
  }

  getAll(token: string) {
    const url = `${this.HOSTNAME}/${this.table}`;
    return this.axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  add(body: any) {
    const url = `${this.HOSTNAME}/${this.table}`;
    return this.axiosClient.post(url, body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  update(body: any, id: string) {
    const url = `${this.HOSTNAME}/${this.table}/${id}`;

    return this.axiosClient.put(url, body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
  delete(id: string) {
    const url = `${this.HOSTNAME}/${this.table}/${id}`;
    return this.axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
