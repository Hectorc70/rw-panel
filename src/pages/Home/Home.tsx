/* eslint-disable @typescript-eslint/no-explicit-any */

import { ScreenStatus, StatusButton } from "@/models/enums";
import { useEffect, useState, } from "react";
import { useForm } from "react-hook-form";
import ButtonLarge from "@/components/ButtonLarge";
import { Toaster } from "react-hot-toast";
const HomePage: React.FC = () => {
  const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)
  const [data, setData] = useState<any>([])

  const { register, formState: { errors }, setValue, getValues } = useForm<IForm>()
  useEffect(() => {
    // init()
  }, [])



  return (<>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <div className="h-full w-full flex flex-col items-center">
      <span className="text-start font-bold text-xl ml-3">Rango de fechas</span>
      <div className="w-full sm:w-1/3 flex flex-row flex-wrap justify-between items-center bg-hintColor m-2 rounded-lg p-2">
        <div className="w-24">
          <ButtonLarge type="submit" status={StatusButton.Enabled}>Aceptar</ButtonLarge>
        </div>
      </div>
      <div className="bg-hintColor m-2 rounded-lg p-2">
      </div>

    </div>
  </>)
}


export default HomePage