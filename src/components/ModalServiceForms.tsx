"use client";
import emailjs from "emailjs-com";
import { Button } from "./ui/button";
import { SiMinutemailer } from "react-icons/si";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  fullname: z.string().min(1).max(50),
  topic: z.string().min(1).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

export const ModalServiceForm = ({
  defaultTopic,
}: {
  defaultTopic: string;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      topic: defaultTopic,
      email: "",
      message: "",
    },
  });

  return (
    <Form {...form}>
      <div className="bg-background container mx-auto px-4" id="contact-form">
        {!isSubmitted ? (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-2xl mx-auto w-full flex flex-col gap-4"
          >
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
                name="topic"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Topic</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={defaultTopic} />
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
            <Button type="submit" className="w-full group">
              Submit
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                <SiMinutemailer />
              </span>
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 ">
            <h3 className="text-2xl pb-4">Your message has been received!</h3>

            <Button
              className="group"
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
            >
              Submit Another Message
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                <SiMinutemailer />
              </span>
            </Button>
          </div>
        )}
      </div>
    </Form>
  );
};
