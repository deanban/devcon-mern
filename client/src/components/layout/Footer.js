import React from "react";

//sticky footer
export default function Footer() {
  return (
    <div className="footer bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Developer Connector
    </div>
  );
}

{
  /*<div>
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} Developer Connector
      </footer>
    </div>*/
}
