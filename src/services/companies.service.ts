/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi, lsToken } from "@/common/constants";
import { handleError } from "@/common/utils/errors.util";
import { AreaModel, IArea } from "@/models/area.model";
import { CompanyModel } from "@/models/companie.model";
import axios from "axios";


const getAll = async (page: number) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await axios.get(`${baseApi}companies/all?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }

    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}

const getDetail = async (id: string) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await axios.get(`${baseApi}companies/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}

const create = async (model: CompanyModel) => {
  try {
    const token = localStorage.getItem(lsToken)
    const data = new CompanyModel(model).toFormData()
    const response = await axios.post(`${baseApi}companies/create/`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent></calculated>',
          'Accept-Encoding': 'gzip, deflate, br',
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}

const edit = async (model: CompanyModel,) => {
  try {
    const token = localStorage.getItem(lsToken)
    const data = new CompanyModel(model).toFormData()
    const response = await axios.put(`${baseApi}companies/edit/${model.id_c}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}


const getAreasAll = async (page: number, idCompany: string) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await axios.get(`${baseApi}companies/areas/by-company/${idCompany}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }

    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}

const getDetailArea = async (id: number) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await axios.get(`${baseApi}companies/areas/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}
const createArea = async (models: IArea[], companyId: number) => {
  try {
    const token = localStorage.getItem(lsToken)
    const formDataArray: FormData[] = [];
    models.map((model) => {
      model.company = companyId
      formDataArray.push(new AreaModel(model).toFormData())
    });
    const response = await axios.post(`${baseApi}companies/areas/create/`,
      formDataArray,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}

const updateArea = async (model: IArea) => {
  try {
    const token = localStorage.getItem(lsToken)
    const formDataArray = new AreaModel(model).toFormData()
    const response = await axios.put(`${baseApi}companies/areas/update/${model.id_area}`,
      formDataArray,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}
const CompaniesService = {
  getAll,
  getDetail,
  create,
  edit,
  getAreasAll,
  createArea,
  getDetailArea,
  updateArea
}

export default CompaniesService
