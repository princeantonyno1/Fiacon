import React from 'react'
import  "./Header.css";
import { useState } from 'react'
import Logo from "../../assets/logo_white.png";

import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, } from "@/components/ui/navigation-menu"

function Header() {
    return (
        <header >

            <img src={Logo}/>

            <NavigationMenu>
                <NavigationMenuList>

                    <Button variant="outline" className="bg-white text-black menuButton">Sites</Button>
                    <Button variant="outline" className="bg-white text-black menuButton">Users</Button>
                    <Button variant="outline" className="bg-white text-black menuButton">Assign sites</Button>

                </NavigationMenuList>
            </NavigationMenu>

        </header>
    )
}

export default Header;