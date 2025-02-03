import React from 'react';
import TopBar from "./top-bar";
import NavigationBar from "./navigation-bar";

export function Header({ activeTag }) {
  return (
    <div className="w-full">
      <TopBar />
      <NavigationBar activeTag={activeTag} />
    </div>
  )
}

export default Header;

