import { isAxiosError } from "axios";
import apiAxios from "../config/axios";
import type { ProfileForm, User } from "../types";
import api from "../config/axios";
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

export async function updateProfileFront(formData: ProfileForm) {

  try {
    const { data } = await apiAxios.patch<string>('/user', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) { 
      throw new Error(error.response.data.error) 
    }
  }
}

export async function uploadImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  try { 
    const { data } = await api.post('user/image', formData)
    return data 
  } catch (error) {
    if( isAxiosError(error) && error.response ) {
      throw new Error(error.response.data.error)
    }
  }
}