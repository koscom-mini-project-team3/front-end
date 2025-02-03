import React from 'react';
import TopBar from "./top-bar";
import NavigationBar from "./navigation-bar";

export function Header({ activeTag }) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <TopBar />
        <NavigationBar activeTag={activeTag} />
      </div>
    </div>
  )
}

export default Header;

