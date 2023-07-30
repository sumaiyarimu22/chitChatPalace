"use client";

import axios from "axios";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/page";
import { useCallback, useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      //axios register
      axios
        .post("/api/register", data)
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      //NextAuth SignIn
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: String) => {
    setIsLoading(true);

    //NextAuth Social sign in
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label="Name"
              register={register}
              id="name"
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            label="Email Address"
            register={register}
            id="email"
            errors={errors}
            type="email"
            disabled={isLoading}
          />
          <Input
            label="password"
            register={register}
            id="password"
            type="password"
            errors={errors}
            disabled={isLoading}
          />
          <Button disabled={isLoading} fullWidth type="submit">
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>
        {/* FORM BOTTOM LINE */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            {/* FORM BOTTOM TEXT */}
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          {/* FORM BOTTOM ICONS */}
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>

          <div className="flex gap-2 justify-center text-sm py-2 text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "Naw to Messenger?"
                : "Already have an Account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
