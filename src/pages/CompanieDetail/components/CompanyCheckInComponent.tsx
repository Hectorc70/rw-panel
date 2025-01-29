/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonLarge from "@/components/ButtonLarge";
import { CompanyModel, ICompany } from "@/models/companie.model";
import { ScreenStatus } from "@/models/enums";
import { routesNames } from "@/router/routes";
import CompaniesService from "@/services/companies.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const CompanyCheckInComponent: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ICompany>()
  const init = async () => {
    try {
      setStatusScreen(ScreenStatus.loading)
      if (id) {
        const response = await CompaniesService.getDetail(id)
        reset(response)
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setStatusScreen(
        ScreenStatus.success
      )
    }
  }
  useEffect(() => {
    init()
  }, [])
  const onSubmit = async (data: ICompany) => {
    try {
      const model: CompanyModel = data as CompanyModel
      setStatusScreen(ScreenStatus.loading)
      if (id) {
        // await CompaniesService.updateReport(id, report)
      } else {
        await CompaniesService.create(model)
      }
      setStatusScreen(ScreenStatus.success)
      if (id) {
        await CompaniesService.edit(model)
        toast.success('Empresa editada correctamente')
      } else {
        navigate(routesNames.companiesPage, { replace: true })
        toast.success('Empresa creada correctamente')
      }

    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setStatusScreen(ScreenStatus.success)
    }
  }

  return (<>
    {statusScreen === ScreenStatus.loading && <>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <svg
          className="w-16 h-16 mr-2 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          type="button"
        >
          <circle
            className="opacity-75"
            cx="12"
            cy="12"
            r="10"
            stroke="white"
            strokeWidth="3"
          ></circle>
          <path
            className="opacity-75"
            fill="#4B82FF"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    </>}
    {
      statusScreen === ScreenStatus.success && <div className="w-full py-5">
        <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-4 bg-background m-2 rounded-lg p-2">
          <div className="">

          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="text-start  w-full font-bold text-xl mt-5"></span>
            <div className="full flex justify-end">
              <div className="w-36">
                <ButtonLarge type="submit">Guardar</ButtonLarge>
              </div>
            </div>
          </form>
        </div>

      </div>
    }
  </>)
}

export default CompanyCheckInComponent