"use client";
import Image from "next/image";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

const formSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

const ImageWithText = ({
  image,
  title,
  description,
  cta,
  swap,
  id,
}: {
  image: string;
  title: string;
  description: string;
  cta: string;
  link: string;
  swap?: boolean;
  id?: string;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setIsSubmitted(true);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  return (
    <div
      className={`w-full flex flex-col md:flex-row items-center justify-between bg-white ${
        swap ? "md:flex-row-reverse" : ""
      }`}
      id={id}
    >
      <div className="w-full h-auto rounded">
        <Image
          src={image}
          alt={title}
          width={1500}
          height={1000}
          objectFit="cover"
          className="rounded"
        />
      </div>

      <div className={`w-full my-4 md:mt-0 ${swap ? "pr-8" : "pl-8"}`}>
        <h4 className="text-2xl sm:text-2xl font-normal mb-2 text-left">
          {title}
        </h4>
        <p className="text-sm md:text-md xl:text-lg font-light">
          {description}
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mr-4 mt-4">Get in Touch</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request {title} Service</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <div
                className="bg-background container mx-auto px-4"
                id="contact-form"
              >
                {!isSubmitted ? (
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="max-w-2xl mx-auto w-full flex flex-col gap-4 my-12"
                  >
                    <h2 className="text-4xl text-center">Contact Us</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                      <FormField
                        name="firstName"
                        control={form.control}
                        render={({ field }) => {
                          return (
                            <FormItem className="flex-1">
                              <FormLabel>John</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="John"
                                  type="text"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        name="lastName"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Doe" type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="john.doe@gmail.com"
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="message"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={5}
                              {...field}
                              placeholder="Put your Message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 my-12">
                    <h2 className="text-4xl text-center">Contact Us</h2>

                    <h3 className="text-2xl pb-4">
                      Your message has been received!
                    </h3>

                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        form.reset();
                      }}
                    >
                      Submit Another Message
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          </DialogContent>
        </Dialog>
        <Link
          href="/services"
          className={`${buttonVariants({ variant: "secondary" })}`}
        >
          {cta}
        </Link>
      </div>
    </div>
  );
};

export default ImageWithText;
