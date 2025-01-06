"use client";

// React/Next
import { useState } from "react";

// UI
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
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod + React Hook Form + Nodemailer
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/actions/sendEmail";

// Sanity
import { TopicsQueryResult } from "../../sanity.types";

const formSchema = z.object({
  fullname: z.string().min(1).max(50),
  topic: z.string().min(1).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

export default function ContactForm({ topics }: { topics: TopicsQueryResult }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      topic: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await sendEmail(values);
      if (result.success) {
        setSubmitMessage("Your message has been sent successfully!");
        form.reset();
      } else {
        setSubmitMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setSubmitMessage("An error occurred: " + error.message);
      } else {
        setSubmitMessage("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form {...form}>
      <div
        className="bg-background container mx-auto px-4 pb-24"
        id="contact-form"
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto w-full flex flex-col gap-4 "
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
                      {topics.map((topic) => (
                        <SelectItem key={topic._id} value={topic.title || ""}>
                          {topic.title}
                        </SelectItem>
                      ))}
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit"}
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              <SiMinutemailer />
            </span>
          </Button>

          {submitMessage && (
            <p
              className={`text-center ${submitMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}
            >
              {submitMessage}
            </p>
          )}
        </form>
      </div>
    </Form>
  );
}
