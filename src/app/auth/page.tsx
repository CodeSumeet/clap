"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { FC, useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface pageProps {}

type Variant = "LOGIN" | "REGISTER";

const page: FC<pageProps> = ({}) => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      axios
        .post("/api/register", data)
        .catch(() => toast.error("Registration failed"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials!");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged In!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  return (
    <div className="h-screen grid place-items-center bg-primary">
      <div className="grid place-items-center">
        <figure>
          <img
            src="/assets/logo.png"
            alt="clap logo"
            className="h-14 sm:h-20 sm:mb-2"
          />
        </figure>
        <h1 className="font-bold text-center text-2xl sm:text-3xl mb-3 sm:mb-6">
          Sign in to your account
        </h1>
        {/*  */}
        <div className="w-full bg-secondary px-4 sm:px-6 py-8 shadow rounded-md sm:rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" space-y-4"
          >
            {variant === "REGISTER" && (
              <Input
                id="name"
                label="Name: "
                type="input"
                placeholder="John Doe"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            )}
            <Input
              id="email"
              label="Email Address: "
              type="email"
              placeholder="john@gmail.com"
              register={register}
              errors={errors}
              disabled={isLoading}
            />

            <Input
              id="password"
              label="Password: "
              type="password"
              placeholder="Password"
              register={register}
              errors={errors}
              disabled={isLoading}
            />

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              onClick={() => {}}
            >
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </form>

          <div className="flex gap-2 justify-center font-medium text-sm mt-6 px-2 text-white">
            <div>
              {variant === "LOGIN"
                ? "New to Clap ?"
                : "Already have an account ?"}
            </div>
            <div
              onClick={toggleVariant}
              className="underline cursor-pointer"
            >
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
