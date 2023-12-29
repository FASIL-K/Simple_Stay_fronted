import React from 'react';
import Example from '../Layout/Navbar/UserListingNavbar';
import { HorizontalCard } from '../Layout/PropertyCard';

function PostList() {
  return (
    <div>
      <Example />
      <div className="flex justify-center mt-14">
        <div className="text-center ">
          <HorizontalCard />
        </div>
      </div>
    </div>
  );
}

export default PostList;
