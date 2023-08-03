// Main navbar items for dashboard layout

export interface NavbarItem {
  name: string;
  href: string;
}

export const navbarItems = {
  mainNavbar: [
    {
      name: "Features",
      href: "/#features",
    },
  ],
  dashboard: [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Programs",
      href: "/programs",
    },
    {
      name: "Workouts",
      href: "/workouts",
    },
    {
      name: "Exercises",
      href: "/exercises",
    },
  ],
};

export const subNavbarItems = {
  exercises: [
    {
      name: "Overview",
      href: "/dashboard/exercises",
    },
    {
      name: "Create Exercise",
      href: "/dashboard/exercises/add-exercise",
    },
  ],
  programs: [
    {
      name: "Overview",
      href: "/programs",
    },
    {
      name: "Create Program",
      href: "/programs/add-program",
    },
  ],
  workouts: [
    {
      name: "Overview",
      href: "/dashboard/workouts",
    },
    {
      name: "Create Workout",
      href: "/dashboard/workouts/add-workout",
    },
  ],
};
