import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
    </div>
  );
};

export default Landing;