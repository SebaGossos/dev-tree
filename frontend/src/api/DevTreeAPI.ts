import { isAxiosError } from "axios";
import apiAxios from "../config/axios";
import type { User } from "../types";
export async function getUser() {

  try {
    const { data } = await apiAxios<User>('/user')
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error) 
    }
  }
}
