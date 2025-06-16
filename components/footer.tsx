import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 border-t mt-8">
      <div className="container mx-auto text-center text-sm text-gray-500">
        © {new Date().getFullYear()} N.E.X.T. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
