/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router";
import { ScreenStatus, StatusButton } from "@/models/enums";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import ButtonSmall from "@/components/ButtonSmall";
import toast, { Toaster } from "react-hot-toast";
import { MRT_Localization_ES } from 'material-react-table/locales/es'
// import SearchInput from "@/components/searchInput";
import { useForm } from "react-hook-form";
import { RiEditFill } from "react-icons/ri";
import ModalComponent from "@/components/Modal";
import FormInput from "@/components/Input";
import { baseApi } from "@/common/constants";
import ButtonLarge from "@/components/ButtonLarge";
import { FaFileExcel } from "react-icons/fa6";
import { ICompany } from "@/models/companie.model";
import CompaniesService from "@/services/companies.service";
import { routesNames } from "@/router/routes";

const CompaniesPage: React.FC = () => {
  // type FormValues = {
  //   text_search: string,
  //   //   password: string,
  // }

  interface IForm {
    start_date: string,
    end_date: string
  }
  const navigate = useNavigate()

  // const { register, formState: { errors } } = useForm<FormValues>()
  const {
    register: registerFormExport,
    handleSubmit: handleSubmitExport,
    getValues: exportGetValues,
    formState: { errors: formExportErrors } // Renombramos errors a formExportErrors
  } = useForm<IForm>();
  // const [statusButton, setStatusButton] = useState(StatusButton.Enabled)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [reports, setReports] = useState<Array<ICompany>>([])
  const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)
  // const [statusModal, setStatusModal] = useState<ScreenStatus>(ScreenStatus.success)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25
  })
  const [rowCount, setRowCount] = useState(0)

  const init = () => {
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
      const response = await CompaniesService.getAll(page)
      setReports(response.results as Array<ICompany>)
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
  const columnsTable = useMemo(
    () => [
      {
        accessorKey: 'uuid',
        header: 'UUID',
        size: 30,
      },
      {
        accessorKey: 'name_company',
        header: 'Nombre',
        size: 100
      },
      {
        accessorKey: 'created',
        header: 'Creada',
        size: 60
      },
    ], []
  )

  const table = useMaterialReactTable({
    columns: columnsTable,
    data: reports,
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
          <RiEditFill className=" text-xl cursor-pointer hover:text-hoverPrimary" onClick={() => navigate(`${routesNames.companiesDetailPageName}${row.original.id_c}`)} />
        </div>
      )
    },
    renderToolbarInternalActions: () => (
      <div className='w-full flex flex-row gap-1'>
        <ButtonSmall type="button" onClick={() => navigate(routesNames.companiesCreatePage)} status={StatusButton.Enabled} >Crear nueva empresa</ButtonSmall>
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

  // const onSearch = (value: string) => {
  //   try {
  //     console.log(value)
  //   } catch (error: any) {
  //     toast.error(error.message)
  //   }
  // }

  const onExport = async () => {
    const init = exportGetValues('start_date')
    const end = exportGetValues('end_date')
    window.location.href = `${baseApi}/reports/export/${init}/${end}`
  }
  return (<>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <div className="h-full w-full flex flex-col items-center">
      <div className="w-full">
        <MaterialReactTable table={table} />
      </div>

      {isShowModal &&
        <ModalComponent
          childConfirmButton={
            <ButtonLarge type="button"
              onClick={() => { }}
              status={StatusButton.Enabled}>
              <a className="flex flex-row justify-between"
                onClick={handleSubmitExport(onExport)}>
                <span>Exportar datos</span>
                <FaFileExcel className="text-onPrimary" />
              </a>
            </ButtonLarge>}
          title="Exportar reportes" onCancelAction={() => setIsShowModal(false)} >
          <>
            <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-4 bg-hintColor m-2 rounded-lg p-2">
              <FormInput label="Fecha de inicio" name="start_date"
                type="date" error={formExportErrors.start_date} register={registerFormExport('start_date',
                  {
                    required: {
                      value: true,
                      message: "La fecha de inicio es requerida"
                    },
                  })} />
              <FormInput label="Fecha de inicio" name="start_date"
                type="date" error={formExportErrors.end_date} register={registerFormExport('end_date',
                  {
                    required: {
                      value: true,
                      message: "La fecha final es requerida"
                    },
                  })} />
            </div>
          </>
        </ModalComponent>
      }
    </div>
  </>)
}


export default CompaniesPage