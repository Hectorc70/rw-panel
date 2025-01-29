import { lsUsername } from "@/common/constants";
import ButtonLargeSecondary from "@/components/ButtonLargeSeconday";
import { StatusButton } from "@/models/enums";
import { routesNames } from "@/router/routes";
import { FaUser, FaBars } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router";

// Definimos los tipos de las props del Header
interface HeaderProps {
    toggleSidebar: () => void; // Función para abrir/cerrar el Sidebar
}


const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const navigate = useNavigate()
    const username = localStorage.getItem(lsUsername) ?? ''
    const signOut = () => {
        navigate(routesNames.loginPage, { replace: true })
        localStorage.clear()
    }
    return (
        <header className="flex justify-between items-center px-6 py-4 bg-light-background text-onPrimary bg-background ">
            <button
                className="sm:hidden p-2 text-colorText "
                onClick={toggleSidebar}
            >
                <FaBars className="text-xl" />
            </button>
            <IoChevronBackOutline className="text-xl cursor-pointer" onClick={() => navigate(-1)} />
            <div className=" flex flex-row items-center">
                <div className="flex flex-row items-center">
                    <FaUser />
                    <span className="font-bold text-onPrimary px-3">{username}</span>
                </div>
                <div className="ml-10">
                    <ButtonLargeSecondary
                        className="flex flex-row justify-center space-x-1 items-center"
                        type="button" onClick={signOut}
                        status={StatusButton.Enabled}>
                        <PiSignOutBold className="text-primary" />
                        Cerrar sesión
                    </ButtonLargeSecondary>

                </div>
            </div>

        </header>
    );
};

export default Header;

