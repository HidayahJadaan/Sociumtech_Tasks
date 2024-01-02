import Tab from "../Tab/Tab"
import './SideBar.css'

export default function SideBar({ Tabs, selectdTabID }) {
  return (
    <div className="sidebar">
      {Tabs.map((tab) => (
        <Tab Tab={tab} key={tab.id} selectdTabID={selectdTabID} />
      ))}
    </div>
  );
}