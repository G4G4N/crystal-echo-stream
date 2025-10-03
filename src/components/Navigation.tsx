import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/humm-logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="humm." className="h-8 w-auto transition-transform group-hover:scale-105" />
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/player">
            <Button variant="ghost" className="hover:text-primary transition-colors">
              Player
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="ghost" className="hover:text-primary transition-colors">
              Admin
            </Button>
          </Link>
          <Link to="/payment">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--glow-primary)] transition-all">
              Subscribe
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
