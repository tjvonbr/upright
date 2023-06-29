// Main navbar items for dashboard layout

export const navbarItems = {
  mainNavbar: [
    {
      name: "Home",
      href: "/dashboard",
    },
    {
      name: "Exercises",
      href: "/exercises",
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
      name: "Personal Bests",
      href: "/personal-bests",
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
