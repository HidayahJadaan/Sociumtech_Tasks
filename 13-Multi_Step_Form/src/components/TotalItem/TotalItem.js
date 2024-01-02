export default function TotalItem({userInfo}) {

    const totalAmount = userInfo.UserAddsInfo.reduce((total, item) => total + parseFloat(item.AddsAmount), 0);
  
    return (
      <div className="selected Total">
       <p> Total per {userInfo.UserPlan.Plantype === "mo" ? "month" : "year"} </p>
       <h2> {`$${totalAmount + userInfo.UserPlan.Planamount}/${userInfo.UserPlan.Plantype}`}</h2>
      </div>
    );
  }