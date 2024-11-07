"use client";
import Image from "next/image";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { SiMinutemailer } from "react-icons/si";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModalServiceForm } from "./ModalServiceForms";

const ImageWithText = ({
  title,
  description,
  contactCTA,
  serviceLink,
  imageLink,
  imageAlt,
  chartComponent,
  swap,
  className,
  defaultTopic,
  id,
}: {
  title: string;
  description: string;
  contactCTA: string;
  serviceLink: string;
  imageLink?: string;
  className?: string;
  imageAlt?: string;
  defaultTopic: string;
  chartComponent?: React.ReactNode;
  swap?: boolean;
  id?: string;
}) => {
  return (
    <div
      className={`w-full flex flex-col md:flex-row items-center justify-between bg-white ${
        swap ? "md:flex-row-reverse" : ""
      } ${className}`}
      id={id}
    >
      <div className="w-full md:w-1/2 p-4">
        {chartComponent ? (
          chartComponent
        ) : (
          <Image
            src={imageLink || "/images/test-photo.jpg"}
            alt={imageAlt || title}
            width={1500}
            height={1000}
            objectFit="cover"
            className="rounded"
          />
        )}
      </div>

      <div className="w-full md:w-1/2 p-4">
        <h4 className="text-2xl sm:text-2xl font-normal mb-4 text-left">
          {title}
        </h4>
        <p className="text-sm md:text-md xl:text-lg font-light">
          {description}
        </p>
        <div className="flex flex-col md:flex-row mt-4 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="group">
                {contactCTA}
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                  <SiMinutemailer />
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="pb-4 px-4 text-center">
                  Request {title} Service
                </DialogTitle>
              </DialogHeader>
              <ModalServiceForm defaultTopic={defaultTopic} />
            </DialogContent>
          </Dialog>
          <Link
            href={serviceLink}
            className={`${buttonVariants({ variant: "secondary" })}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageWithText;
