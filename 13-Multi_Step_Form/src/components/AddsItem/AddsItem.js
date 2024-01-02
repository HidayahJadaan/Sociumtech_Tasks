import "./AddsItem.css"

export default function AddsItem({ item, userInfo, handleSelection }) {
    const isAddOnSelected = userInfo.UserAddsInfo.some(
      (add) => add.AddsId === item.AddsId
    );
  
    const handleCheckboxClick = () => {
      handleSelection(item);
      console.log(userInfo);
    };
  
    return (
      <label className="AddsItem">
        <input
          type="checkbox"
          defaultChecked={isAddOnSelected} // Use defaultChecked
          onClick={handleCheckboxClick}
        />
  
        <div>
          <h1>{item.AddsTitle}</h1>
          <p>{item.AddsDescription}</p>
        </div>
  
        <p className="adds-amount">
          +$
          <span>
            {item.AddsAmount}/{item.AddsType}
          </span>
        </p>
      </label>
    );
  }
  