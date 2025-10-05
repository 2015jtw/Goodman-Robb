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

const statusStyles = {
  success: "text-emerald-600",
  error: "text-rose-600",
};

export default function ContactForm({
  topics,
  defaultTopic = "",
}: {
  topics: TopicsQueryResult;
  defaultTopic?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: keyof typeof statusStyles;
    text: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      topic: defaultTopic,
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      const result = await sendEmail(values);
      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "Thanks for reaching out—your message is on its way!",
        });
        form.reset({
          fullname: "",
          topic: defaultTopic,
          email: "",
          message: "",
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: "We couldn't send your message. Please try again shortly.",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text:
          error instanceof Error
            ? `Something went wrong: ${error.message}`
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <section
        className="bg-gradient-to-b from-white via-gray-50 to-white py-24 lg:py-32"
        id="contact-form"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
              Let&apos;s collaborate
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Start the conversation
            </h2> 
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              Tell us a little about your goals. We&apos;ll follow up quickly with next
              steps and the best way to move forward together.
            </p>
          </div>

          {/* Form Card */}
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
              <div className="absolute inset-x-0 -top-32 h-64 bg-gradient-to-br from-primary/15 via-blue-100/30 to-transparent blur-3xl" />
              <div className="relative p-6 sm:p-10 lg:p-12">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      name="fullname"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-900">
                            Full name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Jordan Smith"
                              type="text"
                              className="h-12 rounded-xl border-gray-200 bg-white focus-visible:ring-primary"
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-900">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="you@company.com"
                              type="email"
                              className="h-12 rounded-xl border-gray-200 bg-white focus-visible:ring-primary"
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">
                          Topic
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white focus:ring-primary focus:ring-offset-0">
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {topics.map((topic) => (
                              <SelectItem
                                key={topic._id}
                                value={topic.title || ""}
                              >
                                {topic.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="message"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            {...field}
                            placeholder="How can we help?"
                            className="rounded-xl border-gray-200 bg-white focus-visible:ring-primary"
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-500">
                      We typically respond within one business day.
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold shadow-lg shadow-primary/20 transition-transform duration-200 hover:scale-[1.01]"
                    >
                      {isSubmitting ? "Sending..." : "Send message"}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <SiMinutemailer />
                      </span>
                    </Button>
                  </div>

                  {submitMessage ? (
                    <p
                      aria-live="polite"
                      className={`text-center text-sm font-medium ${statusStyles[submitMessage.type]}`}
                    >
                      {submitMessage.text}
                    </p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Form>
  );
}
