import React from "react";

export const CardGroup = ({ cols, children }) => {
  return (
    <div className="card-group" style={{ "--cols": cols }}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="card">
          {child}
        </div>
      ))}
    </div>
  );
};
