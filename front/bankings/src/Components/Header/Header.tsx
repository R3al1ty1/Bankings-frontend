import "./Header.css";
import * as React from 'react';
import ProfileMenu from "./ProfileMenu/ProfileMenu";
// @ts-ignore
import logo from "../../../bank-logo.png"

const Header: React.FC = () => {
  return (
      <div className="header-wrapper">
          <div className="header-left">
              <img src={logo} className="logo" alt="Bank Logo" />
              <div>
                  <h1 className="header-title">INK Bank</h1>
              </div>
          </div>

          <div className="header-links">
      <a href="/" className={"header-menu-link"}>
          <span>Частным лицам</span>
      </a>
      <a href="/" className={"header-menu-link"}>
          <span>Бизнесу</span>
      </a>

      <a href="/" className={"header-menu-link"}>
          <span>Самозанятым</span>
      </a>
      <a href="/" className={"header-menu-link"}>
          <span>О банке</span>
      </a>
      </div>
      <ProfileMenu />
    </div>
  );
};

export default Header;