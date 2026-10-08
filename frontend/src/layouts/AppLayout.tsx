import React from 'react';
import { Outlet } from 'react-router-dom';
import { MobileNav } from '../components/navigation/MobileNav';

export const AppLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden bg-surface-light dark:bg-surface-dark transition-colors">
      <Outlet />
      <MobileNav />
    </div>
  );
};
