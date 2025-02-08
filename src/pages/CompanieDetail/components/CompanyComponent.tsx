/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonLarge from "@/components/ButtonLarge";
import FormInput from "@/components/Input";
import { CompanyModel, ICompany } from "@/models/companie.model";
import { ScreenStatus } from "@/models/enums";
import { changeTitle } from "@/redux/globalSlice";
import { AppDispatch } from "@/redux/store";
import { routesNames } from "@/router/routes";
import CompaniesService from "@/services/companies.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaWpforms } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

const CompanyComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const [images, setImages] = useState<File | undefined>();
  const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)
  const [imagePreviews, setImagePreviews] = useState<string>('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ICompany>()
  const init = async () => {
    try {
      setStatusScreen(ScreenStatus.loading)
      if (id) {
        const response = await CompaniesService.getDetail(id)
        reset(response)
        dispatch(changeTitle(response.name_company));
      } else {
        dispatch(changeTitle('Crear empresa'));
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
        model.fileLogo = images
        // debugger
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImages(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews(reader.result as string); // Guardar la vista previa
      };
    } else {
      setImages(undefined);
      setImagePreviews('');

    }

  };
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
            <FormInput label="UUID" disabled={true}
              name="uuid" type="text" error={errors.uuid} register={register('uuid',
                {
                  required: {
                    value: false,
                    message: ""
                  },
                })} />
            <FormInput label="RFC"
              name="rfc" maxLength={13} type="text" error={errors.rfc} register={register('rfc',
                {
                  required: {
                    value: false,
                    message: ""
                  },
                })} />
            <FormInput label="Nombre de empresa *" name="name_company"
              type="text" maxLength={80} error={errors.name_company} register={register('name_company',
                {
                  required: {
                    value: true,
                    message: "El nombre es requerido"
                  },
                })} />
            <FormInput label="Correo de contacto"
              name="email" type="email" error={errors.email}
              register={register('email',
                {
                  required: {
                    value: false,
                    message: ""
                  },
                })} />
            {id == undefined && <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />

              <div className="image-previews grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto max-h-24">
                {imagePreviews && (
                  <div className="image-preview">
                    <img src={imagePreviews} alt={`Preview`} width={100} height={100} />
                  </div>
                )}
              </div>
            </div>}
          </div>
          {/* DATOS DE UBICACION */}
          <div className="flex flex-row justify-start items-center ml-2  mt-5">
            <HiLocationMarker className="text-primary text-3xl" />
            <span className="text-start  w-full font-bold text-xl ml-3">Ubicación</span>
          </div>
          <div className="w-full  grid grid-cols-1 md:grid-cols-3 gap-4 bg-background m-2 rounded-lg p-2">
            <FormInput label="Calle" maxLength={300} name="street"
              error={errors.street} register={register('street',
                {
                  required: {
                    value: false,
                    message: ""
                  },
                })}
            />
            <FormInput label="Colonia" name="suburb" maxLength={300}
              type="text" error={errors.suburb} register={register('suburb',
                {
                  required: {
                    value: false,
                    message: ""
                  },
                })} />
            <div className="flex flex-row">
              <div className="w-1/3">
                <FormInput label="Número ext." name="number_ext" maxLength={10}
                  type="text" error={errors.number_ext} register={register('number_ext',
                    {
                      required: {
                        value: false,
                        message: ""
                      },
                    })} />
              </div>
              <div className="w-1/3">
                <FormInput label="Número int." name="number_int" maxLength={10}
                  type="text" error={errors.number_int} register={register('number_int',
                    {
                      required: {
                        value: false,
                        message: ""
                      },
                    })} />
              </div>
              <div className="w-1/3">
                <FormInput label="Codigo postal" name="postal_code" maxLength={10}
                  type="text" error={errors.postal_code} register={register('postal_code',
                    {
                      required: {
                        value: false,
                        message: ""
                      },
                    })} />
              </div>
            </div>
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

export default CompanyComponent