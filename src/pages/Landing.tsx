import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

const Landing = () => {
  return (
    <div className="min-h-screen text-foreground" style={{
      background: 'linear-gradient(180deg, #001731 0%, #002B5E 100%)'
    }}>
      <Header />
      <Hero />
      <Features />
    </div>
  );
};

export default Landing;