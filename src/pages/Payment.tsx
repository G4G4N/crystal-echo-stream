import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Payment = () => {
  const plans = [
    {
      name: "Basic",
      price: "9.99",
      features: [
        "Standard quality streaming",
        "Ad-free experience",
        "Unlimited skips",
        "Offline mode"
      ],
      gradient: "from-primary/20 to-secondary/20",
      buttonGradient: "from-primary to-secondary"
    },
    {
      name: "Premium",
      price: "14.99",
      features: [
        "Hi-Res streaming",
        "All Basic features",
        "Exclusive releases",
        "Priority support",
        "Multi-device sync"
      ],
      gradient: "from-secondary/20 to-accent/20",
      buttonGradient: "from-secondary to-accent",
      popular: true
    },
    {
      name: "Ultimate",
      price: "24.99",
      features: [
        "Ultra Hi-Res streaming",
        "All Premium features",
        "Studio master quality",
        "Advanced EQ controls",
        "Spatial audio",
        "Early access"
      ],
      gradient: "from-accent/20 to-primary/20",
      buttonGradient: "from-accent to-primary"
    }
  ];

  const handleSubscribe = (planName: string) => {
    toast.success(`Selected ${planName} plan! Redirecting to checkout...`);
  };

  return (
    <div className="min-h-screen bg-background p-6 font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-6xl font-bold font-orbitron mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground">Experience music in the highest resolution</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative bg-card border-border backdrop-blur-lg p-8 transition-all hover:scale-105 animate-slide-up ${
                plan.popular ? "border-primary border-2 shadow-[var(--glow-primary)]" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6`}>
                <span className="text-3xl">🎵</span>
              </div>

              <h3 className="text-2xl font-bold font-orbitron mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold font-orbitron bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ${plan.price}
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSubscribe(plan.name)}
                className={`w-full bg-gradient-to-r ${plan.buttonGradient} hover:shadow-[var(--glow-primary)] transition-all font-semibold`}
              >
                Subscribe Now
              </Button>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border backdrop-blur-lg p-8 animate-slide-up">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">🎧</div>
              <h4 className="font-bold font-orbitron mb-2">Hi-Res Quality</h4>
              <p className="text-sm text-muted-foreground">Experience studio-master quality with lossless FLAC streaming</p>
            </div>
            <div>
              <div className="text-4xl mb-2">⚡</div>
              <h4 className="font-bold font-orbitron mb-2">Instant Access</h4>
              <p className="text-sm text-muted-foreground">Start streaming immediately after subscription</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🔒</div>
              <h4 className="font-bold font-orbitron mb-2">Cancel Anytime</h4>
              <p className="text-sm text-muted-foreground">No contracts, cancel your subscription anytime</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
