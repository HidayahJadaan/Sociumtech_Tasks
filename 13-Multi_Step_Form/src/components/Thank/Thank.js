import thank from "../../assets/images/icon-thank-you.svg"
import "./Thank.css"

export default function ThankFullComponent({  GoBack, selectdTabID, specialGoAdmin }) {
  return (
    <>
      <div className="content-box ">
       <div className="Thanks">

       <img src={thank} alt="thankImage" />
        <h1>Thank You</h1>
        <p>
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
       </div>
     

      <div className="buttons">
        <button className="btn" onClick={GoBack}>
          Cancel
        </button>
        <button className="btn Admin-btn" onClick={specialGoAdmin}>
          {selectdTabID === 5 ? 'Admin Page' : 'Next Step'}
        </button>
      </div>

      </div>

    </>
  );
}