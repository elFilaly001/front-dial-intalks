"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import InputWithLabel from "@/components/ui/input-with-label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PhoneNumber from "../ui/phone-number";
import CountrySelect from "../ui/CountrySelect";
import SelectLanguage from "../ui/SelectLanguage";

function FormRegister({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      country: "MA",
      language: "en",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
      phone: Yup.string().required("Phone number is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      console.log(values);
      try {
        // API call to register user here
        router.push("/");
      } catch (error) {
        console.error(error);
        setErrors({ email: "Invalid email or password" });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader>
          <div className="flex flex-col py-5 ">
            <h2 className="text-3xl font-semibold">Sign up to InTalks! 👋🏻</h2>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <InputWithLabel
                  label="First Name"
                  placeHolder="First Name"
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.errors.firstName}
                />
                <InputWithLabel
                  label="Last Name"
                  placeHolder="Last Name"
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.errors.lastName}
                />
              </div>

              <InputWithLabel
                label="Email"
                placeHolder="m@example.com"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
              />

              <PhoneNumber
                label="Phone"
                value={formik.values.phone}
                onChange={(value) => formik.setFieldValue("phone", value)}
                error={formik.errors.phone}
              />

              <div className="grid grid-cols-2 gap-4">
                <CountrySelect
                  value={formik.values.country}
                  onChange={(value) => formik.setFieldValue("country", value)}
                  error={formik.errors.country}
                />
                <SelectLanguage />
              </div>

              <InputWithLabel
                label="Password"
                placeHolder="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
              />

              <InputWithLabel
                label="Password Confirmation"
                placeHolder="Password Confirmation"
                name="password_confirmation"
                type="password"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                error={formik.errors.password_confirmation}
              />

              <Button
                type="submit"
                className="bg-main h-auto grow hover:bg-transparent hover:text-main border border-main transition-all ease-in-out duration-300 flex items-center justify-center gap-2"
              >
                Create account for Free
                <ArrowRight />
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-2 text-gray-600 text-xs my-3">
            <span className="flex-1 bg-gray-400 h-[0.5px]"></span>
            Or
            <span className="flex-1 bg-gray-400 h-[0.5px]"></span>
          </div>

          <Button
            onClick={() => {
              // signIn("google");
            }}
            className="w-full bg-transparent border text-black border-gray-200 hover:bg-gray-200/40 flex items-center justify-center gap-2"
          >
            <Image src="/auth/google.png" alt="Logo" width={20} height={20} />
            Register with Google
          </Button>
        </CardContent>
      </Card>

      <div className="text-sm text-center flex justify-center items-center gap-1">
        You already have an account?
        <Link
          href="/login"
          className="group text-main flex items-center gap-1.5 hover:text-main/80 transition-colors duration-300"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default FormRegister;
