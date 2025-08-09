
import "./User.css";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "@/components/ui/dialog"; import { Input } from "@/components/ui/input"; import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const User = () => {


  const [persons, setPersons] = useState([]);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showRegistrationSuccessAlert, setShowRegistrationSuccessAlert] = useState(false);

  const [newPerson, setNewPerson] = useState({
    person_id: "",
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    organisation_id: "ORG-0001-0001-0001-0001-000000000001",
    device_id: "",
    face_image: "",
  });

  const [newRegistration, setNewRegistration] = useState({
    id: "",
    mobile_number: "",
    department: "",
    role: "",
    group_name: "",
    status: "active", // default value
    organisation_id: "ORG-0001-0001-0001-0001-000000000001",
    created_at: "",
    updated_at: ""
  });


  const [newContact, setNewContact] = useState({
    contact_id: "",
    person_id: "",
    type: "phone",
    value: "",
  });



  const [showPersonDialog, setShowPersonDialog] = useState(false);
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const res = await fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/person/");
      const data = await res.json();
      setPersons(data.items);
    } catch (error) {
      console.error("Error fetching persons:", error);
    }
  };

  const openAddPersonDialog = async () => {
    try {
      const res = await fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/person/");
      const data = await res.json();

      const personIds = data.items.map(item => item.person_id.trim());
      const numericIds = personIds.map(id => {
        const match = id.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      });

      const maxId = Math.max(...numericIds);
      const nextId = maxId + 1;

      const prefix = "PER-";
      const nextPersonId = prefix + nextId.toString().padStart(4, '0');

      setNewPerson((prev) => ({
        ...prev,
        person_id: nextPersonId
      }));

      setShowPersonDialog(true);
    } catch (error) {
      console.error("Error fetching latest person ID:", error);
    }
  };

  //Registration Approval Logic
  const openAddRegistrationDialog = async () => {
    try {
      const res = await fetch(
        "https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/approved_registrations/"
      );
      const data = await res.json();

      const ids = data.items.map((item) => item.id.trim());
      const numericIds = ids.map((id) => {
        const match = id.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      });

      const maxId = Math.max(...numericIds);
      const nextId = maxId + 1;

      const prefix = "REG-";
      const nextRegistrationId = prefix + nextId.toString().padStart(4, "0");

      setNewRegistration((prev) => ({
        ...prev,
        id: nextRegistrationId
      }));

      setShowRegistrationDialog(true);
    } catch (error) {
      console.error("Error generating registration ID:", error);
    }
  };

  const openAddContactDialog = async () => {
    try {
      const res = await fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/contacts/");
      const data = await res.json();

      const contactIds = data.items.map(item => item.contact_id.trim());
      const numericIds = contactIds.map(id => {
        const match = id.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      });

      const maxId = Math.max(...numericIds);
      const nextId = maxId + 1;

      const prefix = "CON-";
      const nextContactId = prefix + nextId.toString().padStart(4, '0');

      setNewContact({
        contact_id: nextContactId,
        person_id: newPerson.person_id, // reuse person_id from phase 1
        type: "phone",
        value: "",
      });

      setShowContactDialog(true);
    } catch (error) {
      console.error("Error generating contact ID:", error);
    }
  };


  const handlePersonInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistrationInputChange = (e) => {
    const { name, value } = e.target;
    setNewRegistration((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




  const handleCreatePerson = async () => {
    if (!newPerson.first_name || !newPerson.last_name || !newPerson.gender) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      person_id: newPerson.person_id,
      first_name: newPerson.first_name,
      last_name: newPerson.last_name,
      gender: newPerson.gender,
      organisation_id: newPerson.organisation_id,
      department: "cleaning",
      role: "worker",
      group_name: "faicon_cleaners",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      has_answered_all_questions: 1,
      device_id: newPerson.device_id,
      face_image: newPerson.face_image
    };

    // Only add DOB if filled
    if (newPerson.dob.trim() !== "") {
      payload.dob = `${newPerson.dob}T00:00:00`;
    }

    try {
      const res = await fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/person/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // alert("Person created successfully!");
        openAddContactDialog();
        setShowPersonDialog(false);
        fetchPersons();
      } else {
        const errorData = await res.json();
        console.error("Error creating person:", errorData);
        alert("Failed to create person. Check console for details.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };




  // Handle New Registration Approval
  const handleCreateRegistration = async () => {
    if (
      !newRegistration.id ||
      !newRegistration.mobile_number ||
      !newRegistration.department ||
      !newRegistration.role ||
      !newRegistration.group_name
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      id: newRegistration.id,
      mobile_number: newRegistration.mobile_number,
      department: newRegistration.department,
      role: newRegistration.role,
      group_name: newRegistration.group_name,
      status: newRegistration.status,
      organisation_id: newRegistration.organisation_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    try {
      const res = await fetch(
        "https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/approved_registrations/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (res.ok) {
        // alert("Registration created successfully!");
        setShowRegistrationDialog(false);



        // setShowSuccessAlert(true);
        // setTimeout(() => setShowSuccessAlert(false), 3000);


        setShowRegistrationSuccessAlert(true);
        setTimeout(() => setShowRegistrationSuccessAlert(false), 3000);

      } else {
        const errorData = await res.json();
        console.error("Error creating registration:", errorData);
        alert("Failed to create registration. Check console for details.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleCreateContact = async () => {
    if (!newContact.value || !newContact.type) {
      alert("Please enter valid contact details.");
      return;
    }

    try {
      const res = await fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/contacts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });

      if (res.ok) {
        // alert("Contact added successfully!");
        setShowContactDialog(false);


        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);

      } else {
        const errorData = await res.json();
        console.error("Error creating contact:", errorData);
        alert("Failed to add contact. Check console.");
      }
    } catch (error) {
      console.error("Network error while creating contact:", error);
    }
  };





  return (
    <div className="workerPage">


      <h1>Users</h1>
      {/* <p>Add or remove team members</p> */}
      <p>Add team members</p>

      {showSuccessAlert && (
        <Alert className="my-4 border-green-500 bg-green-100 text-green-800">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-semibold">User Created Successfully!</AlertTitle>
          <AlertDescription>
            The new user has been added. You can now assign site to them.
          </AlertDescription>
        </Alert>
      )}

      {showRegistrationSuccessAlert && (
        <Alert className="my-4 border-green-500 bg-green-100 text-green-800">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-semibold">Registration Approval created Successfully!</AlertTitle>
          <AlertDescription>
            The new registration approval has been added, enabling admin-controlled user access.          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {persons.map((person) => (
          <Card
            key={person.person_id.trim()}
            className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-xl"
          >
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                {person.first_name} {person.last_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-[15px] text-gray-700 space-y-2">
              <p><strong>Gender:</strong> {person.gender}</p>
              <p><strong>Role:</strong> {person.role}</p>


              {/* <Button
                size="sm"
                variant="destructive"
                className="bg-red-500 hover:bg-red-600"
                onClick={() => null}
              >
                Delete
              </Button> */}
            </CardContent>
          </Card>
        ))}
      </div>

      <button onClick={openAddPersonDialog} className="add-btn">Add Person</button>
      <button onClick={openAddRegistrationDialog} className="add-btn">Add Approved Registration</button>


      <Dialog open={showPersonDialog} onOpenChange={setShowPersonDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Person</DialogTitle>
            <DialogDescription>
              Fill in the person's details and click "Create".
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* <p><strong>Person ID:</strong> {newPerson.person_id}</p> */}

            <Input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={newPerson.first_name}
              onChange={handlePersonInputChange}
            />

            <Input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={newPerson.last_name}
              onChange={handlePersonInputChange}
            />

            <select
              name="gender"
              value={newPerson.gender}
              onChange={handlePersonInputChange}
              className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={handleCreatePerson}>Create Person</Button>
            <Button variant="outline" onClick={() => setShowPersonDialog(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>



      <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Registration</DialogTitle>
            <DialogDescription>
              Fill in the registration details below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              type="text"
              name="mobile_number"
              placeholder="Mobile Number"
              value={newRegistration.mobile_number}
              onChange={handleRegistrationInputChange}
            />

            <Input
              type="text"
              name="department"
              placeholder="Department"
              value={newRegistration.department}
              onChange={handleRegistrationInputChange}
            />

            <Input
              type="text"
              name="role"
              placeholder="Role"
              value={newRegistration.role}
              onChange={handleRegistrationInputChange}
            />

            <Input
              type="text"
              name="group_name"
              placeholder="Group Name"
              value={newRegistration.group_name}
              onChange={handleRegistrationInputChange}
            />

            <select
              name="status"
              value={newRegistration.status}
              onChange={handleRegistrationInputChange}
              className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={handleCreateRegistration}>Create Registration</Button>
            <Button variant="outline" onClick={() => setShowRegistrationDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>



      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Contact</DialogTitle>
            <DialogDescription>
              Provide the contact information for the selected person.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* <p><strong>Contact ID:</strong> {newContact.contact_id}</p>
            <p><strong>For Person ID:</strong> {newContact.person_id}</p> */}

            <select
              name="type"
              value={newContact.type}
              onChange={handleContactInputChange}
              className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="phone">Phone</option>
              <option value="email">Email</option>
            </select>

            <Input
              type="text"
              name="value"
              placeholder="Enter email or phone"
              value={newContact.value}
              onChange={handleContactInputChange}
            />
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={handleCreateContact}>Create Contact</Button>
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>




    </div>
  );
};

export default User;

