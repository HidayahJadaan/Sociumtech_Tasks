import { useState } from "react";
import "./BillItem.css"

export default function BillItem({ billItem, userInfo , updatePlanInfo }) 
  
{
const [currPlan, setCurrPlan] = useState("");


function handleSelection() {
  setCurrPlan(billItem.Planname);

  
  // Update the state using the provided functions
  updatePlanInfo(billItem.Planname, billItem.icon ,billItem.Planamount, billItem.Plantype);
     console.log(userInfo);
}



return (
    <label className="Item" onClick={handleSelection}>
    <input id={currPlan} name="plan" type="radio" />


    <img src={billItem.icon} alt={billItem.Planname} className="billIcon" />
    <div className="billItem-content">

    <h3>{billItem.Planname}</h3>
    <label className="bill-desc">
      <span>${billItem.Planamount}/</span>

      <span>{billItem.Plantype}</span>
    </label>
    <p className="bill-Discount">2 months free</p>
    </div>
  </label>
);
}
