
import BillItem from "../BillItem/BillItem";
import React, { useState } from "react";

import "./SelectPlan.css";

export default function SelectYourPlan({ userInfo, updatePlanInfo, setUserInfo, billings, setBillings,GoNextTab, GoBack }) {
  const [planType, setPlanType] = useState("mo");
  const [selectedPlan, setSelectedPlan] = useState(null);


  const togglePlanType = () => {
    const newPlanType = planType === "mo" ? "yr" : "mo";
  
    const updatedBillings = billings.map((item) => {
      const newAmount =
        newPlanType === "mo" ? item.Planamount / 10 : item.Planamount * 10;
      return { ...item, Planamount: newAmount, Plantype: newPlanType };
    });
  
    // Update userInfo immediately after toggling the plan type
    if (selectedPlan) {
      const selectedBillingItem = updatedBillings.find(
        (item) => item.Planname === selectedPlan
      );
      setUserInfo({
        ...userInfo,
        Plantype: newPlanType,
        Planamount: selectedBillingItem ? selectedBillingItem.Planamount : 0,
      });
    }
  
    setBillings(updatedBillings);
    setPlanType(newPlanType);
  
    
    // Update planInfo if a plan is selected
    if (selectedPlan) {
      const selectedBillingItem = updatedBillings.find(
        (item) => item.Planname === selectedPlan
      );
      updatePlanInfo(
        selectedBillingItem.Planname,
        selectedBillingItem.icon,
        selectedBillingItem.Planamount,
        selectedBillingItem.Plantype
      );
    }
  };
  

  const handlePlanSelection = (selectedPlan) => {
    setSelectedPlan(selectedPlan);

    const selectedBillingItem = billings.find(
      (item) => item.Planname === selectedPlan
    );
    updatePlanInfo(
      selectedBillingItem.Planname,
      selectedBillingItem.icon,
      selectedBillingItem.Planamount,
      selectedBillingItem.Plantype
    );
  };

  return (
    <div className="SelectYourPlan">
      <div className="Billings">
        {billings.map((item) => (
          <BillItem
            billItem={item}
            key={item.Planname}
            isSelected={selectedPlan === item.Planname}
            updatePlanInfo={updatePlanInfo}
            onClick={() => handlePlanSelection(item.Planname)}
            userInfo={userInfo}
          />
        ))}
      </div>
      <div className="toggle-bill">
        <span>Monthly</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={planType === "yr"}
            onChange={togglePlanType} // Use onChange event to toggle the plan type
          />
          <span className="slider round"></span>
        </label>

        <span>Yearly</span>
      </div>


      <div className="buttons">
  <button className="btn" onClick={GoBack}>Go Back</button>

<button className="btn next-btn" onClick={GoNextTab}>Next Step</button>
</div>
    </div>
  );
}
