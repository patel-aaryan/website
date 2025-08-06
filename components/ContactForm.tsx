"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, Error } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be 1000 characters or less"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  mounted?: boolean;
}

export default function ContactForm({ mounted = true }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const messageValue = watch("message") || "";

  // Auto-clear status messages after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        const errorData = await response.json();
        console.error("Error sending email:", errorData);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitStatus("error");
    }
  };

  // Create motion wrapper components
  const MotionDiv = mounted ? motion.div : "div";

  return (
    <MotionDiv
      {...(mounted
        ? {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            viewport: { once: true },
          }
        : {})}
    >
      <Card className="border-border/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Send className="h-6 w-6 text-primary" />
            Get In Touch
          </CardTitle>
          <p className="text-muted-foreground">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you!
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name and Email on same line */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  {...register("name")}
                  className={`focus:ring-2 focus:ring-primary/20 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register("email")}
                  className={`focus:ring-2 focus:ring-primary/20 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Subject field */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                placeholder="What's this about?"
                {...register("subject")}
                className={`focus:ring-2 focus:ring-primary/20 ${
                  errors.subject ? "border-red-500" : ""
                }`}
              />
              {errors.subject && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell me about your project or say hello..."
                maxLength={1000}
                {...register("message")}
                className={`min-h-[120px] focus:ring-2 focus:ring-primary/20 ${
                  errors.message ? "border-red-500" : ""
                }`}
              />
              <div className="flex justify-between items-center">
                <div>
                  {errors.message && (
                    <p className="text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <p
                  className={`text-sm ${
                    messageValue.length > 1000
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {messageValue.length}/1000
                </p>
              </div>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <MotionDiv
                {...(mounted
                  ? {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                    }
                  : {})}
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Message sent successfully! I&apos;ll get back to you soon.
                </span>
              </MotionDiv>
            )}

            {submitStatus === "error" && (
              <MotionDiv
                {...(mounted
                  ? {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                    }
                  : {})}
                className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
              >
                <Error className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Failed to send message. Please try again or email me directly.
                </span>
              </MotionDiv>
            )}

            <MotionDiv
              {...(mounted
                ? {
                    whileHover: { scale: isSubmitting ? 1 : 1.02 },
                    whileTap: { scale: isSubmitting ? 1 : 0.98 },
                  }
                : {})}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <MotionDiv
                      {...(mounted
                        ? {
                            animate: { rotate: 360 },
                            transition: {
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            },
                          }
                        : {})}
                      className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </MotionDiv>
          </form>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}
