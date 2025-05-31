"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { register, verifyOtp } from "../../services/Auth/Auth";
import { toast } from "react-toastify";
import { BackgroundBeams } from "../../components/ui/background-beams";
import Loader from "@/components/Loader";
import NavbarComponent from "../home/navbar";

export default function Page() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!showOtp) {
      // First step: Register
      register(credentials.email, credentials.password)
        .then((response) => {
          if (response.status_code === 200) {
            toast.success("OTP sent to your email!");
            setShowOtp(true);
          } else {
            toast.error(response.message || "Registration failed.");
          }
        })
        .catch((error) => {
          toast.error("Registration failed. Please try again.");
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Second step: Verify OTP
      verifyOtp(credentials.email, credentials.otp, credentials.password)
        .then((response) => {
          if (response.status_code === 201) {
            toast.success("Registration complete! Redirecting... login now");
            router.push("/login"); // or wherever you want
          } else {
            toast.error(response.message || "OTP verification failed.");
          }
        })
        .catch((error) => {
          toast.error("OTP verification failed. Try again.");
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="relative w-full flex items-center justify-center">
            <NavbarComponent />
            {/* xsc,m */}
          </div>
          <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white px-4">
            <div className="w-full max-w-md rounded-xl bg-white/90 dark:bg-neutral-900/60 backdrop-blur border border-neutral-300 dark:border-neutral-700 p-8 shadow-2xl z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-3xl font-bold text-center mb-2">
                  Create Account 🚀
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-center text-sm mb-4">
                  Sign up to get started with your dashboard
                </p>

                <LabelInputContainer>
                  <Label
                    htmlFor="email"
                    className="text-neutral-900 dark:text-white"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                    className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label
                    htmlFor="password"
                    className="text-neutral-900 dark:text-white"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                </LabelInputContainer>

                {showOtp && (
                  <div className="flex flex-col items-center justify-center mt-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white text-center mb-2">
                      Check your email
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-center text-sm max-w-sm mb-6">
                      We’ve sent a One-Time Password (OTP) to your email. Please
                      enter it below to continue.
                    </p>

                    <div className="w-full max-w-xs">
                      <LabelInputContainer>
                        <Label
                          htmlFor="otp"
                          className="text-sm text-neutral-700 dark:text-neutral-300 mb-1"
                        >
                          OTP
                        </Label>
                        <Input
                          id="otp"
                          placeholder="Enter 6-digit code"
                          type="text"
                          maxLength={6}
                          className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                          value={credentials.otp}
                          onChange={(e) =>
                            setCredentials({
                              ...credentials,
                              otp: e.target.value,
                            })
                          }
                        />
                      </LabelInputContainer>
                    </div>
                  </div>
                )}

                <button
                  className="group relative w-full rounded-md bg-gradient-to-br from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-900 px-4 py-2 text-neutral-900 dark:text-white font-semibold shadow-md hover:from-zinc-300 hover:to-zinc-500 dark:hover:from-zinc-600 dark:hover:to-zinc-800 transition duration-300"
                  type="submit"
                >
                  Sign Up &rarr;
                  <BottomGradient />
                </button>

                <p className="text-neutral-600 dark:text-neutral-400 text-center text-sm mt-4">
                  Already have an account?{" "}
                  <span
                    className="text-zinc-800 dark:text-zinc-400 cursor-pointer hover:underline"
                    onClick={() => router.push("/login")}
                  >
                    Log in
                  </span>
                </p>

                <div className="my-6 h-px bg-neutral-300 dark:bg-neutral-700" />

                <div className="space-y-3">
                  <SocialButton
                    icon={<IconBrandGithub />}
                    text="Continue with GitHub"
                  />
                  <SocialButton
                    icon={<IconBrandGoogle />}
                    text="Continue with Google"
                  />
                  <SocialButton
                    icon={<IconBrandLinkedin />}
                    text="Continue with LinkedIn"
                  />
                </div>
              </form>
            </div>
            <BackgroundBeams />
          </div>
        </>
      )}
    </>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
      <span className="absolute inset-x-10 -bottom-px mx-auto w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 blur-sm group-hover:opacity-100 transition duration-500" />
    </>
  );
};

const SocialButton = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <button
      className="flex items-center justify-center gap-3 w-full px-4 py-2 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 transition duration-300 shadow-md"
      type="button"
    >
      <div className="text-xl">{icon}</div>
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};
