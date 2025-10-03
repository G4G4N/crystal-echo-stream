import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Zap, Shield, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-music.jpg";

const Index = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Ultra Hi-Res",
      description: "Stream music in lossless FLAC quality up to 192kHz/24bit"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Crystal Clear",
      description: "Experience every detail with studio-master audio quality"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Premium Library",
      description: "Access millions of tracks in the highest resolution"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm font-semibold text-primary">Hi-Res Audio Streaming</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold font-orbitron leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Hear Music
                </span>
                <br />
                Like Never Before
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Experience studio-quality sound with our revolutionary Hi-Res streaming platform. 
                Every note, every detail, perfectly preserved.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/player">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--glow-primary)] transition-all text-lg px-8 py-6 font-semibold">
                    <Play className="w-5 h-5 mr-2" />
                    Start Listening
                  </Button>
                </Link>
                <Link to="/payment">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6 font-semibold">
                    View Plans
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-3xl opacity-30 animate-glow-pulse"></div>
              <img
                src={heroImage}
                alt="Futuristic music streaming interface"
                className="relative rounded-3xl border border-primary/30 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold font-orbitron mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Why Choose Hi-Res?
          </h2>
          <p className="text-xl text-muted-foreground">Uncompromised audio quality for true music lovers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="bg-card border-border backdrop-blur-lg p-8 hover:border-primary/50 transition-all animate-slide-up hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold font-orbitron mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/30 backdrop-blur-lg p-12 text-center animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold font-orbitron mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Ready to Experience Premium Sound?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of audiophiles streaming in the highest quality available
          </p>
          <Link to="/payment">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--glow-primary)] transition-all text-lg px-8 py-6 font-semibold">
              Get Started Today
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Index;
