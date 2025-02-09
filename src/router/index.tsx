import { createBrowserRouter } from "react-router-dom";
import { routesNames } from "./routes";
import LoginPage from "@/pages/Login/Login";
import RequireAuth from "@/hooks/guardAuth";
import AppLayout from "@/layout/AppLayout";
import CompaniesPage from "@/pages/Companies/Companies";
import CompanyDetailPage from "@/pages/CompanieDetail/CompanieDetail";
import EmployePage from "@/pages/Employees/Employees";
import EmployeeDetailPage from "@/pages/EmployeeDetail/EmployeeDetail";
import CheckinHistorialPage from "@/pages/CheckInHistorial/CheckInHistorial";



const router = createBrowserRouter([
  {
    path: routesNames.initPage,
    element: <LoginPage />,
    children: [
    ],
  },
  {
    path: routesNames.loginPage,
    element: <LoginPage />,
    children: [
    ],
  },
  {
    path: routesNames.initPage,
    element: <RequireAuth> <AppLayout /> </RequireAuth>,
    children: [
      // EMPRESAS
      {
        path: routesNames.companiesPage
        , element: <CompaniesPage></CompaniesPage>
      },
      {
        path: routesNames.companiesCreatePage
        , element: <CompanyDetailPage></CompanyDetailPage>
      },
      {
        path: routesNames.companiesDetailPage
        , element: <CompanyDetailPage></CompanyDetailPage>
      },
      // EMPLEADOS
      {
        path: routesNames.employeesPage
        , element: <EmployePage></EmployePage>
      },
      {
        path: routesNames.employeesCreatePage
        , element: <EmployeeDetailPage></EmployeeDetailPage>
      },
      {
        path: routesNames.employeesDetailPage
        , element: <EmployeeDetailPage></EmployeeDetailPage>
      },
      //CHECK IN
      {
        path: routesNames.checkInHistorialPage
        , element: <CheckinHistorialPage></CheckinHistorialPage>
      },
      {
        path: routesNames.checkInHistorialEmployePage
        , element: <CheckinHistorialPage></CheckinHistorialPage>
      },
      // CheckinHistorialPage
    ],
  },
]);

export default router;
