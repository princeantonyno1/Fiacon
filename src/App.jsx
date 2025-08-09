import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css'
import Header from "./pageComponents/Header/Header";
import PrivacyPolicy from "./pageComponents/PrivacyPolicy/PrivacyPolicy";
import TermsnConditions from "./pageComponents/Terms_conditions/Terms_conditions";
import AdminHome from "./pageComponents/Admin/Admin";
import Site from "./pageComponents/Site/Site";
import User from "./pageComponents/User/User";
import Assign from "./pageComponents/AssignSite/Assign";



function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <AdminHome />
    </div>
  );
}

const SitesPage = () => (
  <div>
    <Header/>
    <Site/>
  </div>
);
const UsersPage = () => (
  <div>
    <Header/>
    <User/>
  </div>
);
const AssignPage = () => (
  <div>
    <Header/>
    <Assign/>
  </div>
);
const PrivacyPolicyPage = () => (
  <div>
    <PrivacyPolicy/>
  </div>
);
const TermsnConditionsPage = () => (
  <div>
    <TermsnConditions/>
  </div>
);



const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/privacy" element={<PrivacyPolicyPage />} />
    <Route path="/terms" element={<TermsnConditionsPage />} />

    <Route path="/admin/sites" element={<SitesPage />} />
    <Route path="/admin/users" element={<UsersPage />} />
    <Route path="/admin/assign" element={<AssignPage />} />
  </Routes>
);

export default App;