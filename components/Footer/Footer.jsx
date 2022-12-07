import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
const Footer = () => {
  return (
    <div className="w-full bg-[#1867B6] py-10">
      <footer className="w-[90%] mx-auto  text-white">
        <div className="footer-top grid grid-flow-col px-10">
          <div className="footer-top-left">
            <h2 className="text-3xl">Stay in loop</h2>
            <p className="mt-4 w-[600px] text-base font-normal mb-4">
              Join our mailing list to stay in the loop with our newest feature
              releases, NFT drops, and tips and tricks for navigating OpenSea.
            </p>
            <div className="flex gap-x-5 ">
              <input
                type="email"
                placeholder="Your email address"
                className="px-6 py-3 w-[70%] rounded-md text-black"
              />
              <button className="bg-[#2081E2] px-4 py-2 rounded-lg">
                Sign up
              </button>
            </div>
          </div>
          <div className="footer-top-right ">
            <h2 className="text-3xl">Join the community</h2>
            <div className="mt-4 w-[600px] text-base font-normal mb-4 flex items-center gap-x-5">
              <span className=" p-2  block bg-[#2081E2] rounded-lg">
                <TwitterIcon></TwitterIcon>
              </span>
              <span className="p-2 block bg-[#2081E2] rounded-lg">
                <FacebookIcon></FacebookIcon>
              </span>
              <span className="p-2 block bg-[#2081E2] rounded-lg">
                <InstagramIcon></InstagramIcon>
              </span>
              <span className="p-2 block bg-[#2081E2] rounded-lg">
                <EmailIcon></EmailIcon>
              </span>
              <span className="p-2 block bg-[#2081E2] rounded-lg">
                <AddLocationAltIcon></AddLocationAltIcon>
              </span>
            </div>
          </div>
        </div>

        <div className="line w-full h-[2px] bg-slate-300 mt-8"></div>

        <div className="footer-botton py-8 text-center">
          <p>© 2020 - 2022 Team NFT-FPT Aptech</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
