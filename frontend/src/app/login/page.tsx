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
import { login } from "../../services/Auth/Auth";
import { toast } from "react-toastify";
import { BackgroundBeams } from "../../components/ui/background-beams";
import Loader from "@/components/Loader";
import NavbarComponent from "../home/navbar";

export default function Page() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (credentials.email === "") {
        toast.error("Please enter your email address.");
        return;
      }
      if (credentials.password === "") {
        toast.error("Please enter your password.");
        return;
      }

      setIsLoading(true);
      login(credentials.email, credentials.password)
        .then((response) => {
          if (response.status_code === 200) {
            toast.success("Login successful! Redirecting...");
            localStorage.setItem("token", response.data.token);
            router.push("/home");
          } else {
            toast.error("Login failed. Please check your credentials.");
          }
        })
        .catch((error) => {
          toast.error("Login failed. Please check your credentials.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
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
        <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 text-black dark:text-white px-4">
          <div className="w-full max-w-md rounded-xl bg-neutral-100 dark:bg-neutral-900/60 backdrop-blur border border-neutral-300 dark:border-neutral-700 p-8 shadow-2xl z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-2">
                Welcome Back 👋
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-center text-sm mb-4">
                Log in to access your dashboard
              </p>

              <LabelInputContainer>
                <Label htmlFor="email" className="text-black dark:text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                  className="bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white placeholder-neutral-500"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label
                  htmlFor="password"
                  className="text-black dark:text-white"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  className="bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white placeholder-neutral-500"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </LabelInputContainer>

              <button
                className="group relative w-full rounded-md bg-gradient-to-br from-zinc-300 to-zinc-500 dark:from-zinc-700 dark:to-zinc-900 px-4 py-2 text-black dark:text-white font-semibold shadow-md hover:from-zinc-200 hover:to-zinc-400 dark:hover:from-zinc-600 dark:hover:to-zinc-800 transition duration-300"
                type="submit"
              >
                Log In &rarr;
                <BottomGradient />
              </button>

              <p className="text-neutral-600 dark:text-neutral-400 text-center text-sm mt-4">
                Don't have an account?{" "}
                <span
                  className="text-blue-600 dark:text-neutral-300 cursor-pointer"
                  onClick={() => router.push("/signup")}
                >
                  Sign up
                </span>
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-center text-sm mt-4">
                Forget Your Password?{" "}
                <span
                  className="text-blue-600 dark:text-neutral-300 cursor-pointer"
                  onClick={() => router.push("/signup")}
                >
                  Reset now
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
        </div></>
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
      className="flex items-center justify-center gap-3 w-full px-4 py-2 rounded-md bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 transition duration-300 shadow-md"
      type="button"
    >
      <div className="text-xl">{icon}</div>
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};
