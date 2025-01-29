/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosError } from "axios";


export const handleError = (e: any):Error => {
    if (e === undefined) {
        return new Error('Error desconocido');
    }
    if (e instanceof AxiosError) {
        let message = e.toString();
        if (e.response?.data?.data && 'error_details' in e.response.data.data) {
          message = e.response?.data.data.error_details
        }
        else if ('message' in e && e.response?.data) {
          message = e.response?.data.message
        }
        else {
          message = e.response?.data.statusText
        }
        return new Error(message)
    }
    return new Error(
      'Sucedio algo inesperado' + e.toString()
    )
}