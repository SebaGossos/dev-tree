import { isAxiosError } from "axios";
import apiAxios from "../config/axios";
export async function getUser() {

  try {
    const { data } = await apiAxios('/user')
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error) 
    }
  }
}
