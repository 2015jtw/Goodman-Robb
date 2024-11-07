"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { SiMinutemailer } from "react-icons/si";

import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import emailjs from "emailjs-com";

const formSchema = z.object({
  fullname: z.string().min(1).max(50),
  topic: z.string().min(1).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

export default function HomepageForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      topic: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        values,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      console.log(result.text);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <div className="bg-background container mx-auto px-4" id="contact-form">
        {isSubmitted ? (
          <div className=" text-center p-4">
            <h2>Thank you for your submission!</h2>
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-2xl mx-auto w-full flex flex-col gap-4 my-12"
          >
            <h2 className="text-4xl text-center">Contact Us</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                name="fullname"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Topic</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="grant-writing">
                          Grant Writing
                        </SelectItem>
                        <SelectItem value="esg-consulting">
                          ESG Consulting
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
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
            </div>

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
            <Button type="submit" className="w-full group">
              Submit
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                <SiMinutemailer />
              </span>
            </Button>
          </form>
        )}
      </div>
    </Form>
  );
}
