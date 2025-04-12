"use client";

import Link from "next/link";
import { FooterLinks } from "./footer-links";
import { FooterLocation } from "./footer-location";

export const FooterMenu = () => {
  return (
    <div className="bg-[#F7F7F7] m-0 p-0 text-[13.5px] font-medium">
      <FooterLocation />

      <div className="max-w-screen-lg m-auto flex flex-col md:flex-row justify-between pt-12 px-7 lg:px-0">
        <div className="flex flex-col gap-6">
          <h6 className="font-semibold">Support</h6>
          <Link href="#">AirCover</Link>
          <Link href="#">Anti-discrimination</Link>
          <Link href="#">Disability support</Link>
          <Link href="#">Cancelation options</Link>
          <Link href="#">Report neighborhood concern</Link>
        </div>

        <hr className="lg:hidden my-10 lg:my-0" />

        <div className="flex flex-col gap-6 ">
          <h6 className="font-semibold">Hosting</h6>
          <Link href="#"> Airbnb your home</Link>
          <Link href="#">AirCover for Hosts</Link>
          <Link href="#">Hosting resources</Link>
          <Link href="#"> Community forum</Link>
          <Link href="#">Hosting responsibly</Link>
          <Link href="#">Airbnb-friendly apartments</Link>
          <Link href="#">Join a free Hosting class</Link>
          <Link href="#">Find a co-host</Link>
        </div>

        <hr className="lg:hidden my-10 lg:my-0" />

        <div className="flex flex-col gap-6 mt-10 lg:mt-0">
          <h6 className="font-semibold">Airbnb Clone</h6>
          <Link href="#">Newsroom</Link>
          <Link href="#">New features</Link>
          <Link href="#">Careers</Link>
          <Link href="#">Investors</Link>
          <Link href="#">Gift cards</Link>
          <Link href="#">Gift cards</Link>
          <Link href="#">Emergency stays</Link>
        </div>
      </div>

      <FooterLinks />
    </div>
  );
};
