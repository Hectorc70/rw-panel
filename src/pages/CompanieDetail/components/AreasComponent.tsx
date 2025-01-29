/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonLarge from "@/components/ButtonLarge"
import ButtonLargeSecondary from "@/components/ButtonLargeSeconday"
import ButtonSmall from "@/components/ButtonSmall"
import FormInput from "@/components/Input"
import ModalComponent from "@/components/Modal"
import { IArea } from "@/models/area.model"
import { ScreenStatus } from "@/models/enums"
import CompaniesService from "@/services/companies.service"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table"
import { MRT_Localization_ES } from "material-react-table/locales/es"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { RiEditFill } from "react-icons/ri"
import { useParams } from "react-router"

const AreasComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25
  })
  const [rowCount, setRowCount] = useState(0)
  const [areas, setAreas] = useState<Array<IArea>>([])
  const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)
  const [statusModal, setStatusModal] = useState<ScreenStatus>(ScreenStatus.success)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [areaDetail, setAreaDetail] = useState<IArea>()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IArea>()

  const init = async () => {
    try {
      getData()
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const getData = async () => {
    try {
      setStatusScreen(ScreenStatus.loading)
      const page = pagination.pageIndex + 1
      const response = await CompaniesService.getAreasAll(page, id ?? '')
      setAreas(response.results as Array<IArea>)
      setRowCount(response.count)
      setStatusScreen(ScreenStatus.success)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    getData()
  }, [pagination])
  const createArea = async () => {
    reset()
    setIsShowModal(true)
    setAreaDetail(undefined)
  }
  const viewAreaDetail = async (id: number) => {
    try {
      setIsShowModal(true)
      setStatusModal(ScreenStatus.loading)
      const response = await CompaniesService.getDetailArea(id)
      reset(response)
      setAreaDetail(response)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setStatusModal(ScreenStatus.success)
    }
  }
  const onSubmitDataArea = async (data: IArea) => {
    try {
      setStatusModal(ScreenStatus.loading)
      const models = [data]
      if (areaDetail != undefined) {
        await CompaniesService.updateArea(data)
      } else {
        await CompaniesService.createArea(models, parseInt(id ?? '0'))
      }
      await init()
      setIsShowModal(false)
      toast.success('Area editada correctamente')
    } catch (error: any) {
      toast.error(error.message)

    } finally {
      setStatusModal(ScreenStatus.success)
    }
  }
  const columnsTable = useMemo(
    () => [
      {
        accessorKey: 'id_area',
        header: 'ID',
        size: 20,
      },
      {
        accessorKey: 'uuid',
        header: 'UUID',
        size: 30,
      },
      {
        accessorKey: 'name_area',
        header: 'Nombre',
        size: 100
      },
      {
        accessorKey: 'created',
        header: 'Creada',
        size: 60
      },
      {
        accessorKey: 'modified',
        header: 'Ult. modifición',
        size: 60
      },
    ], []
  )
  const table = useMaterialReactTable({
    columns: columnsTable,
    data: areas,
    onPaginationChange: setPagination,
    rowCount,
    enableRowActions: true,
    positionActionsColumn: 'last',
    paginationDisplayMode: 'pages',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Acciones',
        size: 300
      }
    },
    manualPagination: true,
    enablePagination: true,
    localization: MRT_Localization_ES,
    initialState: { pagination: { pageSize: 25, pageIndex: 0 }, density: 'compact' },
    state: {
      isLoading: statusScreen === ScreenStatus.loading,
      pagination,
      showLoadingOverlay: statusScreen === ScreenStatus.loading
    },
    muiCircularProgressProps: {
      Component: <div className="h-full w-full flex flex-col items-center justify-center">
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
            fill="primary"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    },
    renderRowActions: ({ row }) => {
      return (
        <div className="flex flex-row justify-center items-center">
          <RiEditFill className=" text-xl cursor-pointer hover:text-hoverPrimary" onClick={() => viewAreaDetail(row.original.id_area)} />
        </div>
      )
    },
    renderToolbarInternalActions: () => (
      <div className='w-full flex flex-row gap-1'>
        <ButtonSmall type="submit" onClick={()=>createArea()} >Crear nueva area</ButtonSmall>
      </div>
    ),
    enableColumnActions: true,
    enableColumnFilters: true,
    enableStickyFooter: true,
    enableDensityToggle: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: true,
    groupedColumnMode: false,
  })
  return (<>
    <div className="w-full">
      <MaterialReactTable table={table} />
      {isShowModal &&
        <ModalComponent
          cancelButton={false}
          childConfirmButton={<></>}
          title="Exportar reportes" onCancelAction={() => setIsShowModal(false)} >

          {
            statusModal === ScreenStatus.loading &&
            <div className="h-1/2">
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

            </div>
          }
          {statusModal === ScreenStatus.success &&
            <form onSubmit={handleSubmit(onSubmitDataArea)}>
              <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-4 bg-hintColor m-2 rounded-lg p-2">
                <FormInput label="Nombre de area" name="start_date"
                  type="text" maxLength={300}
                  error={errors.name_area}
                  register={register('name_area',
                    {
                      required: {
                        value: true,
                        message: "El nombre del area es requerida"
                      },
                    })} />
              </div>
              <div className="flex justify-between">
                <div className="w-36">
                  <ButtonLargeSecondary type="button" onClick={() => setIsShowModal(false)}
                  >Cerrar
                  </ButtonLargeSecondary>
                </div>
                <div className="w-36">
                  <ButtonLarge type="submit">Guardar</ButtonLarge>
                </div>
              </div>
            </form>}
        </ModalComponent>
      }
    </div>
  </>)
}

export default AreasComponent