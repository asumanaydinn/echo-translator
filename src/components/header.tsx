import React from "react";

const Header = () => {
  return (
    <div className="header">
      <img
        src={`${process.env.PUBLIC_URL}/assets/header-logo.png`}
        alt="logo"
        className="logo"
      />
    </div>
  );
};

export default Header;
