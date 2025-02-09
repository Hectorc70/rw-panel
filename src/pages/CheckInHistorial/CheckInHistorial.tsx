/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router";
import { ScreenStatus } from "@/models/enums";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import toast, { Toaster } from "react-hot-toast";
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import { RiEditFill } from "react-icons/ri";
import EmployeesService from "@/services/employess.service";
import { routesNames } from "@/router/routes";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { changeTitle } from "@/redux/globalSlice";
import { ICheckInHistorial } from "@/models/employees/CheckInHistorial.model";

const CheckinHistorialPage: React.FC = () => {

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
  const [items, setItems] = useState<Array<ICheckInHistorial>>([])
  const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)

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
      const response = await EmployeesService.getHistorialCheckIn({ idEmployee: 0 });
      setItems(response)
      setStatusScreen(ScreenStatus.success)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    init()
  }, [])
  const columnsTable = useMemo(
    () => [
      {
        accessorKey: 'employee.names',
        header: 'Nombre',
        size: 200
      },
      {
        accessorKey: 'employee.username',
        header: 'Usuario app',
        size: 30,
      },
      {
        accessorKey: 'companie.name_company',
        header: 'Empresa',
        size: 30
      },
      {
        accessorKey: 'created_date',
        header: 'Último checkin',
        size: 100
      },
    ], []
  )

  const table = useMaterialReactTable({
    columns: columnsTable,
    data: items,
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


export default CheckinHistorialPage