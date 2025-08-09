import "./Site.css";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const padTo36 = (str) => {
  if (!str) return "".padEnd(36, ' '); // Empty? pad with spaces
  return str.padEnd(36, ' '); // Pad to 36 chars with spaces
};


const Home = () => {




  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showSiteDialog, setShowSiteDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [newLocation, setNewLocation] = useState({
    location_id: "",
    name: "",
    type: "",
    status: "active",
  });
  const [newAddress, setNewAddress] = useState({
    address_id: "",
    location_id: "",
    street_number: "",
    street_name: "",
    suburb: "",
    postcode: "",
    state: "",
    country: "",
    coordinates: "",
    status: "active",
  });
  const [newSite, setNewSite] = useState({
    site_id: "",
    address_id: "",
    name: "",
    allocated_hours: "",
    scheduled_start_time: "",
    scheduled_end_time: "",
    scheduled_week_type: "weekly",
    provider_id: "",
    supplier_id: "",
    worker_manager_id: "",
    status: "active",
    site_image: "",
  });



  const autocompleteRef = useRef(null);

  const ORG_ID = "ORG-0001-0001-0001-0001-000000000001";

  const fetchSites = () => {
    setLoading(true);
    fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/sites/")
      .then((res) => res.json())
      .then((data) => {
        setSites(data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sites:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/sites/")
      .then((res) => res.json())
      .then((data) => {
        setSites(data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sites:", error);
        setLoading(false);
      });

    if (showAddressDialog) {
      setTimeout(() => {
        initAutocomplete();
      }, 0);
    }
  }, [showAddressDialog]);




  const openAddLocationDialog = async () => {
    try {
      const res = await fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/location/");
      const data = await res.json();

      const locationIds = data.items.map(item => item.location_id.trim());
      const numericIds = locationIds.map(id => {
        const match = id.match(/(\d+)$/); // Extract trailing numbers
        return match ? parseInt(match[1], 10) : 0;
      });

      const maxId = Math.max(...numericIds);
      const nextId = maxId + 1;

      const prefix = "LOC-";
      const nextLocationId = prefix + nextId.toString().padStart(4, '0'); // Same as address id format

      setNewLocation((prev) => ({ ...prev, location_id: nextLocationId }));
      setShowLocationDialog(true);
    } catch (error) {
      console.error("Error fetching latest location ID:", error);
    }
  };



  const handleLocationInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateLocation = async () => {
    const payload = {
      location_id: newLocation.location_id.trim(),
      organisation_id: ORG_ID,
      name: newLocation.name,
      type: newLocation.type,
      status: newLocation.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const res = await fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/location/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowLocationDialog(false);
        openAddAddressDialog(newLocation.location_id);  // Open Address Dialog next
      } else {
        alert("Failed to create location.");
      }
    } catch (error) {
      console.error("Error creating location:", error);
      alert("Error occurred while creating location.");
    }
  };

  const openAddAddressDialog = async (locationId) => {
    try {
      const res = await fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/addresses/");
      const data = await res.json();

      const addressIds = data.items.map(item => item.address_id.trim());
      const numericIds = addressIds.map(id => {
        const match = id.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      });

      const maxId = Math.max(...numericIds);
      const nextId = maxId + 1;

      const prefix = "ADDR-";
      const nextAddressId = prefix + nextId.toString().padStart(4, '0');

      setNewAddress({
        address_id: nextAddressId,
        location_id: locationId,
        street_number: "",
        street_name: "",
        suburb: "",
        postcode: "",
        state: "",
        country: "",
        coordinates: "",
        status: "active",
      });

      setShowAddressDialog(true);
    } catch (error) {
      console.error("Error fetching latest address ID:", error);
    }
  };

  const openAddSiteDialog = async (addressId) => {
    try {
      const res = await fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/sites/");
      const data = await res.json();

      const siteIds = data.items.map(item => item.site_id.trim());
      const numericIds = siteIds.map(id => {
        const match = id.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      });

      const maxId = Math.max(...numericIds);
      const nextId = maxId + 1;

      const prefix = "SITE-";
      const nextSiteId = prefix + nextId.toString().padStart(4, '0');

      setNewSite({
        site_id: nextSiteId,
        address_id: addressId,
        name: "",
        allocated_hours: "",
        scheduled_start_time: "",
        scheduled_end_time: "",
        scheduled_week_type: "weekly",
        provider_id: "",
        supplier_id: "",
        worker_manager_id: "",
        status: "active",
        site_image: "",
      });

      setShowSiteDialog(true);
    } catch (error) {
      console.error("Error fetching latest site ID:", error);
    }
  };



  const initAutocomplete = () => {
    if (!window.google) {
      console.error("Google Maps API not loaded.");
      return;
    }

    // Initialize Autocomplete
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
      fields: ["address_components", "geometry"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        alert("No geometry data found.");
        return;
      }

      const components = place.address_components;
      const findComponent = (types) =>
        components.find((component) => types.some((t) => component.types.includes(t)))?.long_name || "";

      setNewAddress((prev) => ({
        ...prev,
        street_number: findComponent(["street_number"]),
        street_name: findComponent(["route"]),
        suburb: findComponent(["locality", "sublocality"]),
        postcode: findComponent(["postal_code"]),
        state: findComponent(["administrative_area_level_1"]),
        country: findComponent(["country"]),
        coordinates: `${place.geometry.location.lat()},${place.geometry.location.lng()}`,
      }));

      // Move marker to autocomplete location
      if (marker) {
        map.setCenter(place.geometry.location);
        marker.setPosition(place.geometry.location);
      }
    });

    // Initialize Google Map Picker
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 13.0827, lng: 80.2707 }, // Default to Chennai, India
      zoom: 14,
    });

    const marker = new window.google.maps.Marker({
      map,
      draggable: true,
      position: map.getCenter(),
    });

    // On Map Click
    map.addListener("click", (e) => {
      marker.setPosition(e.latLng);
      updateCoordinates(e.latLng);
    });

    // On Marker Drag
    marker.addListener("dragend", (e) => {
      updateCoordinates(e.latLng);
    });

    const updateCoordinates = (latLng) => {
      const lat = latLng.lat();
      const lng = latLng.lng();
      setNewAddress((prev) => ({
        ...prev,
        coordinates: `${lat},${lng}`,
      }));
    };
  };


  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSiteInputChange = (e) => {
    const { name, value } = e.target;
    setNewSite((prev) => ({ ...prev, [name]: value }));
  };


  const handleCreateAddress = async () => {
    const payload = {
      ...newAddress,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const res = await fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/addresses/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowAddressDialog(false);
        openAddSiteDialog(newAddress.address_id);
      } else {
        alert("Failed to create address.");
      }
    } catch (error) {
      console.error("Error creating address:", error);
      alert("Error occurred while creating address.");
    }


    const mapDiv = document.getElementById("map");
    if (!mapDiv) {
      console.error("Map container not found.");
      return;
    }

  };

  const handleCreateSite = async () => {
    if (!newSite.name || !newSite.address_id) {
      alert("Site Name and Address ID are required.");
      return;
    }

    const payload = {
      site_id: newSite.site_id.trim(),
      address_id: newSite.address_id.trim(),
      name: newSite.name,
      organisation_id: ORG_ID,
      allocated_hours: parseFloat(newSite.allocated_hours || 0).toFixed(2),
      scheduled_start_time: newSite.scheduled_start_time ? new Date(newSite.scheduled_start_time).toISOString() : null,
      scheduled_week_type: newSite.scheduled_week_type.toLowerCase(),
      scheduled_end_time: newSite.scheduled_end_time ? new Date(newSite.scheduled_end_time).toISOString() : null,
      provider_id: newSite.provider_id || null,
      supplier_id: newSite.supplier_id || null,
      worker_manager_id: newSite.worker_manager_id || null,
      status: newSite.status.toLowerCase(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      site_image: newSite.site_image || null,
    };


    try {
      const res = await fetch("https://gbd8bbac778f7c3-fiacon4dev.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/sites/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {

        setShowSiteDialog(false);
        fetchSites();  // Refresh the sites list

        // alert("Site Created Successfully!");
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
      } else {
        console.error("Site creation failed:", result);
        alert(`Failed to create site. Error: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating site:", error);
      alert("Error occurred while creating site.");
    }
  };




  // if (loading) return <p style={{ color: "black", background: "white", textAlign: "center" }}>Loading sites...</p>;
  if (loading) return <Progress value={85} />;

  return (
    <div className="adminPage">
      <h1>Sites</h1>
      <p>Add, edit or remove cleaning sites</p>

      {showSuccessAlert && (
        <Alert className="my-4 border-green-500 bg-green-100 text-green-800">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-semibold">Site Created Successfully!</AlertTitle>
          <AlertDescription>
            The new site has been added. You can now assign users or edit the details.
          </AlertDescription>
        </Alert>
      )}

      <div className="site-list">
        {sites.map((site) => (
          <div key={site.site_id.trim()} className="site-card">
            <img src={site.site_image} alt={site.name} className="site-image" />
            <h2>{site.name}</h2>
            <p><strong>Address ID:</strong> {site.address_id.trim()}</p>
            <p><strong>Status:</strong> {site.status}</p>
            <p><strong>Allocated Hours:</strong> {site.allocated_hours}</p>
            <p><strong>Start:</strong> {new Date(site.scheduled_start_time).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(site.scheduled_end_time).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <button onClick={openAddLocationDialog}>Add Site</button>

      {/* Location Dialog */}

      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Location</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* <p><strong>Location ID:</strong> {newLocation.location_id}</p> */}

            <input
              type="text"
              name="name"
              placeholder="Location Name"
              value={newLocation.name}
              onChange={handleLocationInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            <input
              type="text"
              name="type"
              placeholder="Type"
              value={newLocation.type}
              onChange={handleLocationInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <DialogFooter className="mt-4">
            <button
              onClick={() => setShowLocationDialog(false)}
              className="ml-2 px-4 py-2 text-sm border rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateLocation}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Next (Add Address)
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Address Dialog */}
      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Address</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            {/* <p><strong>Address ID:</strong> {newAddress.address_id}</p>
            <p><strong>Location ID:</strong> {newAddress.location_id}</p> */}

            <input
              type="text"
              ref={autocompleteRef}
              placeholder="Search Address (Autocomplete)"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            <div
              id="map"
              style={{
                width: "100%",
                height: "300px",
                marginTop: "10px",
                borderRadius: "0.375rem", // rounded-md
                overflow: "hidden",
              }}
            ></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="street_number"
                placeholder="Street Number"
                value={newAddress.street_number}
                onChange={handleAddressInputChange}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                name="street_name"
                placeholder="Street Name"
                value={newAddress.street_name}
                onChange={handleAddressInputChange}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                name="suburb"
                placeholder="Suburb"
                value={newAddress.suburb}
                onChange={handleAddressInputChange}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                name="postcode"
                placeholder="Postcode"
                value={newAddress.postcode}
                onChange={handleAddressInputChange}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={newAddress.state}
                onChange={handleAddressInputChange}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={newAddress.country}
                onChange={handleAddressInputChange}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
              />
            </div>

            <p><strong>Coordinates:</strong> {newAddress.coordinates}</p>
          </div>

          <DialogFooter className="mt-4">
            <button
              onClick={() => setShowAddressDialog(false)}
              className="ml-2 px-4 py-2 text-sm border rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateAddress}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Create Address
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Site Dialog */}
      <Dialog open={showSiteDialog} onOpenChange={setShowSiteDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Site</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            {/* <p><strong>Site ID:</strong> {newSite.site_id}</p>
            <p><strong>Address ID:</strong> {newSite.address_id}</p> */}

            <input
              type="text"
              name="name"
              placeholder="Site Name"
              value={newSite.name}
              onChange={handleSiteInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            <input
              type="number"
              name="allocated_hours"
              placeholder="Allocated Hours"
              value={newSite.allocated_hours}
              onChange={handleSiteInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Scheduled Start Time:</label>
                <input
                  type="datetime-local"
                  name="scheduled_start_time"
                  value={newSite.scheduled_start_time}
                  onChange={handleSiteInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Scheduled End Time:</label>
                <input
                  type="datetime-local"
                  name="scheduled_end_time"
                  value={newSite.scheduled_end_time}
                  onChange={handleSiteInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Scheduled Week Type:</label>
              <select
                name="scheduled_week_type"
                value={newSite.scheduled_week_type}
                onChange={handleSiteInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1"
              >
                <option value="weekly">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <input
              type="text"
              name="provider_id"
              placeholder="Provider ID"
              value={newSite.provider_id}
              onChange={handleSiteInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            <input
              type="text"
              name="supplier_id"
              placeholder="Supplier ID"
              value={newSite.supplier_id}
              onChange={handleSiteInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            <input
              type="text"
              name="worker_manager_id"
              placeholder="Worker Manager ID"
              value={newSite.worker_manager_id}
              onChange={handleSiteInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            <input
              type="text"
              name="site_image"
              placeholder="Site Image URL"
              value={newSite.site_image}
              onChange={handleSiteInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <DialogFooter className="mt-4">
            <button
              onClick={() => setShowSiteDialog(false)}
              className="ml-2 px-4 py-2 text-sm border rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateSite}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Create Site
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>



    </div>
  );
};

export default Home;
