import { ITab } from '@/models/tab.model'
import { useState, useEffect } from 'react'

const useTabSelectedHandling = () => {
  const [newTabs, setTabs] = useState<ITab[]>([])
  const [selectTab, setSelectTab] = useState(0)

  const changedSelectTab = (index: number, tabs: ITab[]) => {
    const tabsTemp = tabs
    tabsTemp.forEach(element => {
      if (element.isSelect) {
        element.isSelect = false
      }
    })
    tabsTemp[index].isSelect = true
    setTabs(tabsTemp)
    setSelectTab(tabsTemp[index].id)
  }

  useEffect(() => {
    return () => {
      setTabs([])
    }
  }, [])

  return {
    newTabs,
    selectTab,
    changedSelectTab
  }
}

export default useTabSelectedHandling
