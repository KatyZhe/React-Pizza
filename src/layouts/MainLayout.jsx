import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

export default function MainLayot() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}