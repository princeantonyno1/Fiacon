import React, { useEffect, useState } from "react";
import "./Assign.css";

import { Card, CardHeader, CardTitle, CardContent, CardFooter, } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NonBinary } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";


const AssignSite = () => {
    const [persons, setPersons] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [sites, setSites] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedSites, setSelectedSites] = useState([]);

    const [assignDialogOpen, setAssignDialogOpen] = React.useState(false);
    const [selectedPersonForAssign, setSelectedPersonForAssign] = React.useState(null);
    const [selectedSitesForAssign, setSelectedSitesForAssign] = React.useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [personsRes, contactsRes] = await Promise.all([
                fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/person/"),
                fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/contacts/")
            ]);

            const personsData = await personsRes.json();
            const contactsData = await contactsRes.json();

            setPersons(personsData.items);
            setContacts(contactsData.items);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchSites = async () => {
        try {
            const res = await fetch(
                "https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/sites/"
            );
            const data = await res.json();
            setSites(data.items);
        } catch (error) {
            console.error("Error fetching sites:", error);
        }
    };


    const getPersonContacts = (personId) => {
        return contacts.filter(
            (contact) => contact.person_id.trim() === personId.trim()
        );
    };

    const openAssignDialog = async (person) => {
        setSelectedPersonForAssign(person);
        setSelectedSitesForAssign([]);
        await fetchSites();
        setAssignDialogOpen(true);
    };



    const toggleSiteSelection = (siteId) => {
        setSelectedSitesForAssign((prev) =>
            prev.includes(siteId)
                ? prev.filter((id) => id !== siteId)
                : [...prev, siteId]
        );
    };

    const confirmAssignSites = async () => {
        if (!selectedPersonForAssign || selectedSitesForAssign.length === 0) return;

        const personContacts = getPersonContacts(selectedPersonForAssign.person_id);
        const phoneContact = personContacts.find(
            (c) => c.type.toLowerCase() === "phone" || c.type.toLowerCase() === "mobile"
        );
        const phoneNumber = phoneContact ? phoneContact.value : "";

        try {
            for (let siteId of selectedSitesForAssign) {
                const res = await fetch(
                    "https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/worker_sites/",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            phone_number: phoneNumber,
                            site_id: siteId.trim(),
                            allocated_hours: 8
                        })
                    }
                );

                if (!res.ok) {
                    throw new Error(`Failed to assign site ${siteId}`);
                }
                console.log(`Assigned site ${siteId} to ${selectedPersonForAssign.first_name}`);
            }

            setAssignDialogOpen(false);
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 3000);

        } catch (error) {
            console.error("Error assigning sites:", error);
            alert("Failed to assign one or more sites. Please try again.");
        }
    };



    const handleAssignClick = (person) => {
        setSelectedPerson(person);
        setSelectedSites([]);
        fetchSites();
    };

    const handleSiteSelection = (siteId) => {
        setSelectedSites((prev) =>
            prev.includes(siteId)
                ? prev.filter((id) => id !== siteId)
                : [...prev, siteId]
        );
    };


    const confirmAssign = async () => {
        if (!selectedPerson || selectedSites.length === 0) return;

        const personContacts = getPersonContacts(selectedPerson.person_id);
        const phoneContact = personContacts.find(
            (c) => c.type.toLowerCase() === "phone" || c.type.toLowerCase() === "mobile"
        );

        const phoneNumber = phoneContact ? phoneContact.value : "";

        for (let siteId of selectedSites) {
            try {
                await fetch(
                    "https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/worker_sites/",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            phone_number: phoneNumber,
                            site_id: siteId.trim(),
                            allocated_hours: 8
                        })
                    }
                );
                console.log(`Assigned site ${siteId} to ${selectedPerson.first_name}`);
            } catch (error) {
                console.error("Error assigning site:", error);
            }
        }

        setSelectedPerson(null); // Close the assign panel
    };

    return (
        <main className="AssignMain">


            <h1>Assign Site</h1>
            <p>Assign the site to workers</p>

            {showSuccessAlert && (
                <Alert className="my-4 border-green-500 bg-green-100 text-green-800">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertTitle className="font-semibold">Site assigned Successfully!</AlertTitle>
                    <AlertDescription>
                        The site has been assigned to the user.
                    </AlertDescription>
                </Alert>
            )}

            <div className="person-list flex flex-wrap gap-6 justify-center">
                {persons.map((person) => {
                    const personContacts = getPersonContacts(person.person_id);

                    return (


                        <Card
                            key={person.person_id.trim()}
                            className="w-full max-w-xs bg-white shadow-md rounded-lg border border-gray-200 p-6"
                        >
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-semibold text-gray-900 text-center">
                                    {person.first_name} {person.last_name}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="text-gray-700 space-y-5 max-w-xs mx-auto text-center">
                                <div className="text-sm font-medium text-gray-600">
                                    <span>Gender: </span>
                                    <span className="text-gray-900 font-normal">{person.gender}</span>
                                </div>

                                <div className="text-sm font-medium text-gray-600">
                                    <span>Role: </span>
                                    <span className="text-gray-900 font-normal">{person.role}</span>
                                </div>

                                {personContacts.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-2">Phone:</p>
                                        <div className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm font-mono">
                                            {personContacts[0].value}
                                        </div>
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter className="mt-6 flex justify-center gap-4">
                                <Button size="sm" className="bg-black hover:bg-gray-800" onClick={() => openAssignDialog(person)}>
                                    Assign Site
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="bg-red-500 hover:bg-red-600"
                                    onClick={() => alert("Delete function coming soon!")}
                                >
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>


                    );
                })}
            </div>


            <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Assign Sites to {selectedPersonForAssign?.first_name} {selectedPersonForAssign?.last_name}</DialogTitle>
                        <DialogDescription>
                            Select one or more sites to assign.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col space-y-2 mt-4 max-h-60 overflow-y-auto">
                        {sites.map((site) => {
                            const siteId = site.site_id.trim();
                            return (
                                <label key={siteId} className="inline-flex items-center space-x-2 cursor-pointer">
                                    <Checkbox
                                        checked={selectedSitesForAssign.includes(siteId)}
                                        onCheckedChange={() => toggleSiteSelection(siteId)}
                                    />
                                    <span>{site.name}</span>
                                </label>
                            );
                        })}
                    </div>

                    <DialogFooter className="mt-6 flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>Cancel</Button>
                        <Button onClick={confirmAssignSites} disabled={selectedSitesForAssign.length === 0}>Confirm Assign</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </main>
    );
};

export default AssignSite;
