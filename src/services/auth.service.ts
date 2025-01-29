/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi, lsRol, lsToken } from "@/common/constants";
import { handleError } from "@/common/utils/errors.util";
import { IUser } from "@/models/user.model";
import axios from "axios";


const login = async (id_user: string, password: string) => {
  try {

    const response = await axios.post(`${baseApi}api/users/auth/login/`,
      {
        id_user,
        password,
      }
    )
    localStorage.setItem(lsToken, response.data.data.token)
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}


const refreshToken = async (): Promise<IUser | any> => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await axios.get(`${baseApi}api/users/auth/refresh-token`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    localStorage.setItem(lsToken, response.data.data.token)
    localStorage.setItem(lsRol, response.data.data.rol)
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}




const AuthService = {
  login,
  refreshToken
}

export default AuthService
