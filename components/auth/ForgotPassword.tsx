"use client";

import { Button } from "@/components/ui/button";
import InputWithLabel from "@/components/ui/input-with-label";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function ForgotPassword() {
  const [step, setStep] = useState<number>(0);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address est requis"),
    }),
    onSubmit: async (values, { setErrors }) => {
      console.log(values);
      try {
        setStep(1);
      } catch (error) {
        console.error(error);
        setErrors({ email: "Adresse e-mail ou mot de passe invalide." });
      }
    },
  });

  switch (step) {
    case 0:
      return (
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-6">
            <InputWithLabel
              label="Email"
              placeHolder="m@example.com"
              name="email"
              type="email"
              className=""
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />

            <Link
              href={"/login"}
              className="group text-xs text-end text-main flex justify-end items-center gap-3.5  hover:text-white/80 transition-colors duration-300"
            >
              <span className="group-hover:text-main relative pb-1 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-main group-hover:after:w-full after:transition-all after:duration-300">
                Sign in
              </span>
            </Link>

            <Button
              type="submit"
              className="bg-main h-auto grow hover:bg-transparent hover:text-main border border-main transition-all ease-in-out duration-300"
            >
              Reset my password
              <ArrowRight />
            </Button>
          </div>
        </form>
      );
    case 1:
      return (
        <div>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      );
    default:
      break;
  }
}

export default ForgotPassword;
