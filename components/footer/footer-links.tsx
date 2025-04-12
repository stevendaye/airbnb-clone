"use client";

import Link from "next/link";
import { BsGlobe } from "react-icons/bs";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6";

export const FooterLinks = () => {
  return (
    <div className="text-slate-600">
      <div className="max-w-screen-lg m-auto mt-12 px-7 lg:px-0">
        <hr />

        <div className="flex flex-col lg:flex-row items-start gap-5 justify-between py-9">
          <div className="flex flex-col gap-1">
            <p>
              © 2025 Airbnb Clone 🇧🇯 · Terms Sitemap · Privacy · Your Privacy
              Choices
            </p>
            <p>Made with ❤️ by Steven Audrey Daye</p>
          </div>

          <div className="flex items-center gap-3">
            <BsGlobe size="15px" />
            <span>English US</span>
            <span>$ USD</span>
            <Link href="https://github.com/stevendaye" target="_blank">
              <FaGithub size="15px" />
            </Link>
            <Link href="https://www.instagram.com/steven.daye/" target="_blank">
              <FaInstagram size="15px" />
            </Link>
            <Link href="https://x.com/stevendaye_" target="_blank">
              <FaTwitter size="15px" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
