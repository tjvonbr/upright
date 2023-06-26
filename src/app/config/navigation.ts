// Main navbar items for dashboard layout

export const navbarItems = {
  mainNavbar: [
    {
      name: "Home",
      href: "/dashboard",
    },
    {
      name: "Exercises",
      href: "/dashboard/exercises",
    },
    {
      name: "Programs",
      href: "/dashboard/programs",
    },
    {
      name: "Workouts",
      href: "/dashboard/workouts",
    },
    {
      name: "Personal Bests",
      href: "/dashboard/personal-bests",
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
      href: "/dashboard/programs",
    },
    {
      name: "Create Program",
      href: "/dashboard/programs/add-program",
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
