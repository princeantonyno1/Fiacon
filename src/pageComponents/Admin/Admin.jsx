import React from 'react'
import "./Admin.css";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import SiteImage from "../../assets/icons/site.png";
import UserImage from "../../assets/icons/user.png";
import AssignImage from "../../assets/icons/assign.png";

import { Button } from "@/components/ui/button"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"


function AdminHome() {

    const navigate = useNavigate();

    const handleSitesClick = () => {
        navigate("/admin/sites");
    };

    const handleUsersClick = () => {
        navigate("/admin/users");
    };

    const handleAssignSiteClick = () => {
        navigate("/admin/assign");
    };


    const handlePrivacyClick = () => {
        navigate("/privacy");
    };

    const handleTermsClick = () => {
        navigate("/terms");
    };


    return (
        <main >

            <img className="logoImage" src={Logo} />

            <h1>Admin Dashboard</h1>

            <p>Manage sites and users from the central admin panel. Choose an option below to get started.</p>

            <div className="flex flex-wrap gap-4 max-h-[80vh] overflow-y-auto">
                <Card onClick={handleSitesClick} className="w-[250px] overflow-hidden cursor-pointer">
                    <img
                        src={SiteImage}
                        alt="Site Image"
                        className="h-32 w-full object-contain p-2"
                    />
                    <CardHeader>
                        <CardTitle>Manage Sites</CardTitle>
                        <CardDescription>
                            Add, edit or remove cleaning sites
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card onClick={handleUsersClick} className="w-[250px] overflow-hidden cursor-pointer">
                    <img
                        src={UserImage}
                        alt="User Image"
                        className="h-32 w-full object-contain p-2"
                    />
                    <CardHeader>
                        <CardTitle>Manage Users</CardTitle>
                        <CardDescription>
                            Add or remove team members
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card onClick={handleAssignSiteClick} className="w-[250px] overflow-hidden cursor-pointer">
                    <img
                        src={AssignImage}
                        alt="Assign Image"
                        className="h-32 w-full object-contain p-2"
                    />
                    <CardHeader>
                        <CardTitle>Assign Sites</CardTitle>
                        <CardDescription>
                            Assign the site to workers
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <br /><br />

            <footer className="text-center py-4 text-sm text-gray-600">
                <p>
                    <span
                        onClick={handleTermsClick}
                        className="underline cursor-pointer hover:text-black mr-4"
                    >
                        Terms & Conditions
                    </span>
                    <span
                        onClick={handlePrivacyClick}
                        className="underline cursor-pointer hover:text-black"
                    >
                        Privacy Policy
                    </span>
                </p>
            </footer>



        </main>
    )
}

export default AdminHome;