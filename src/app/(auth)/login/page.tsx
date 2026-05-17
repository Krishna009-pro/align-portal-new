"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/goals");
  };

  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Side: Brand Identity */}
      <section className="relative flex w-full flex-col justify-between bg-primary-container p-page-padding md:w-1/2 md:p-16">
        <div className="z-10 flex flex-col space-y-8">
          {/* Brand Anchor */}
          <div className="space-y-2">
            <h1 className="text-[48px] font-black leading-tight tracking-tighter text-on-primary">
              Align
            </h1>
            <p className="font-headline-md text-headline-md text-on-primary/90">
              Align every goal. Track every outcome.
            </p>
          </div>
          {/* Feature List */}
          <ul className="space-y-6 pt-8">
            <li className="flex items-start gap-4">
              <span
                className="material-symbols-outlined mt-1 text-on-primary"
                data-icon="check_circle"
              >
                check_circle
              </span>
              <span className="font-body-md text-body-md text-on-primary">
                Set and track goals with full transparency
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span
                className="material-symbols-outlined mt-1 text-on-primary"
                data-icon="check_circle"
              >
                check_circle
              </span>
              <span className="font-body-md text-body-md text-on-primary">
                Manager approvals with one click
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span
                className="material-symbols-outlined mt-1 text-on-primary"
                data-icon="check_circle"
              >
                check_circle
              </span>
              <span className="font-body-md text-body-md text-on-primary">
                Real-time quarterly check-ins
              </span>
            </li>
          </ul>
        </div>
        {/* Left Footer */}
        <div className="z-10 mt-auto pt-12">
          <p className="font-label-md text-label-md text-on-primary/50 uppercase tracking-widest">
            AtomQuest Hackathon 1.0
          </p>
        </div>
      </section>

      {/* Right Side: Authentication */}
      <section className="flex w-full flex-col items-center justify-center bg-surface p-page-padding md:w-1/2">
        <div className="w-full max-w-[420px] space-y-8">
          {/* Header */}
          <div className="text-center md:text-left">
            <h2 className="text-[24px] font-bold tracking-tight text-on-surface">
              Welcome back
            </h2>
            <p className="font-body-md text-body-md text-secondary mt-1">
              Sign in to your Align account
            </p>
          </div>
          {/* Auth Form */}
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  className="font-label-md text-label-md text-on-surface-variant"
                  htmlFor="email"
                >
                  Work Email
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  id="email"
                  placeholder="you@company.com"
                  type="email"
                />
              </div>
              {/* Password Field */}
              <div className="space-y-1.5 relative">
                <div className="flex items-center justify-between">
                  <label
                    className="font-label-md text-label-md text-on-surface-variant"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    className="font-label-md text-label-md text-primary hover:underline"
                    href="#"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    id="password"
                    type="password"
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined"
                      data-icon="visibility"
                    >
                      visibility
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* Sign In Action */}
            <button
              className="w-full rounded-lg bg-primary-container py-3.5 font-label-md text-on-primary transition-all hover:opacity-90 active:scale-[0.98]"
              type="submit"
            >
              Sign In
            </button>
          </form>
          {/* Divider */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="mx-4 flex-shrink font-label-sm text-label-sm text-outline uppercase tracking-wider">
              or continue as
            </span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>
          {/* Quick Access / Demos */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              onClick={() => router.push("/goals")}
              className="flex items-center justify-center rounded-lg border border-outline-variant bg-white px-3 py-2.5 font-label-md text-label-md text-secondary transition-all hover:bg-surface-container-low hover:text-primary"
            >
              Employee Demo
            </button>
            <button
              onClick={() => router.push("/team")}
              className="flex items-center justify-center rounded-lg border border-outline-variant bg-white px-3 py-2.5 font-label-md text-label-md text-secondary transition-all hover:bg-surface-container-low hover:text-primary"
            >
              Manager Demo
            </button>
            <button
              onClick={() => router.push("/goals")}
              className="flex items-center justify-center rounded-lg border border-outline-variant bg-white px-3 py-2.5 font-label-md text-label-md text-secondary transition-all hover:bg-surface-container-low hover:text-primary"
            >
              Admin Demo
            </button>
          </div>
        </div>
        {/* Right Footer */}
        <footer className="mt-20 md:mt-32">
          <p className="font-label-sm text-label-sm text-outline">
            Powered by Align Portal v1.0
          </p>
        </footer>
      </section>
    </main>
  );
}

