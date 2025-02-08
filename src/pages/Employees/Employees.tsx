/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router";
import { ScreenStatus, StatusButton } from "@/models/enums";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import ButtonSmall from "@/components/ButtonSmall";
import toast, { Toaster } from "react-hot-toast";
import { MRT_Localization_ES } from 'material-react-table/locales/es'
// import SearchInput from "@/components/searchInput";
import { RiEditFill } from "react-icons/ri";
import { IEmploye } from "@/models/employees/employee.model";
import EmployeesService from "@/services/employess.service";
import { routesNames } from "@/router/routes";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { changeTitle } from "@/redux/globalSlice";

const EmployePage: React.FC = () => {

  // interface IForm {
  //   start_date: string,
  //   end_date: string
  // }
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  // const { register, formState: { errors } } = useForm<FormValues>()
  // const {
  //   register: registerFormExport,
  //   handleSubmit: handleSubmitExport,
  //   getValues: exportGetValues,
  //   formState: { errors: formExportErrors } // Renombramos errors a formExportErrors
  // } = useForm<IForm>();
  // const [statusButton, setStatusButton] = useState(StatusButton.Enabled)
  const [items, setItems] = useState<Array<IEmploye>>([])
  const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)
  // const [statusModal, setStatusModal] = useState<ScreenStatus>(ScreenStatus.success)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25
  })
  const [rowCount, setRowCount] = useState(0)

  const init = () => {
    try {
      dispatch(changeTitle("Empleados"));
      getData()
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const getData = async () => {
    try {
      setStatusScreen(ScreenStatus.loading)
      const page = pagination.pageIndex + 1
      const response = await EmployeesService.getAll(page)
      setItems(response.results as Array<IEmploye>)
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
        accessorKey: 'names',
        header: 'Nombre',
        size: 80
      },
      {
        accessorKey: 'username',
        header: 'Usuario app',
        size: 80,
      },
      {
        accessorKey: 'is_active',
        header: 'usuario activo',
        size: 30
      },
      {
        accessorKey: 'created_date',
        header: 'Creado',
        size: 60
      },
    ], []
  )

  const table = useMaterialReactTable({
    columns: columnsTable,
    data: items,
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
          <RiEditFill className=" text-xl cursor-pointer hover:text-hoverPrimary" onClick={() => navigate(`${routesNames.employeesDetailPageName}${row.original.id}`)} />
        </div>
      )
    },
    renderToolbarInternalActions: () => (
      <div className='w-full flex flex-row gap-1'>
        <ButtonSmall type="button" onClick={() => navigate(routesNames.employeesCreatePage)} status={StatusButton.Enabled} >Crear nuevo empleado</ButtonSmall>
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

  return (<>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <div className="h-full w-full flex flex-col items-center">
      <div className="w-full">
        <MaterialReactTable table={table} />
      </div>
    </div>
  </>)
}


export default EmployePage