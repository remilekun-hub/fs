
/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full sm:w-5/12 mx-auto">
        <div className="bg-white shadow-sm p-6 md:px-10 md:py-24 rounded-[6px]">
          <div className="text-center">
            <h2 className="text-[30px] leading-[40px] font-[600]">
              Booking Request Form
            </h2>
            <p className="text-[13px] font-[400] leading-[19px] my-10">
              Please fill out the form below to request a booking. Our team will
              review your information and get back to you as soon as possible.
              For any urgent inquiries, feel free to contact us directly. We
              look forward to serving you!
            </p>
            <div className="flex flex-row justify-center w-1/3 mx-auto gap-x-5">
              <Button 
                variant="secondary" 
                className="w-full" 
                onClick={() => handleNavigation('/epc-form/eco')}
              >
                EPC FORM
              </Button>
              <Button 
                variant="secondary" 
                className="w-full" 
                onClick={() => handleNavigation('/abc-form/nakel')}
              >
                ABC FORM
              </Button>
              <Button 
                variant="secondary" 
                className="w-full" 
                onClick={() => handleNavigation('/')}
              >
                XYZ FORM
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
