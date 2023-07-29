import "semantic-ui-css/semantic.min.css";

import {
  ActivitySquare,
  Bot,
  Medal,
  ScrollText,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { links } from "@/config/siteConfig";

import { buttonVariants } from "../components/common/button";

export default function Index() {
  return (
    <>
      <section className="py-64 flex flex-col items-center">
        <div className="max-w-[64rem] text-center">
          <div className="space-x-4">
            <Link
              className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 transition-colors rounded-2xl text-sm font-medium text-black hover:text-black"
              href={links.social.github}
              target="_blank"
            >
              Check out my Github
            </Link>
            <Link
              className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 transition-colors rounded-2xl text-sm font-medium text-black hover:text-black"
              href={links.social.linkedin}
              target="_blank"
            >
              Connect on LinkedIn
            </Link>
          </div>
          <h1 className="text-4xl">
            A fitness app that remembers what you lifted <em>last</em> time so
            you can lift more <em>this</em> time
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
      <section className="py-36 flex flex-col items-center bg-slate-50">
        <div className="max-w-[64rem] text-center">
          <h2 className="text-3xl">Features</h2>
          <p className="text-2xl text-slate-500">
            Arrive to the gym with a plan and leave with a sense of
            accomplishment. Here is what Upright has to offer:
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-[180px] p-3 flex flex-col items-center space-y-4 border border-slate-200 rounded-md bg-white">
              <Medal color="black" size={50} />
              <p className="text-xl text-black font-semibold">Personal Bests</p>
              <p className="text-slate-500">
                Automatically record your personal bests for any workout
              </p>
            </div>
            <div className="h-[180px] p-3 flex flex-col items-center space-y-4 border border-slate-200 rounded-md bg-white">
              <ScrollText color="black" size={50} />
              <p className="text-xl text-black font-semibold">
                Historical Data
              </p>
              <p className="text-slate-500">
                Access to all of your past workouts at your fingertips
              </p>
            </div>
            <div className="h-[180px] p-3 flex flex-col items-center space-y-4 border border-slate-200 rounded-md bg-white">
              <Trophy color="black" size={50} />
              <p className="text-xl text-black font-semibold">
                Personalized Reports
              </p>
              <p className="text-slate-500">
                Generated reports after completing a program
              </p>
            </div>
            <div className="h-[180px] p-3 flex flex-col items-center space-y-4 border border-slate-200 rounded-md bg-white">
              <Bot color="black" size={50} />
              <p className="text-xl text-black font-semibold">
                Virtual Spotter
              </p>
              <p className="text-slate-500">
                Access to all of your previous workouts to push you harder
                during your current set
              </p>
            </div>
            <div className="h-[180px] p-3 flex flex-col items-center space-y-4 border border-slate-200 rounded-md bg-white">
              <ActivitySquare color="black" size={50} />
              <p className="text-xl text-black font-semibold">
                Health & Performance Metrics
              </p>
              <p className="text-slate-500">
                Monitor your health and fitness markers over time
              </p>
            </div>
            <div className="h-[180px] p-3 flex flex-col items-center space-y-4 border border-slate-200 rounded-md bg-white">
              <Users color="black" size={50} />
              <p className="text-xl text-black font-semibold">
                Community Engagement
              </p>
              <p className="text-slate-500">
                Compete with or cheer on your friends and family
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
