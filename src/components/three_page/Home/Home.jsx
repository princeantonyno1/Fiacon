import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

import regIcon from "../../../assets/icons/register.png";
import signInIcon from "../../../assets/icons/signin.png";
import signOutIcon from "../../../assets/icons/signout.png";
import cleanerIcon from "../../../assets/cleaner.png";

import phNo from "../../../assets/reg/phno.png";
import facial from "../../../assets/reg/facial.png";
import personal from "../../../assets/reg/personal.png";
import quest from "../../../assets/reg/question.png";
import qr from "../../../assets/signin/scanqr.png";
import signin from "../../../assets/signin/signin.png";

const TABS = [
  { id: "register", label: "Registration", icon: regIcon },
  { id: "signin", label: "Sign In", icon: signInIcon },
  { id: "signout", label: "Sign Out", icon: signOutIcon },
];

const ThreePage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("register");

  useEffect(() => {
    if (tab && TABS.some((t) => t.id === tab)) {
      setActiveTab(tab);
    } else {
      navigate("/three/register"); // default or invalid -> redirect to register
    }
  }, [tab, navigate]);

  const handleTabChange = (newTab) => {
    navigate(`/three/${newTab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "register":
        return (
          <main className={styles.main}>
          <h1 style={{ fontSize: '2.2rem' }}>Contractor Sync</h1>

          {/* Registration process */}
          <div className={styles.flexRow}>
            <div>
              <h2>Registration Process</h2>
              <p>4 step process, it will take 2 mins of time</p>
              <a href="#">https://fiacon.com/registraion</a>
            </div>
            <img src={cleanerIcon} />
          </div>

          {/* Phone number */}
          <div className={styles.flexRowSS}>
            <img src={phNo} />
            <div>
              <h2>Phone Number</h2>
              <p>Enter your Australian mobile number, which must be 9 digits long and start with ‘0’; only valid Australian formats are accepted. The system will automatically validate the number, and if it is already registered or not approved by Fiacon, an error message will be displayed.</p>
            </div>
          </div>

          {/* Personal Details */}
          <div className={styles.flexRowSS}>
            <div>
              <h2>Personal Details</h2>
              <p>Fill in your First Name, Last Name, and select your Gender from the dropdown; all fields are mandatory, and only alphabetic characters are allowed in name fields.</p>
            </div>
            <img src={personal} />
          </div>

          {/* Facial Recognition */}
          <div className={styles.flexRowSS}>
            <img src={facial} />
            <div>
              <h2>Facial Recognition</h2>
              <p>Use your device’s front-facing camera to capture a clear image of your face, which will be securely registered for future biometric sign-in and sign-out. If the captured image is unclear, too dark, or obstructed, the system will prompt you to retry.</p>
            </div>
          </div>

          {/* Questionnaires */}
          <div className={styles.flexRowSS}>
            <div>
              <h2>Questionnaires</h2>
              <p>Answer the five required questions related to cleaning safety, compliance, and readiness; you must complete all answers to proceed. These responses help validate your eligibility and preparedness for work responsibilities</p>
            </div>
            <img src={quest} />
          </div>

        </main>


        );
      case "signin":
        return (
          <main className={styles.main}>
          <h1 style={{ fontSize: '2.2rem' }}>Contractor Sync</h1>

          {/* Sign In process */}
          <div className={styles.flexRow}>
            <div>
              <h2>Sign In Process</h2>
              <p>4 step process, it will take 2 mins of time</p>
              <a href="#">https://fiacon.com/signin</a>
            </div>
            <img src={cleanerIcon} />
          </div>

          {/* Scan QR Code */}
          <div className={styles.flexRowSS}>
            <img src={qr} />
            <div>
              <h2>Scan QR Code</h2>
              <p>Enter your Australian mobile number, which must be 9 digits long and start with ‘0’; only valid Australian formats are accepted. The system will automatically validate the number, and if it is already registered or not approved by Fiacon, an error message will be displayed.</p>
            </div>
          </div>

          {/* Phone Number */}
          <div className={styles.flexRowSS}>
            <div>
              <h2>Personal Details</h2>
              <p>Enter your Australian mobile number, which must be 9 digits long and start with ‘0’; only valid Australian formats are accepted. The system will automatically validate the number, and if it is already registered or not approved by Fiacon, an error message will be displayed.</p>
            </div>
            <img src={personal} />
          </div>

          {/* Facial Recognition */}
          <div className={styles.flexRowSS}>
            <img src={facial} />
            <div>
              <h2>Facial Recognition</h2>
              <p>Use your device’s front-facing camera to capture a clear image of your face, which will be securely registered for future biometric sign-in and sign-out. If the captured image is unclear, too dark, or obstructed, the system will prompt you to retry.</p>
            </div>
          </div>

          {/* Sign In */}
          <div className={styles.flexRowSS}>
            <div>
              <h2>Sign In</h2>
              <p>Answer the five required questions related to cleaning safety, compliance, and readiness; you must complete all answers to proceed. These responses help validate your eligibility and preparedness for work responsibilities</p>
            </div>
            <img src={signin} />
          </div>

        </main>
        );
      case "signout":
        return (
          <main className={styles.main}>
          <h1 style={{ fontSize: '2.2rem' }}>Contractor Sync</h1>

          {/* Sign In process */}
          <div className={styles.flexRow}>
            <div>
              <h2>Sign Out Process</h2>
              <p>4 step process, it will take 2 mins of time</p>
              <a href="#">https://fiacon.com/signin</a>
            </div>
            <img src={cleanerIcon} />
          </div>

          {/* Scan QR Code */}
          <div className={styles.flexRowSS}>
            <img src={qr} />
            <div>
              <h2>Scan QR Code</h2>
              <p>Enter your Australian mobile number, which must be 9 digits long and start with ‘0’; only valid Australian formats are accepted. The system will automatically validate the number, and if it is already registered or not approved by Fiacon, an error message will be displayed.</p>
            </div>
          </div>

          {/* Phone Number */}
          <div className={styles.flexRowSS}>
            <div>
              <h2>Personal Details</h2>
              <p>Enter your Australian mobile number, which must be 9 digits long and start with ‘0’; only valid Australian formats are accepted. The system will automatically validate the number, and if it is already registered or not approved by Fiacon, an error message will be displayed.</p>
            </div>
            <img src={personal} />
          </div>

          {/* Facial Recognition */}
          <div className={styles.flexRowSS}>
            <img src={facial} />
            <div>
              <h2>Facial Recognition</h2>
              <p>Use your device’s front-facing camera to capture a clear image of your face, which will be securely registered for future biometric sign-in and sign-out. If the captured image is unclear, too dark, or obstructed, the system will prompt you to retry.</p>
            </div>
          </div>

          {/* Sign In */}
          <div className={styles.flexRowSS}>
            <div>
              <h2>Sign In</h2>
              <p>Answer the five required questions related to cleaning safety, compliance, and readiness; you must complete all answers to proceed. These responses help validate your eligibility and preparedness for work responsibilities</p>
            </div>
            <img src={signin} />
          </div>

        </main>
        );
      default:
        return <h1>Invalid Tab</h1>;
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.tabSwitch}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ""}`}
            onClick={() => handleTabChange(tab.id)}
          >
            <img src={tab.icon} alt={tab.label} className={styles.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      {renderContent()}
    </main>
  );
};

export default ThreePage;
