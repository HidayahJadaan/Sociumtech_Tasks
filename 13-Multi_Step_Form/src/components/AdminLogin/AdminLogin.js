import PageTitle from "../PageTitle/PageTitle";

export default function AdminLoginPage({
  Tabs,
  selectdTabID,
  GoBack,
  onAdminLogin
}) {
 
console.log(selectdTabID)
  return (
    <div className="content-box">
      <PageTitle Tabs={Tabs} selectdTabID={selectdTabID} />
      <form className="personalInfo" onSubmit={(event) => onAdminLogin(event.target.email.value, event.target.name.value, event.target.password.value)}>        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="e.g. Stephen king"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="e.g. Stephenking@admin.com"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />

        <div className="buttons">
          <button className="btn" onClick={GoBack}>
            Cancel
          </button>
          <button className="btn Admin-btn" type="submit">
            {selectdTabID === 5 ? "Log In" : "Next Step"}
          </button>
        </div>
      </form>
    </div>
  );
}
