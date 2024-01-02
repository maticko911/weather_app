import { data } from "autoprefixer";
import React from "react";

const yearOfProductio = new Date();

const Footer = () => {
  return (
    <footer className="bg-black text-white font-bold text-center p-5 mt-auto">
      Copyright &copy; {yearOfProductio.getFullYear()}
    </footer>
  );
};

export default Footer;
