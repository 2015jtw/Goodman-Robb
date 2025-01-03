// "use client";

// React/Next
import Image from "next/image";
import React, { ReactNode } from "react";

// UI
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
import { ModalForm } from "./ModalForm";
import { buttonVariants } from "@/components/ui/button";

const ImageWithText = ({
  title,
  description,
  serviceLink,
  defaultTopic,
  imageLink,
  imageAlt,
  chartComponent,
  swap,
  className,
  id,
  tallImage,
}: {
  title: string;
  description: ReactNode;
  serviceLink: string;
  defaultTopic: string;
  imageLink?: string;
  className?: string;
  imageAlt?: string;
  chartComponent?: React.ReactNode;
  swap?: boolean;
  id?: string;
  tallImage?: boolean;
}) => {
  return (
    <div
      className={`w-full flex flex-col lg:flex-row items-center justify-between bg-white mt-8 ${
        swap ? "lg:flex-row-reverse" : ""
      } ${className}`}
      id={id}
    >
      <div className="w-full lg:w-1/2 p-4">
        {chartComponent ? (
          chartComponent
        ) : (
          <Image
            src={imageLink || "/images/test-photo.jpg"}
            alt={imageAlt || title}
            width={1500}
            height={tallImage ? 2000 : 1000} // Conditionally apply height
            objectFit="cover"
            className="rounded"
          />
        )}
      </div>

      <div className="w-full lg:w-1/2 p-4">
        <h4 className="text-2xl sm:text-2xl font-normal mb-4 text-left">
          {title}
        </h4>
        <div className="text-sm md:text-md xl:text-lg font-light">
          {description}
        </div>
        <div className="flex flex-col md:flex-row mt-4 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="group">
                Get in Touch
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
              <ModalForm defaultTopic={defaultTopic} />
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
