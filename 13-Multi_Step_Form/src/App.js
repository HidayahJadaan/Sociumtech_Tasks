import { useState } from "react";
import SideBar from "./components/SideBar/SideBar"
import ContentBox from "./components/ContentBox/ContentBox"

//===============================================
const  Allusers = [];

//===============================================

//===============================================
const Tabs = [
  {
    id: 1,
    title: "Personal Info",
    PageTitle: "Personal Info",
    description: "Please provide your name, email address, and phone number.",
  },
  {
    id: 2,
    title: "Select Plan",
    PageTitle: "Select your plan",
    description: "You have the option of monthly, yearly billing.",
  },

  {
    id: 3,
    title: "ADD-ONS",
    PageTitle: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
  },
  {
    id: 4,
    title: "Summary",
    PageTitle: "Finishing up",
    description: "Double-check everything looks OK before confirming.",
  },

  {
    id: 5,
    title: "Admin Login Page",
    PageTitle: "Admin Login Page",
    description: "Login If You're Admin.",
  },
  {
    id: 6,
    title: "Admin",
    PageTitle: "Admin Dashboard",
    description: "All The Users that filled the form",
  },
];

//===============================================

export default function App() {

  const [showAdmin, setShowAdmin] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  
  const GoToAdminPage = () => {
    handleSelectedTabID();
    if (selectdTabID === 5) {
      setShowAdmin(true);
      
    }
    
  };

  const handleAdminLogin = (email, name, password) => {
    // Define the admin's credentials
    const adminEmail = "admin@admin.com";
    const adminName = "admin";
    const adminPassword = "123456789admin";
  
    // Check if the entered credentials match the admin's credentials
    if (email === adminEmail && name === adminName && password === adminPassword) {
      // Successful login, update the state variable
      setSelectedTabID(6)
      console.log(selectdTabID)
      setAdminLoggedIn(true);
      console.log(name)
      console.log(email)
      console.log(password)
      console.log("Success Login")

    } else {
      // Display an error message if the credentials don't match
      alert("Only admins can log in to this page.");
    }
  };


  const [selectdTabID, setSelectedTabID] = useState(1);
  const [confirmationMade, setConfirmationMade] = useState(false);
  const [back, setBack] = useState(selectdTabID);

  function handleSelectedTabID() {
    if (selectdTabID > 0 && selectdTabID < 6) setSelectedTabID(selectdTabID + 1);
  }



  function handleGoBack() {
    setBack(setSelectedTabID(selectdTabID - 1));
  }

  function handleConfirmation() {
    setConfirmationMade(true);
    setSelectedTabID(5); 


    
  }

  function specialGoBack() {
    setConfirmationMade(false);
    setSelectedTabID(1);
  }

  function specialGoAdmin() {
    setConfirmationMade(true);

      setSelectedTabID(5); 
      console.log(selectdTabID)// Set the tab ID to 5 to go to the admin login page
      setShowAdmin(true); // Show the admin login page
      // setConfirmationMade(false);
      // setShowAdmin(false); // Show the admin login page

    
  }

  return (
    <div className="container">
      <div className="app">
        <SideBar
          Tabs={Tabs}
          selectdTabID={selectdTabID}
          GoNextTab={handleSelectedTabID}
        />
        <ContentBox
          Tabs={Tabs}
          selectdTabID={selectdTabID}
          back={back}
          GoBack={handleGoBack}
          GoFirst={specialGoBack}
          GoNextTab={handleSelectedTabID}
          onConfirm={handleConfirmation}
          confirmationMade={confirmationMade} 
          Allusers = {Allusers}
          specialGoAdmin={specialGoAdmin}
          showAdmin={showAdmin}
          adminLoggedIn={adminLoggedIn}
          GoToAdminPage={GoToAdminPage}
          handleAdminLogin={handleAdminLogin}
          setAdminLoggedIn={setAdminLoggedIn}
          setConfirmationMade={setConfirmationMade}
        />

      </div>
    </div>
  );
}