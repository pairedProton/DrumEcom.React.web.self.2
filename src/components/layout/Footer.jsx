import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = ({ footerLinks, footerContact }) => {

 const {email,phone,timing,exportEmail,giftingEmail,mobile} = footerContact;

 const getInTouch = [
   {
     title: "Get In Touch",
     data: {
       name: email,
       path: `mailto:${email}`,
     },
   },
   {
     title: "Toll Free",
     data: {
      name:phone,
      path: `tel:${phone}`,
      timing:timing,
     },
   },
   {
     title: "For International Business",
     data: {
      name:exportEmail,
      path: `mailto:${exportEmail}`,
     },
   },
   {
     title: "For Corporate / Institutional Gifting",
     data: {
      name:giftingEmail,
      // phone:mobile,
      path: `mailto:${giftingEmail}`,
     },
   },
 ];

 const socialIcons = [
    {
        icon:<FaFacebook />,
        link:"#"
    },
    {
        icon:<FaTwitter />,
        link:"#"
    },
    {
        icon:<FaInstagram />,
        link:"#"
    },
    {
        icon:<FaYoutube />,
        link:"#"
    },
    {
        icon:<FaLinkedin />,
        link:"#"
    }
 ]

  return (
    <div className="w-full bg-emerald-900 text-bg flex flex-col gap-6 ">
      <div className="footerTextSection flex justify-between items-start py-10 px-18">
        <ul className="footerAbout flex flex-col gap-3 text-md">
          {footerLinks[0].links?.map((item, index) => (
            <Link key={index} to={item.path} className="hover:underline underline-offset-2 transition-all duration-300" >{item.name}</Link>
          ))}
        </ul>
        <ul className="footerContact flex flex-col gap-3 text-md ">
          {footerLinks[1].links?.map((item, index) => (
            <Link key={index} to={item.path} className="hover:underline underline-offset-2 transition-all duration-300" >{item.name}</Link>
          ))}
        </ul>
        <div className="footerSupport flex flex-col gap-4 mr-26">
          {getInTouch.map((item, index) => (
            <ul className="flex flex-col gap-1 text-sm" key={index}>
              <li key={index} className="text-lg font-family-heading ">
                {item.title}
              </li>
              
                <Link to={item.data.path} className="text-sm font-family-body" key={index}>
                  {item.data.name}
                </Link>
                {item.data.timing && (
                  <li className="text-sm font-family-body">{item.data.timing}</li>
                )}
              
            </ul>
          ))}

          <div className="footerIconSection flex gap-2">
            {socialIcons.map((item, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center text-lg justify-center text-white transition-colors"
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="footerIconSection"></div> */}

      {/* Bottom Copyright Bar */}
      <div className="relative z-10 w-full bg-white py-4">
        <div className="container mx-auto px-8 md:px-12">
          <p className="text-center text-emerald-950 text-sm md:text-base">
            Copyright © 2025 Taurus Organic India. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
