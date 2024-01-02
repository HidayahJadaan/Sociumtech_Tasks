import "./PersonalInfo.css"

export default function PersonalInfo({
  GoNextTab,
  userInfo,
  onSetName,
  onSetEmail,
  onSetPhone,
  specialGoAdmin
}) 

{
  function handleOnSumbit(e) {
    e.preventDefault();
    console.log(userInfo);

    GoNextTab();
  }


  return (
   
   
   <form className="personalInfo" onSubmit={handleOnSumbit}>
      <label>Name</label>
      <input type="text" placeholder="e.g. Stephen king" onChange={onSetName}  required/>

      <label>Email</label>
      <input
        type="email"
        placeholder="e.g. Stephenking@lorem.com"
        onChange={onSetEmail}
        required
      />

      <label>Phone Number</label>
      <input
        type="text"
        placeholder="e.g. + 1234567890"
        onChange={onSetPhone}
        required
      />

<div className="buttons">
  <button className="btn" onClick={specialGoAdmin}>Admin Page</button>

<button className="btn next-btn" type="submit">Next Step</button>
</div>
    </form>

  );
}