import { useEffect, useState } from "react";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import NavbarItem from "./Navbaritem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import clsx from "clsx"; // Instalar clsx para una mejor gestión de clases
import Image from "next/image";

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackground(window.scrollY >= TOP_OFFSET);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="w-full fixed z-40">
            <div
                className={clsx(
                    "px-4 md:px-16 py-6 flex flex-row items-center transition duration-500",
                    { "bg-zinc-900 bg-opacity-90": showBackground }
                )}
            >
                    <Image
                      className="h-4 lg:h-7"
                      src="/images/logo.png"
                      alt="Logo de la aplicación"
                      width={100}  // Ajusta el tamaño según lo necesites
                      height={30}  // Ajusta el tamaño según lo necesites
                    />

                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by languages" />
                </div>

                <div 
                    onClick={() => setShowMobileMenu(prev => !prev)} 
                    className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
                >
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>

                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition" aria-label="Search">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition" aria-label="Notifications">
                        <BsBell />
                    </div>

                    <div 
                        onClick={() => setShowAccountMenu(prev => !prev)} 
                        className="flex flex-row items-center gap-2 cursor-pointer relative"
                    >
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                        <Image
                         src="/images/default-blue.png"
                         alt="Profile"
                         />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
