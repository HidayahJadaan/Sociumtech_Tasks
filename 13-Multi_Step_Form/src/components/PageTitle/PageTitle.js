import "./PageTitle.css"

export default function PageTitle({ Tabs, selectdTabID }) {
    const selectedObject = Tabs.find((tab) => tab.id === selectdTabID);
    return (
      <div className="Main-Title-Component">
        <h1 className="page-title">{selectedObject.PageTitle}</h1>
        <p className="page-description">{selectedObject.description}</p>
      </div>
    );
  }