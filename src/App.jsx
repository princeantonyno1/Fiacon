import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css'
import Header from "./pageComponents/Header/Header";
import PrivacyPolicy from "./pageComponents/PrivacyPolicy/PrivacyPolicy";
import TermsnConditions from "./pageComponents/Terms_conditions/Terms_conditions";
import AdminHome from "./pageComponents/Admin/Admin";
import SitePage from "./pageComponents/Site/Site";



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
    <SitePage/>
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
    {/* <Route path="/:tab" element={<ThreeApp />} />
    <Route path="/admin" element={<AdminHome />} />
    <Route path="/admin/sites" element={<Sites />} />
    <Route path="/admin/users" element={<Users />} />
    <Route path="/admin/assign" element={<AssignSite />} /> */}
  </Routes>
);

export default App;