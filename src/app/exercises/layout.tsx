interface ExercisesLayoutProps {
  children: React.ReactNode;
}

export default function ExercisesLayout({ children }: ExercisesLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main>{children}</main>
    </div>
  );
}
