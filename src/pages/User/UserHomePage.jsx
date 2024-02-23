import React from 'react';
import UserHome from '../../components/User/pages/UserHome';
import Footer from '../../components/User/Layout/Footer/Footer';
import { StickyNavbar } from '../../components/User/Layout/Navbar/UserNavbar';

function UserHomePage() {
  return (
    <div>
      <StickyNavbar isHomePage={true} />
      <UserHome />
      <Footer />
    </div>
  );
}

export default UserHomePage;
