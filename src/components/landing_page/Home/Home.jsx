import React from "react";
import styles from "./Home.module.css";
import appleIcon from "../../../assets/apple.png";
import androidIcon from "../../../assets/android.png";
import regIcon from "../../../assets/registration.png";
import signInIcon from "../../../assets/signin.png";
import signOutIcon from "../../../assets/signout.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    navigate("/user/register");
  };
  const handleSignInClick = () => {
    navigate("/user/signin");
  };
  const handleSignOutClick = () => {
    navigate("/user/signout");
  };
  return (
    <main style={{ maxWidth: '100%', overflowX: 'hidden', padding: '16px' }} className={styles.container}>
      <section className={styles.purpose}>
        <h1 className={styles.heading}>Purpose of the App</h1>
        <p className={styles.desc}>
          Welcome to Contractor sync, your digital assistant for streamlined cleaning management.
          To get started, we’ve made the onboarding process smooth, secure, and compliant. Each step ensures accurate user verification, safety, and readiness for field operations.
        </p>
      </section>

      <section className={styles.platforms}>
        {/* IOS */}
        <div className={styles.platformCardBox}>
          <p className={styles.platformTitleH}>For iOS</p>
          <div className={styles.platformCard}>
            <img src={appleIcon} alt="iOS" className={styles.platformIcon} />
            <div className={styles.flexbox}>
              <div className={styles.platformTitle}>Contractor sync</div>
              <div className={styles.cmsTitle}>Sign In and Sign Up</div>
            </div>
            <button className={styles.installButton}>Install</button>
          </div>
        </div>

        {/* Android */}
        <div className={styles.platformCardBox}>
          <p className={styles.platformTitleH}>For Android</p>
          <div className={styles.platformCard}>
            <img src={androidIcon} alt="Android" className={styles.platformIcon} />
            <div>
              <div className={styles.platformTitle}>Contractor sync</div>
              <div className={styles.cmsTitle}>Sign In and Sign Up</div>
            </div>
            <button className={styles.installButton}>Install</button>
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <p className={styles.platformTitleH}>How it Works</p> <br />
        <div className={styles.steps}>
          
          {/* Registration (Click navigates to /three/register) */}
          <div
            className={styles.platformCard}
            onClick={handleRegistrationClick}
            style={{ cursor: "pointer" }}
          >
            <img src={regIcon} alt="Registration Icon" className={styles.platformIcon} />
            <div className={styles.flexbox}>
              <div className={styles.platformTitle}>Registration</div>
              <div className={styles.cmsTitle}>Lorem Ipsum is simply dummy text</div>
            </div>
          </div>

          {/* Sign In */}
          <div className={styles.platformCard}
          onClick={handleSignInClick}
            style={{ cursor: "pointer" }}>
            <img src={signInIcon} alt="Sign In Icon" className={styles.platformIcon} />
            <div className={styles.flexbox}>
              <div className={styles.platformTitle}>Sign In</div>
              <div className={styles.cmsTitle}>Lorem Ipsum is simply dummy text</div>
            </div>
          </div>

          {/* Sign Out */}
          <div className={styles.platformCard}
          onClick={handleSignOutClick}
            style={{ cursor: "pointer" }}>
            <img src={signOutIcon} alt="Sign Out Icon" className={styles.platformIcon} />
            <div className={styles.flexbox}>
              <div className={styles.platformTitle}>Sign Out</div>
              <div className={styles.cmsTitle}>Lorem Ipsum is simply dummy text</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Home;