/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import logo from "../../../assets/logos/eco-logo.png";
import nakelLogo from "../../../assets/logos/logo.svg";
import nuelLogo from "../../../assets/logos/eco-logo.png";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";

const options = [
  { value: "battery", label: "Battery and Solar" },
  { value: "insulation", label: "Insulation" },
  { value: "heat", label: "Heat System" },
];

type LogoKey = "eco" | "nakel" | "edf";

const logoMapping: Record<LogoKey, StaticImageData> = {
  eco: logo,
  nakel: nakelLogo,
  edf: nuelLogo,
};

export default function Home() {
  const pathname = usePathname();
  const [selectedLogo, setSelectedLogo] = useState<StaticImageData>(logo);
  const [termsName, setTermsName] = useState<string>("The Eco Scheme");
  const [termsLink, setTermsLink] = useState<string>(
    "https://theecoscheme.co.uk/privacy-policy"
  );
  const [termsTitle, setTermsTitle] = useState<string>("ECOSCHEME");

  useEffect(() => {
    const pathParts = pathname.split("/");
    const id = pathParts[pathParts.length - 1];
    if (id && logoMapping[id as LogoKey]) {
      setSelectedLogo(logoMapping[id as LogoKey]);
      if (id === "eco") {
        setTermsName("The Eco Scheme");
        setTermsLink("https://theecoscheme.co.uk/privacy-policy");
        setTermsTitle("ECOSCHEME");
      } else if (id === "nakel") {
        setTermsName("Nakel");
        setTermsLink("https://nakel.co.uk/privacy-policy");
        setTermsTitle("NAKEL");
      } else if (id === "edf") {
        setTermsName("EDF");
        setTermsLink("https://edf.co.uk/privacy-policy");
        setTermsTitle("EDF");
      }
    } else {
      setSelectedLogo(logo);
      setTermsName("The Eco Scheme");
      setTermsLink("https://theecoscheme.co.uk/privacy-policy");
      setTermsTitle("ECOSCHEME");
    }
  }, [pathname]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full sm:w-5/12 mx-auto">
        <div className="bg-white shadow-sm p-6 md:p-10 rounded-[6px]">
          <div className="text-center mb-10">
            <h2 className="text-[30px] leading-[40px] font-[600]">
              ABC Booking Request Form
            </h2>
          </div>
          <ScrollArea className="h-[65vh] px-4">
            <div className="grid w-full items-center gap-3 mb-9">
              <Label htmlFor="Name">
                Name <span className="text-[#f34f86]">*</span>
              </Label>
              <Input type="text" id="name" placeholder="Enter name" />
            </div>
            <div className="grid w-full items-center gap-3 mb-9">
              <Label htmlFor="Address">
                Address <span className="text-[#f34f86]">*</span>
              </Label>
              <Input type="text" id="address" placeholder="Enter address" />
            </div>
            <div className="grid w-full items-center gap-3 mb-9">
              <Label htmlFor="Postcode">
                Postcode <span className="text-[#f34f86]">*</span>
              </Label>
              <Input type="number" id="postcode" placeholder="Enter postcode" />
            </div>
            <div className="grid w-full items-center gap-3 mb-9">
              <Label htmlFor="Contact">
                {" "}
                Preferred Contact Number{" "}
                <span className="text-[#f34f86]">*</span>
              </Label>
              <Input
                type="tel"
                id="contact"
                placeholder="Enter contact number"
              />
            </div>
            <div className="grid w-full items-center gap-3 mb-9">
              <Label htmlFor="Email">
                Email Address <span className="text-[#f34f86]">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter email address"
              />
            </div>
            <div className="grid w-full items-center gap-3 mb-9">
              <Label htmlFor="property">
                Property Type <span className="text-[#f34f86]">*</span>
              </Label>
              <UISelect>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="bungalow">Bungalow</SelectItem>
                  <SelectItem value="parkhome">Park Home</SelectItem>
                </SelectContent>
              </UISelect>
            </div>
            <div className="grid w-full items-center gap-3 mb-9">
              <Label htmlFor="Bedrooms">No of Bedrooms</Label>
              <UISelect>
                <SelectTrigger>
                  <SelectValue placeholder="No of Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NA">N/A</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </UISelect>
            </div>
            <div className="grid w-full items-center gap-3 mb-9">
              <label htmlFor="Improvement">
                Tell us which improvements you are most likely to be interested
                in
              </label>
              <Select
                isMulti
                name="improvements"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Tell us which improvements"
              />
            </div>
            <div className="grid w-full items-center gap-3 mb-10">
              <Label htmlFor="suggestion">
                Is there anything else you'd like to tell us
              </Label>
              <Input type="text" id="suggestion" placeholder="Suggestions" />
            </div>
            <div className="flex space-x-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-[12px]">
                By submitting this form, you agree to be contacted by{" "}
                {termsName} and our partners and allow us to access your Energy
                Performance Certificate (EPC) data. Read our privacy policy for
                more information about how we'll use and store your details -{" "}
                <Link href={termsLink}>{termsTitle}</Link>
              </Label>
            </div>
            <div className="flex justify-center mx-auto mt-10">
              <Button variant="secondary">Submit</Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
