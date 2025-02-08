/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/common/constants";
import ButtonLarge from "@/components/ButtonLarge";
import { IEmploye } from "@/models/employees/employee.model";
import { IEmployeCheckIn } from "@/models/employees/employeeCheckIn.model";
import { ScreenStatus } from "@/models/enums";
import { routesNames } from "@/router/routes";
import EmployeesService from "@/services/employess.service";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaDownload } from "react-icons/fa";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill, RiEditFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";

const CompanyCheckInComponent: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)
  const [employesAvailable, setEmployesAvailable] = useState<Map<number, IEmploye>>(new Map())
  const [employesInCompany, setEmployesInCompany] = useState<Map<number, IEmployeCheckIn>>()

  const init = async () => {
    try {
      setStatusScreen(ScreenStatus.loading)
      if (id) {
        const responseE = await EmployeesService.getEmployesAvaliable()
        const responseInCompany = await EmployeesService.getEmployesInCompany(id ?? '0')
        setEmployesAvailable(responseE)
        setEmployesInCompany(responseInCompany)
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
  const columnsTable = useMemo(
    () => [
      {
        accessorKey: 'names',
        header: 'Nombre',
        size: 50
      },
      {
        accessorKey: 'username',
        header: 'Usuario app',
        size: 50,
      },
    ], []
  )
  const columnsTableInCompany = useMemo(
    () => [
      {
        accessorKey: 'employe.names',
        header: 'Nombre',
        size: 50
      },
      {
        accessorKey: 'employe.username',
        header: 'Usuario app',
        size: 50,
      },
    ], []
  )
  const table = useMaterialReactTable({
    columns: columnsTable,
    data: Array.from(employesAvailable?.values() || []) as IEmploye[],
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
          <RiEditFill className=" text-xl cursor-pointer hover:text-hoverPrimary mr-5" onClick={() => navigate(`${routesNames.employeesDetailPageName}${row.original.id}`)} />
          <RiArrowRightCircleFill className="text-2xl  cursor-pointer text-primary" onClick={() => addEmploye(row.original.id)} />
        </div>
      )
    },
    // renderToolbarInternalActions: () => (
    //   <div className='w-full flex flex-row gap-1'>
    //     {/* <ButtonSmall type="button" onClick={() => navigate(routesNames.employeesCreatePage)} status={StatusButton.Enabled} >Crear nuevo empleado</ButtonSmall> */}
    //   </div>
    // ),
    enableColumnActions: true,
    enableColumnFilters: true,
    enableStickyFooter: true,
    enableDensityToggle: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: true,
    groupedColumnMode: false,
  })

  const tableEmployesCompany = useMaterialReactTable({
    columns: columnsTableInCompany,
    data: Array.from(employesInCompany?.values() || []) as IEmployeCheckIn[],
    enableRowActions: true,
    positionActionsColumn: 'first',
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
          <RiArrowLeftCircleFill className="text-2xl cursor-pointer text-primary" onClick={() => deleteEmploye(row.original.id)} />
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
  },)
  const addEmploye = async (idEmploye: number) => {
    try {
      const temp = new Map(employesAvailable)
      const itemEmployee: IEmploye | undefined = temp.get(idEmploye)
      const tempEmployesCompanie = new Map(employesInCompany)
      const idCheckin = tempEmployesCompanie?.size ?? 1 + 1;
      const item: IEmployeCheckIn = { id: idCheckin, id_company: parseInt(id ?? '0'), employe: itemEmployee }
      tempEmployesCompanie?.set(idCheckin, item)
      temp.delete(idEmploye)
      setEmployesAvailable(temp)
      setEmployesInCompany(tempEmployesCompanie)
      await EmployeesService.addEmployeInCompanieCheckin(itemEmployee?.id ?? 0, id ?? '0')

    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setStatusScreen(ScreenStatus.success)
    }
  }

  const deleteEmploye = async (idCheckin: number) => {
    try {
      const temp = new Map(employesAvailable)

      const tempEmployesCompanie = new Map(employesInCompany)
      const itemEmployeeCheck: IEmployeCheckIn | undefined = tempEmployesCompanie.get(idCheckin)

      const item: IEmploye | undefined = itemEmployeeCheck?.employe;
      if (item) {
        temp?.set(item.id, item)
      }
      tempEmployesCompanie.delete(idCheckin)
      setEmployesAvailable(temp)
      setEmployesInCompany(tempEmployesCompanie)
      await EmployeesService.deleteEmployeInCompanieCheckin(idCheckin)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setStatusScreen(ScreenStatus.success)
    }
  }
  const onDownloadQR = () => {
    window.location.href = `${baseApi}companies/qr/${id}`
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
      statusScreen === ScreenStatus.success && <div className="w-full py-5 h-full bg-background rounded-lg p-2">
        <div className="full flex justify-end">
          <div className="w-38">
            <a onClick={onDownloadQR} target='_blank' rel="noreferrer">
              <ButtonLarge type="submit"><span className="flex justify-between">Descargar QR <FaDownload className="text-onPrimary ml-1" /></span> </ButtonLarge>
            </a>
          </div>
        </div>
        <div className="w-full  h-full grid grid-cols-1 md:grid-cols-2 gap-4  m-2 rounded-lg p-2">
          <div className="">
            <span className="font-bold">Empleados sin asignar</span>
            <MaterialReactTable table={table} />
          </div>
          <div className="">
            <span className="font-bold">Empleados asignados a esta empresa</span>
            <MaterialReactTable table={tableEmployesCompany} />
          </div>
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <span className="text-start  w-full font-bold text-xl mt-5"></span>
            <div className="full flex justify-end">
              <div className="w-36">
                <ButtonLarge type="submit">Guardar</ButtonLarge>
              </div>
            </div>
          </form> */}
        </div>

      </div>
    }
  </>)
}

export default CompanyCheckInComponent