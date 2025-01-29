/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonLarge from "@/components/ButtonLarge";
import FormInput from "@/components/Input";
import { IEmploye } from "@/models/employees/employee.model";
import { ScreenStatus } from "@/models/enums";
import { routesNames } from "@/router/routes";
import EmployeesService from "@/services/employess.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaMobile, FaWpforms } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

const EmployeDataComponent: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<IEmploye>()
  const init = async () => {
    try {
      setStatusScreen(ScreenStatus.loading)
      if (id) {
        const response = await EmployeesService.getDetail(id)
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
  const onSubmit = async (data: IEmploye) => {
    try {
      setStatusScreen(ScreenStatus.loading)
      if (id) {
        await EmployeesService.edit(data)
      } else {
        if(data.password ===undefined || data.password===''){
          toast.error('La contraseña es requerida')
          setError('password', { type: 'manual', message: 'La contraseña es requerida' })
          return
        }
        if(data.username ===undefined || data.username===''){
          toast.error('El usuario es requerido')
          setError('username', { type: 'manual', message: 'El usuario es requerido' })
          return
        }
        await EmployeesService.create(data)
      }
      setStatusScreen(ScreenStatus.success)
      if (id) {
        toast.success('Empleado editado correctamente')
      } else {
        navigate(routesNames.companiesPage, { replace: true })
        toast.success('Empleado creado correctamente')
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-start items-center ml-2">
            <FaWpforms className="text-primary text-3xl" />
            <span className="text-start font-bold text-xl ml-3">Datos generales
            </span>
          </div>
          <div className="w-full  grid grid-cols-1 md:grid-cols-3 gap-4 bg-background m-2 rounded-lg p-2">
            <FormInput label="# ID" disabled={true}
              name="id" type="text" error={errors.id} register={register('id',
                {
                  required: {
                    value: false,
                    message: ""
                  },
                })} />
            <FormInput label="Nombres *"
              name="names" maxLength={13} type="text" error={errors.names} register={register('names',
                {
                  required: {
                    value: true,
                    message: "El nombre es requerido"
                  },
                })} />
            <FormInput label="Apellido materno" name="last_name"
              type="text" maxLength={80} error={errors.last_name} register={register('last_name',
                {
                  required: {
                    value: false,
                    message: ""
                  },
                })} />
            <FormInput label="Apellido paterno"
              name="second_last_name" type="text" error={errors.second_last_name}
              register={register('second_last_name',
                {
                  required: {
                    value: false,
                    message: ""
                  },
                })} />
          </div>
          {/* USUARIO */}
          <div className="flex flex-row justify-start items-center ml-2  mt-5">
            <FaMobile className="text-primary text-3xl" />
            <span className="text-start  w-full font-bold text-xl ml-3">USUARIO APP</span>
          </div>
          <div className="w-full  grid grid-cols-1 md:grid-cols-3 gap-4 bg-background m-2 rounded-lg p-2">
            <FormInput label="Usuario" maxLength={40} name="username"
              error={errors.username} register={register('username',
                {
                  required: {
                    value: true,
                    message: "El usuario es requerido"
                  },
                })}
            />
            <FormInput label="Contraseña" name="password"
              type="text" error={errors.password} minLength={3}
              register={register('password',
                {
                  required: {
                    value: false,
                    message: ""
                  },
                })} />
          </div>
          <span className="text-start  w-full font-bold text-xl mt-5"></span>
          <div className="full flex justify-end">
            <div className="w-36">
              <ButtonLarge type="submit">Guardar</ButtonLarge>
            </div>
          </div>
        </form>
      </div>
    }
  </>)
}

export default EmployeDataComponent