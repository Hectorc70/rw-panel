import { NavLink } from "react-router-dom";
import { routesNames } from "@/router/routes";
import logo from '@/assets/logo.png'
import { FaHome, FaPeopleCarry } from "react-icons/fa";
import { FaBuildingCircleCheck } from "react-icons/fa6";

// Definimos los tipos de las props
interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    // const rol = localStorage.getItem(lsRol) ?? ''
    return (
        <aside
            className={`fixed sm:static top-0 left-0 ${isOpen ? "w-52" : "w-16"
                } h-screen text-onPrimary bg-background  flex  border- flex-col transform transition-all duration-300 z-50 sm:w-40`}
        >
            {/* Logo */}
            <div className={`p-6 justify-center flex`}>
                <img src={logo} alt="Nova Realchain" className="w-20" />
            </div>

            {/* Menu Items */}
            <nav className="flex-1 space-y-4 mt-10  px-2">
                <NavLink
                    to={routesNames.companiesPage}
                    className={({ isActive }) =>
                        `flex items-center rounded-lg gap-4 p-2 py-3 text-sm  text-primary bg-hintColor hover:bg-primary hover:text-onPrimary ${isActive ? "text-white bg-primary " : "text-onPrimary"
                        }`
                    }
                >
                    <FaHome className="text-lg" />
                    <span className={`${!isOpen && "hidden"} sm:block`}>Empresas</span>
                </NavLink>
                <NavLink
                    to={routesNames.employeesPage}
                    className={({ isActive }) =>
                        `flex items-center rounded-lg gap-4 p-2 py-3 text-sm  text-primary bg-hintColor hover:bg-primary hover:text-onPrimary ${isActive ? "text-white bg-primary " : "text-onPrimary"
                        }`
                    }
                >
                    <FaPeopleCarry className="text-lg" />
                    <span className={`${!isOpen && "hidden"} sm:block`}>Empleados</span>
                </NavLink>
                <NavLink
                    to={routesNames.checkInHistorialPage}
                    className={({ isActive }) =>
                        `flex items-center rounded-lg gap-4 p-2 py-3 text-sm  text-primary bg-hintColor hover:bg-primary hover:text-onPrimary ${isActive ? "text-white bg-primary " : "text-onPrimary"
                        }`
                    }
                >
                    <FaBuildingCircleCheck className="text-lg" />
                    <span className={`${!isOpen && "hidden"} sm:block`}>Historial Check-In</span>
                </NavLink>
            </nav>

            {/* Botón para cerrar el Sidebar */}
            {isOpen && (
                <button
                    className="absolute top-4 right-4 text-colorText"
                    onClick={toggleSidebar}
                >
                    ✖
                </button>
            )}
        </aside>
    );
};

export default Sidebar;
