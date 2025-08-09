import React from 'react'
import "./Header.css";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo_white.png";

import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, } from "@/components/ui/navigation-menu"

function Header() {

    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate("/");
    };

    const handleSiteClick = () => {
        navigate("/admin/sites");
    };

    const handleUsersClick = () => {
        navigate("/admin/users");
    };

    const handleAssignSiteClick = () => {
        navigate("/admin/assign");
    };
    return (
        <header >

            <img onClick={handleAdminClick} className="cursor-pointer" src={Logo} />

            <NavigationMenu>
                <NavigationMenuList className="flex space-x-4">
                    <Button onClick={handleSiteClick} variant="outline" className="bg-white text-black menuButton">
                        Sites
                    </Button>
                    <Button onClick={handleUsersClick} variant="outline" className="bg-white text-black menuButton">
                        Users
                    </Button>
                    <Button onClick={handleAssignSiteClick} variant="outline" className="bg-white text-black menuButton">
                        Assign Sites
                    </Button>
                </NavigationMenuList>

            </NavigationMenu>

        </header>
    )
}

export default Header;