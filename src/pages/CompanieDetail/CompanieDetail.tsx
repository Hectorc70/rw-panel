/* eslint-disable @typescript-eslint/no-explicit-any */

import { Toaster } from "react-hot-toast";
import { ITab } from "@/models/tab.model";
import CompanyComponent from "./components/CompanyComponent";
import TabsComponent from "@/components/Tabs";
import AreasComponent from "./components/AreasComponent";
import CompanyCheckInComponent from "./components/CompanyCheckInComponent";
const CompanyDetailPage: React.FC = () => {

  const tabs: ITab[] = [
    { id: 1, label: 'Empresa', isSelect: true, content: <CompanyComponent /> },
    { id: 2, label: 'Areas', isSelect: true, content: <AreasComponent /> },
    { id: 3, label: 'CheckIn', isSelect: true, content: <CompanyCheckInComponent /> },
  ]
  // const init = async () => {
  //   try {

  //   } catch (error: any) {
  //     toast.error(error.message)
  //   } finally {
  //     setStatusScreen(
  //       ScreenStatus.success
  //     )
  //   }
  // }
  // useEffect(() => {
  //   init()
  // }, [])





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


export default CompanyDetailPage