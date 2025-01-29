/* eslint-disable @typescript-eslint/no-explicit-any */

import { Toaster } from "react-hot-toast";
import { ITab } from "@/models/tab.model";
import TabsComponent from "@/components/Tabs";
import EmployeDataComponent from "./components/EmployeData";
const EmployeeDetailPage: React.FC = () => {

  const tabs: ITab[] = [
    { id: 0, label: 'Datos', isSelect: true, content: <EmployeDataComponent /> },
  ]
  return (<>

    <div className="h-full w-full flex flex-col items-center">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <TabsComponent tabs={tabs} />
    </div >
  </>)
}


export default EmployeeDetailPage