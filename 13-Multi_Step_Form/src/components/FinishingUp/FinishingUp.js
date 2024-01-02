import FinishItem from "../FinishItem/FinishItem"
import TotalItem from "../TotalItem/TotalItem"
import "./FinishingUp.css"


export default function FinishingUp({  userInfo , selectdTabID, onConfirm, GoNextTab, GoBack}) {

  

    return (
      <>
        <div className="FinishingUp">
          <div className="userInfo">
            <h2>
              {userInfo.UserPlan.Planname}{' '}
              {userInfo.UserPlan.Plantype === 'mo' ? '(Monthly)' : '(Yearly)'}
            </h2>
            <h2>
              +${userInfo.UserPlan.Planamount}/
              {userInfo.UserPlan.Plantype === 'mo' ? 'mo' : 'yr'}
            </h2>
          </div>
          <div className="selected">
            <button>Change</button>
          </div>
          <FinishItem userInfo={userInfo}/>
        </div>
  
        <TotalItem userInfo={userInfo}/>

        <div className="buttons">
<button className="btn" onClick={GoBack}>Go Back</button>

        <button className="btn next-btn"
          onClick={
            selectdTabID === 4 ? onConfirm : GoNextTab
          }
        >
          {selectdTabID === 4 ? "Confirm" : "Next Step"}

         
        </button>
        </div>
  
      </>
    );
  }