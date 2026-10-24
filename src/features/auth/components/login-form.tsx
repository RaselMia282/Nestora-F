"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  CheckCircle2,
  Award,
} from "lucide-react";
import { useLogin } from "../api/login-user";
import { useRouter } from "next/navigation";
import { LoginUserInput, loginUserSchema } from "../schema/login-schema";
import { Role } from "../types/enum";
import { useForm } from "@tanstack/react-form";
import { useAuthStore } from "@/src/store/auth-store";

export default function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();

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

  const defaultValues: LoginUserInput = {
    email: "",
    password: "",
    role: Role.TENANT,
  };

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      console.log("Login Raw Value:", value);

      login(
        {
          ...value,
          email: value.email?.trim().toLowerCase(),
        },

        {
          onSuccess: (res) => {
            console.log("Full Api Response", res);

            setUser(res.data.user);
            router.push("/");
          },
        },
      );
    },
  });

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* ================= LEFT FORM SECTION ================= */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-emerald-100 flex flex-col justify-between">
          <div>
            {/* Top Badge & Title */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> SECURE PORTAL
              </span>
              <span className="text-xs text-gray-400 font-medium">
                256-Bit TLS Encrypted
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Welcome back to Nestora
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Access your verified rental passport, active leases, and
              application pipelines.
            </p>

            {/* Google Button */}
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
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative flex py-2 items-center mb-6">
              <div className="grow border-t border-gray-200"></div>
              <span className="shrink mx-4 text-xs text-gray-400 uppercase tracking-wider">
                Or sign in with email
              </span>
              <div className="grow border-t border-gray-200"></div>
            </div>

            {/* Form */}
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              {/* 1. Log in as (Role Selection) */}
              <form.Field name="role">
                {(field) => (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-gray-700">
                        Log in as
                      </label>
                      <span className="text-[10px] text-emerald-600 font-medium">
                        Required
                      </span>
                    </div>
                    <select
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value as Role)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value={Role.TENANT}>Tenant</option>
                      <option value={Role.OWNER}>Owner</option>
                      <option value={Role.ADMIN}>Admin</option>
                    </select>
                    {renderError(field.state.meta.errors)}
                  </div>
                )}
              </form.Field>

              {/* 2. Email Address */}
              <form.Field
                name="email"
                validators={{ onChange: loginUserSchema.shape.email }}
              >
                {(field) => (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Work or Personal Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="email"
                        placeholder="resident@example.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    {renderError(field.state.meta.errors)}
                  </div>
                )}
              </form.Field>

              {/* 3. Password */}
              <form.Field
                name="password"
                validators={{ onChange: loginUserSchema.shape.password }}
              >
                {(field) => (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-gray-700">
                        Account Password
                      </label>
                      <a
                        href="#"
                        className="text-xs text-emerald-600 hover:underline font-medium"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {renderError(field.state.meta.errors)}
                  </div>
                )}
              </form.Field>

              {/* Remember Checkbox */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-xs text-gray-500 cursor-pointer"
                >
                  Remember this trusted device for 30 days. Requires step-up 2FA
                  for lease execution.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#033E2B] hover:bg-[#022c1e] text-white font-medium py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10 cursor-pointer disabled:opacity-50"
              >
                {isPending ? "Signing in..." : "Sign In to Dashboard →"}
              </button>
            </form>
          </div>

          {/* Footer Sign Up Link */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6 text-xs">
            <span className="text-gray-500">
              New to Nestora?{" "}
              <a
                href="/register"
                className="font-semibold text-emerald-700 hover:underline"
              >
                Create a free verified account
              </a>
            </span>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              Sign-in troubles?
            </a>
          </div>
        </div>

        {/* ================= RIGHT SIDE SECTION (Hidden on Mobile) ================= */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 bg-[#033E2B] text-white rounded-3xl relative overflow-hidden">
          {/* Top Badge */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-800/60 text-emerald-300 border border-emerald-700/50 mb-6">
              <Award className="w-3.5 h-3.5" /> Reusable Proptech Passport
            </span>

            <h2 className="text-2xl font-bold mb-3 leading-snug">
              One Passport. Zero Repeat Application Fees.
            </h2>
            <p className="text-xs text-emerald-100/80 leading-relaxed mb-8">
              Your identity, credit snapshot, and background verification travel
              with you across thousands of luxury lofts and multi-family
              communities.
            </p>

            {/* Passport Preview Card */}
            <div className="bg-white text-gray-900 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-sm">
                    ER
                  </div>
                  <div>
                    <h4 className="font-bold text-xs flex items-center gap-1">
                      Elena Rostova{" "}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      Verified Resident · Seattle, WA
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    TIER 1
                  </span>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    100% Trust Score
                  </p>
                </div>
              </div>

              {/* Status Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-xl">
                  <p className="font-semibold text-gray-700">Persona KYC</p>
                  <p className="text-emerald-600">Verified ID</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-xl">
                  <p className="font-semibold text-gray-700">Plaid Linked</p>
                  <p className="text-emerald-600">Income Verified</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-xl">
                  <p className="font-semibold text-gray-700">Soft Check</p>
                  <p className="text-emerald-600">760+ Score</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                <span className="text-gray-400">
                  Lease Pre-Approval Readiness
                </span>
                <span className="font-bold text-emerald-700">
                  Instant Guarantee
                </span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="mt-6 p-4 rounded-xl bg-emerald-900/40 border border-emerald-700/40 text-xs italic text-emerald-100">
              “Saved me over $200 in application fees and let me e-sign my lease
              in 4 minutes with my roommates.”
              <span className="block mt-2 not-italic font-semibold text-white">
                — Elena R. (Seattle)
              </span>
            </blockquote>
          </div>

          {/* Compliance Footer */}
          <div className="flex justify-between items-center pt-6 text-[11px] text-emerald-300/70 border-t border-emerald-800/60">
            <span>🛡️ SOC2 Type II</span>
            <span>🏛️ Fair Housing Act</span>
            <span>🔒 ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
}