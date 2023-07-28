import "semantic-ui-css/semantic.min.css";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { links } from "@/config/siteConfig";

import { buttonVariants } from "../components/common/Button";

export default function Index() {
  return (
    <section className="h-full w-full py-32 flex flex-col items-center">
      <div className="max-w-[64rem] flex flex-col items-center text-center">
        <div className="space-x-4">
          <Link
            className="px-4 py-1.5 bg-slate-200 rounded-2xl text-sm font-medium text-black hover:text-black"
            href={links.social.github}
            target="_blank"
          >
            Check out my Github
          </Link>
          <Link
            className="px-4 py-1.5 bg-slate-200 rounded-2xl text-sm font-medium text-black hover:text-black"
            href={links.social.linkedin}
            target="_blank"
          >
            Let&apos;s connect
          </Link>
        </div>
        <h1 className="text-3xl">
          A fitness app that remembers what you lifted <em>last</em> time so you
          can lift more <em>this</em> time
        </h1>
        <p className="text-2xl text-slate-500">
          An open-source fitness tracker built with Next.js 13
        </p>
        <div className="space-x-4">
          <Link
            className={twMerge(buttonVariants({ variant: "primary" }))}
            href="/register"
          >
            Sign up
          </Link>
          <Link
            className={twMerge(buttonVariants({ variant: "outline" }))}
            href={links.social.repo}
          >
            See Github repo
          </Link>
        </div>
      </div>
    </section>
  );
}
