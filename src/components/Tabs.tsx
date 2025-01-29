import { ITab } from '@/models/tab.model';
import React, { useState } from 'react';

interface TabsComponentProps {
  tabs: ITab[];
}

const TabsComponent: React.FC<TabsComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      {/* Encabezados de las Tabs */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === index
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de la Tab Activa */}
      <div className="p-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default TabsComponent;
