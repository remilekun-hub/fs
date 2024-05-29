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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

	const formSchema = z.object({
		name: z.string().min(1, "required"),
		address: z.string().min(1, "required"),
		postcode: z.string().min(1, "required"),
		contact: z.string().min(1, "required"),
		email: z.string().min(1, "required").email("invalid email"),
		property_type: z.string().min(1, "required"),
		beds: z.string().min(1, "required"),
		improvements: z
			.array(z.object({ value: z.string(), label: z.string() }))
			.min(1, "required"),
		suggestion: z.string().min(1, "required"),
	});

	type dataInputs = z.infer<typeof formSchema>;
	const {
		register,
		handleSubmit,
		control,
    reset,
resetField,
		formState: { errors },
	} = useForm<dataInputs>({
		resolver: zodResolver(formSchema),
	});

	const submitForm = async (data: dataInputs) => {
    const improvements = data.improvements.map((i)=> i.value )
		console.log({...data, improvements});
     
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<div className="w-full sm:w-5/12 mx-auto">
				<div className="bg-white shadow-sm p-6 md:p-10 rounded-[6px]">
					<div className="text-center mb-10">
						<h2 className="text-[30px] leading-[40px] font-[600]">
							EPC Booking Request Form
						</h2>
					</div>
					<ScrollArea className="h-[65vh] px-4">
						<form onSubmit={handleSubmit(submitForm)}>
							<div className="grid w-full items-center gap-3 mb-9">
								<Label htmlFor="Name">
									Name <span className="text-[#f34f86]">*</span>
								</Label>
								<Input
									type="text"
									id="name"
									placeholder="Enter name"
									{...register("name")}
								/>
								{errors?.name && (
									<span className="text-red-400 text-[13px]">
										{errors.name?.message}
									</span>
								)}
							</div>
							<div className="grid w-full items-center gap-3 mb-9">
								<Label htmlFor="Address">
									Address <span className="text-[#f34f86]">*</span>
								</Label>
								<Input
									type="text"
									id="address"
									placeholder="Enter address"
									{...register("address")}
								/>
								{errors?.address && (
									<span className="text-red-400 text-[13px]">
										{errors.address?.message}
									</span>
								)}
							</div>
							<div className="grid w-full items-center gap-3 mb-9">
								<Label htmlFor="Postcode">
									Postcode <span className="text-[#f34f86]">*</span>
								</Label>
								<Input
									type="tel"
									id="postcode"
									placeholder="Enter postcode"
									{...register("postcode")}
								/>
								{errors?.postcode && (
									<span className="text-red-400 text-[13px]">
										{errors.postcode?.message}
									</span>
								)}
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
									{...register("contact")}
								/>
								{errors?.contact && (
									<span className="text-red-400 text-[13px]">
										{errors.contact?.message}
									</span>
								)}
							</div>
							<div className="grid w-full items-center gap-3 mb-9">
								<Label htmlFor="Email">
									Email Address{" "}
									<span className="text-[#f34f86]">*</span>
								</Label>
								<Input
									type="email"
									id="email"
									placeholder="Enter email address"
									{...register("email")}
								/>
								{errors?.email && (
									<span className="text-red-400 text-[13px]">
										{errors.email?.message}
									</span>
								)}
							</div>
							<div className="grid w-full items-center gap-3 mb-9">
								<Label htmlFor="property">
									Property Type{" "}
									<span className="text-[#f34f86]">*</span>
								</Label>
								<Controller
									name="property_type"
									control={control}
									render={({ field: { onChange, value } }) => (
										<UISelect onValueChange={onChange} value={value}>
											<SelectTrigger>
												<SelectValue placeholder="Property Type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="flat">Flat</SelectItem>
												<SelectItem value="bungalow">
													Bungalow
												</SelectItem>
												<SelectItem value="parkhome">
													Park Home
												</SelectItem>
											</SelectContent>
										</UISelect>
									)}
								/>

								{errors?.property_type && (
									<span className="text-red-400 text-[13px]">
										{errors.property_type?.message}
									</span>
								)}
							</div>
							<div className="grid w-full items-center gap-3 mb-9">
								<Label htmlFor="Bedrooms">No of Bedrooms</Label>
								<Controller
									name="beds"
									control={control}
									render={({ field: { onChange, value } }) => (
										<UISelect onValueChange={onChange} value={value}>
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
									)}
								/>
								{errors?.beds && (
									<span className="text-red-400 text-[13px]">
										{errors.beds?.message}
									</span>
								)}
							</div>
							<div className="grid w-full items-center gap-3 mb-9">
								<label htmlFor="Improvement">
									Tell us which improvements you are most likely to be
									interested in
								</label>
								<Controller
									name="improvements"
									control={control}
									render={({ field: { onChange, value } }) => (
										<Select
											isMulti
											name="improvements"
											options={options}
											className="basic-multi-select"
											classNamePrefix="select"
											placeholder="Tell us which improvements"
											onChange={onChange}
											value={value}
										/>
									)}
								/>
								{errors?.improvements && (
									<span className="text-red-400 text-[13px]">
										{errors.improvements?.message}
									</span>
								)}
							</div>
							<div className="grid w-full items-center gap-3 mb-10">
								<Label htmlFor="suggestion">
									Is there anything else you'd like to tell us
								</Label>
								<Input
									type="text"
									id="suggestion"
									placeholder="Suggestions"
									{...register("suggestion")}
								/>
								{errors?.suggestion && (
									<span className="text-red-400 text-[13px]">
										{errors.suggestion?.message}
									</span>
								)}
							</div>
							<div className="flex space-x-3">
								<Checkbox id="terms" />
								<Label htmlFor="terms" className="text-[12px]">
									By submitting this form, you agree to be contacted by{" "}
									{termsName} and our partners and allow us to access
									your Energy Performance Certificate (EPC) data. Read
									our privacy policy for more information about how
									we'll use and store your details -{" "}
									<Link href={termsLink}>{termsTitle}</Link>
								</Label>
							</div>
							<div className="flex justify-center mx-auto mt-10">
								<Button variant="secondary" type="submit">
									Submit
								</Button>
							</div>
						</form>
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}
