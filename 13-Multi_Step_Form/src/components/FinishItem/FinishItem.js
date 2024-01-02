export default function FinishItem({userInfo}) {
    return (
      <div>
        {userInfo.UserAddsInfo.map((item, index) => (
          <div className="selected" key={index}>
            <p>{item.AddsTitle}</p>
            <p>+${item.AddsAmount}/{item.AddsType}</p>
          </div>
        ))}
      </div>
    );
  }