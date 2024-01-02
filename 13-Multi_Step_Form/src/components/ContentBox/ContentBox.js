import { useState, useEffect } from "react";
import PageTitle from "../PageTitle/PageTitle";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import SelectYourPlan from "../SelectPlan/SelectPlan";
import PickAddsOn from "../PickAdds/PickAdds";
import FinishingUp from "../FinishingUp/FinishingUp";
import ThankFullComponent from "../Thank/Thank";
import Admin from "../Admin/Admin";
import AdminLoginPage from "../AdminLogin/AdminLogin";
import "./ContentBox.css";
import arcade from "../../assets/images/icon-arcade.svg";
import advanced from "../../assets/images/icon-advanced.svg";
import pro from "../../assets/images/icon-pro.svg";

export default function ContentBox({
  Tabs,
  selectdTabID,
  GoBack,
  GoNextTab,
  GoFirst,
  onConfirm,
  confirmationMade,
  Allusers,
  specialGoAdmin,
  showAdmin,
  adminLoggedIn,
  GoToAdminPage,
  handleAdminLogin,
  setAdminLoggedIn,
  setConfirmationMade,
}) {
  function saveAllUsersToLocalStorage(Allusers) {
    localStorage.setItem("allusers", JSON.stringify(Allusers));
  }

  const [billings, setBillings] = useState([
    {
      Planname: "Arcade",
      icon: arcade,
      Planamount: 9,
      Plantype: "mo",
    },
    {
      Planname: "Advanced",
      icon: advanced,
      Planamount: 12,
      Plantype: "mo",
    },
    {
      Planname: "Pro",
      icon: pro,
      Planamount: 15,
      Plantype: "mo",
    },
  ]);

  // setBillings();
  // updateAdds();

  const [PickAdds, setAdds] = useState([
    {
      AddsId: 0,
      AddsTitle: "Online Service",
      AddsDescription: "Access to multiplayer games",
      AddsAmount: 1,
      AddsType: "mo",
    },
    {
      AddsId: 1,
      AddsTitle: "Large Storage",
      AddsDescription: "Extra 1TB on cloud save",
      AddsAmount: 2,
      AddsType: "mo",
    },
    {
      AddsId: 2,
      AddsTitle: "Customizable profile",
      AddsDescription: "Custom theme on your profile",
      AddsAmount: 1,
      AddsType: "mo",
    },
  ]);

  useEffect(() => {
    // Define a function to update PickAdds
    const updatePickAdds = () => {
      const type = billings.some((item) => item.Plantype === "mo");

      if (!type) {
        const updatedAdds = PickAdds.map((item) => ({
          ...item,
          AddsType: "yr",
          AddsAmount: item.AddsAmount * 10,
        }));

        setAdds(updatedAdds);
      }
    };

    // Call the updatePickAdds function whenever billings changes
    updatePickAdds();
  }, [billings]);

  function onCancel() {
    // Reset the form state to its initial values
    setUserInfo({
      UserData: {
        Name: "",
        Email: "",
        PhoneNumber: "",
      },
      UserPlan: {
        Planname: "",
        icon: "",
        Planamount: "",
        Plantype: "",
        PlanID: "",
      },
      UserAddsInfo: [],
    });

    setConfirmationMade(false);
    GoFirst();
  }

  const [userInfo, setUserInfo] = useState({
    UserData: {
      Name: "",
      Email: "",
      PhoneNumber: "",
    },
    UserPlan: {
      Planname: "",
      icon: "",
      Planamount: "",
      Plantype: "",
      PlanID: "",
    },
    UserAddsInfo: [],
  });

  // Define functions to update the userInfo object
  const updateName = (name) => {
    setUserInfo({
      ...userInfo,
      UserData: { ...userInfo.UserData, Name: name },
    });
  };

  const updateEmail = (email) => {
    setUserInfo({
      ...userInfo,
      UserData: { ...userInfo.UserData, Email: email },
    });
  };

  const updatePhoneNumber = (phoneNumber) => {
    setUserInfo({
      ...userInfo,
      UserData: { ...userInfo.UserData, PhoneNumber: phoneNumber },
    });
  };

  const updatePlanInfo = (planName, planIcon, planAmount, planType) => {
    setUserInfo({
      ...userInfo,
      UserPlan: {
        Planname: planName,
        icon: planIcon,
        Planamount: planAmount,
        Plantype: planType,
      },
    });
  };

  if (confirmationMade) {
    if (
      userInfo.UserData.Name &&
      userInfo.UserData.Email &&
      userInfo.UserData.PhoneNumber &&
      userInfo.UserPlan.Planname
    ) {
      // Check if the user doesn't already exist in the Allusers array
      const userExists = Allusers.some(
        (user) => user.UserData.Email === userInfo.UserData.Email
      );

      if (!userExists) {
        setUserInfo({
          UserData: {
            Name: "",
            Email: "",
            PhoneNumber: "",
          },
          UserPlan: {
            Planname: "",
            icon: "",
            Planamount: "",
            Plantype: "",
            PlanID: "",
          },
          UserAddsInfo: [],
        });

        Allusers.push(userInfo);
        saveAllUsersToLocalStorage(Allusers);
        console.log("Saving To Local Storage Successed");
        setAdminLoggedIn(false);

        console.log("User Confirmation Successfully", Allusers);
      }
    }

    // selectdTabID = selectdTabID+1;

    return showAdmin && !adminLoggedIn ? (
      <AdminLoginPage
        Tabs={Tabs}
        selectdTabID={selectdTabID}
        GoBack={onCancel}
        onAdminLogin={handleAdminLogin}
      />
    ) : adminLoggedIn ? (
      <Admin
        Tabs={Tabs}
        selectdTabID={selectdTabID}
        Allusers={Allusers}
        GoBack={onCancel}
      />
    ) : (
      <ThankFullComponent
        GoNextTab={GoNextTab}
        GoBack={onCancel}
        selectdTabID={selectdTabID}
        specialGoAdmin={specialGoAdmin}
      />
    );
  } else {
    return (
      <div className="content-box">
        <PageTitle Tabs={Tabs} selectdTabID={selectdTabID} />

        {selectdTabID === 1 && (
          <PersonalInfo
            GoNextTab={GoNextTab}
            userInfo={userInfo}
            onSetName={(e) => updateName(e.target.value)}
            onSetEmail={(e) => updateEmail(e.target.value)}
            onSetPhone={(e) => updatePhoneNumber(+e.target.value)}
            specialGoAdmin={specialGoAdmin}
          />
        )}

        {selectdTabID === 2 && (
          <SelectYourPlan
            GoBack={GoBack}
            GoNextTab={GoNextTab}
            userInfo={userInfo}
            updatePlanInfo={updatePlanInfo}
            setUserInfo={setUserInfo}
            billings={billings}
            setBillings={setBillings}
          />
        )}

        {selectdTabID === 3 && (
          <PickAddsOn
            GoBack={GoBack}
            GoNextTab={GoNextTab}
            userInfo={userInfo}
            billings={billings}
            setUserInfo={setUserInfo}
            PickAdds={PickAdds}
          />
        )}

        {selectdTabID === 4 && (
          <FinishingUp
            GoBack={GoBack}
            userInfo={userInfo}
            selectdTabID={selectdTabID}
            setUserInfo={setUserInfo}
            onConfirm={onConfirm}
            GoNextTab={GoNextTab}
          />
        )}
      </div>
    );
  }
}
