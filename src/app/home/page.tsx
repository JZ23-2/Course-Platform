import Navbar from "@/components/ui/navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to Course Platform</h1>
        <p className="text-muted-foreground">
          Explore courses, manage your profile, and enjoy learning!
        </p>
      </main>
    </div>
  );
}
