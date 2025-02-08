/* eslint-disable @typescript-eslint/no-explicit-any */
import toast, { Toaster } from "react-hot-toast";

import logo from '@/assets/logo.png'
import { useForm } from "react-hook-form";
import AuthService from "@/services/auth.service";
import { useNavigate } from "react-router";
import { routesNames } from "@/router/routes";
import FormInput from "@/components/Input";
import ButtonLarge from "@/components/ButtonLarge";
import { StatusButton } from "@/models/enums";
import { useState } from "react";
import { lsUsername } from "@/common/constants";
const LoginPage: React.FC = () => {
  type FormValues = {
    username: string,
    password: string,
  }
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const [statusButton, setStatusButton] = useState(StatusButton.Enabled)
  const onSubmit = async (data: FormValues) => {
    try {
      setStatusButton(StatusButton.Loading)
      await AuthService.login(data.username, data.password)
      localStorage.setItem(lsUsername, data.username)
      navigate(routesNames.companiesPage, { replace: true })
      setStatusButton(StatusButton.Enabled)
    } catch (error: any) {
      toast.error(error.message)
      setStatusButton(StatusButton.Enabled)
    }
  }
  return (<>
    <div className="h-screen w-scren flex flex-col items-center bg-gray-100">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="flex flex-col items-center mt-24">
        <img src={logo} alt="Nova Realchain" className="w-36 mb-3" />
        <h4 className="text-lg font-bold">Iniciar sesión</h4>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mt-6 mx-4 md:mx-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Usuario" name="user" type="text" error={errors.username} register={register('username',
            {
              required: {
                value: true,
                message: "El usuario es requerido"
              },
              validate: (value: string) => {
                const pattern2 = /^[^\s]+$/;
                if (!value.match(pattern2)) {
                  return 'El usuario no puede contener espacios';
                }
                return true;
              },
            })} />
          <FormInput label="Contraseña" name="password" type="password" error={errors.password} register={register('password',
            {
              required: {
                value: true,
                message: "La contraseña es requerida"
              },
              validate: (value: string) => {
                const pattern2 = /^[^\s]+$/;
                if (!value.match(pattern2)) {
                  return 'La contraseña no puede contener espacios';
                }
                return true;
              },
            })} />
          <div className="flex justify-end">
            <ButtonLarge type="submit" status={statusButton}>Aceptar</ButtonLarge>
          </div>

        </form>
      </div>
    </div>
  </>)
}


export default LoginPage