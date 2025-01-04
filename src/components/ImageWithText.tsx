// "use client";

// React/Next
import Image from "next/image";
import React from "react";

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

// Sanity
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { TypedObject } from "sanity";

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
  description: TypedObject | TypedObject[];
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
      <div
        className={`w-full lg:w-1/2 p-4 ${
          tallImage ? "h-[300px] lg:h-[550px]" : "h-[300px] lg:h-[450px]"
        }`}
      >
        {chartComponent ? (
          chartComponent
        ) : (
          <div className="h-full w-full relative">
            <Image
              src={imageLink || "/images/test-photo.jpg"}
              alt={imageAlt || title}
              layout="fill" // Ensures the image fills the container
              objectFit="cover" // Ensures the image scales properly within the container
              className="rounded"
            />
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2 p-4">
        <h4 className="text-2xl font-medium mb-2 text-left">{title}</h4>
        <div className="text-sm md:text-md xl:text-lg font-light">
          <PortableText
            value={description}
            components={{
              block: {
                normal: ({ children }) => <p className="pb-2">{children}</p>,
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc list-inside pl-4 mb-4">
                    {children}
                  </ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal list-inside pl-4 mb-4">
                    {children}
                  </ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => <li className="mb-2">{children}</li>,
                number: ({ children }) => <li className="mb-2">{children}</li>,
              },
              types: {
                image: ({ value }) => (
                  <div className="my-6">
                    <Image
                      src={urlFor(value).url()}
                      alt={value?.alt || "Image"}
                      className="w-full h-auto rounded-lg shadow-md"
                      width={600}
                      height={400}
                    />
                  </div>
                ),
              },
            }}
          />
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
