import React from "react";

//sticky footer
export default function Footer() {
  return (

      <div className="footer bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} Developer Network
      </div>

  );
}
