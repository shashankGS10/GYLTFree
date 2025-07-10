"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import FormField from "./FormField";
import Image from "next/image";
import Link from "next/link";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          alert(`Sign-in failed: ${error.message}`);
          return;
        }

        window.location.href = "/chat";
      } else {
        // Sign-up flow
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: { name: values.name },
          },
        });

        if (error) {
          alert(`Sign-up failed: ${error.message}`);
          return;
        }

        alert(
          "Sign-up successful! Please check your email to confirm your account before signing in."
        );
        // Optionally redirect to sign-in page or clear form
        form.reset();
      }
    } catch (err) {
      alert(`Unexpected error: ${(err as Error).message}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border transition-all duration-300">
      <div className="flex flex-col gap-6 card-background rounded-xl min-h-full py-14 px-10 transition-colors duration-300">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="PrepWise logo" height={32} width={38} />
          <h2 className="text-primary text-3xl font-semibold transition-colors duration-300">
            Smart Support
          </h2>
        </div>
        <h3 className="text-2xl font-semibold text-center">
          Smart Support Answers with AI
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full form"
            aria-label={isSignIn ? "Sign in form" : "Sign up form"}
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
