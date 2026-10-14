"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useRegister } from "../api/register-user";
import {
  RegisterUserInput,
  registerUserSchema,
} from "../schema/register-schema";
import { Gender, Role } from "../types/enum";

const renderError = (errors: unknown[]) => {
  if (!errors || errors.length === 0) return null;
  return (
    <p className="text-red-500 text-[11px] mt-1">
      {errors
        .map((err) =>
          typeof err === "object" && err !== null
            ? ((err as { message?: string }).message ?? JSON.stringify(err))
            : String(err),
        )
        .join(", ")}
    </p>
  );
};

export default function RegisterForm() {
  const { mutate: register, isPending } = useRegister();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");

  const defaultValues: RegisterUserInput = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: undefined,
    role: Role.TENANT,
  };

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      if (!accepted) return;

      console.log("Raw Form Value:", value);

      register(
        { ...value, phone: value.phone?.trim() || undefined },
        { onSuccess: () => router.push("/login") },
      );
    },
  });

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT FORM SECTION ================= */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED PROPTECH NETWORK
            </span>
            <span className="text-xs text-gray-400 font-medium">
              Bank-Grade 256-Bit TLS
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Get started with Nestora
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Join over 45,000 vetted renters, co-living roommates, and premium
            property managers.
          </p>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl font-medium text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 transition mb-6 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign up with Google
          </button>

          <div className="relative flex py-2 items-center mb-6">
            <div className="grow border-t border-gray-200"></div>
            <span className="shrink mx-4 text-xs text-gray-400 uppercase tracking-wider">
              Or register with email
            </span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTermsError(
                accepted ? "" : "You must accept the terms to continue",
              );
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="firstName"
                validators={{ onChange: registerUserSchema.shape.firstName }}
              >
                {(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Eleanor"
                      autoComplete="given-name"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    {renderError(field.state.meta.errors)}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="lastName"
                validators={{ onChange: registerUserSchema.shape.lastName }}
              >
                {(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Vance"
                      autoComplete="family-name"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    {renderError(field.state.meta.errors)}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="email"
                validators={{ onChange: registerUserSchema.shape.email }}
              >
                {(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="email"
                      placeholder="eleanor@nestora.com"
                      autoComplete="email"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    {renderError(field.state.meta.errors)}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="phone"
                validators={{ onChange: registerUserSchema.shape.phone }}
              >
                {(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Mobile Number
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="tel"
                      placeholder="+1 (555) 382-9014"
                      autoComplete="tel"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    {renderError(field.state.meta.errors)}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Role & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field name="role">
                {(field) => (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label
                        htmlFor={field.name}
                        className="text-xs font-semibold text-gray-700"
                      >
                        I am joining as
                      </label>
                      <span className="text-[10px] text-emerald-600 font-medium">
                        Required
                      </span>
                    </div>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value as Role)
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value={Role.TENANT}>Tenant & Resident</option>
                      <option value={Role.OWNER}>Landlord & Manager</option>
                    </select>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Select your primary account purpose.
                    </p>
                  </div>
                )}
              </form.Field>

              <form.Field name="gender">
                {(field) => (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label
                        htmlFor={field.name}
                        className="text-xs font-semibold text-gray-700"
                      >
                        Gender
                      </label>
                      <span className="text-[10px] text-gray-400">
                        Optional · Roommate match
                      </span>
                    </div>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value === ""
                            ? undefined
                            : (e.target.value as Gender),
                        )
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">Select gender</option>
                      <option value={Gender.MALE}>Male</option>
                      <option value={Gender.FEMALE}>Female</option>
                      <option value={Gender.OTHER}>Other</option>
                    </select>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Used for roommate preference matching.
                    </p>
                  </div>
                )}
              </form.Field>
            </div>

            {/* Password */}
            <form.Field
              name="password"
              validators={{ onChange: registerUserSchema.shape.password }}
            >
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-semibold text-gray-700 mb-1"
                  >
                    Create Secure Password
                  </label>
                  <div className="relative">
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters..."
                      autoComplete="new-password"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {renderError(field.state.meta.errors)}
                  <p className="mt-1 text-[11px] text-gray-400">
                    8+ chars · 1 uppercase · 1 number or symbol
                  </p>
                </div>
              )}
            </form.Field>

            {/* Terms (শুধু UI, API তে যায় না) */}
            <div className="pt-2">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => {
                    setAccepted(e.target.checked);
                    if (e.target.checked) setTermsError("");
                  }}
                  className="mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs text-gray-500">
                  I agree to Nestora&apos;s{" "}
                  <Link href="/terms" className="text-emerald-700 underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-emerald-700 underline">
                    Privacy Policy
                  </Link>
                  , and consent to electronic identity and rental screening.
                </span>
              </label>
              {termsError && (
                <p className="text-red-500 text-[11px] mt-1">{termsError}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#033E2B] hover:bg-[#022c1e] text-white font-medium py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10 disabled:opacity-50 cursor-pointer"
            >
              {isPending
                ? "Processing..."
                : "Create Account & Begin Verification →"}
            </button>

            {/* Mobile এ right side নেই, তাই ছোট trust line */}
            <p className="text-center text-xs text-gray-400 lg:hidden">
              Verified listings · Secure sign up
            </p>

            {/* Sign In link */}
            <div className="text-center pt-2">
              <span className="text-xs text-gray-500">
                Already have a Nestora account?{" "}
              </span>
              <Link
                href="/login"
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                Sign In ↗
              </Link>
            </div>
          </form>
        </div>

        {/* ================= RIGHT SIDE SECTION (শুধু lg তে) ================= */}
        <div className="hidden lg:block lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-emerald-100 shadow-sm bg-white">
            <div className="relative h-56 w-full">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Curated Home"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                ✓ Verified Nestora Space #8842
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 text-base mb-1">
                Curated Homes & Verified Co-living
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Every listing verified with physical site visits and deed
                background checks.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <span className="flex items-center gap-1.5 font-medium text-gray-700">
                  🛡️ 99.4% Fraud-Free Living Guarantee
                </span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-semibold">
                  Zero Scams
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
