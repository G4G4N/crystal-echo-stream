import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Home, Music, Library, LogOut } from "lucide-react";
import logo from "@/assets/humm-logo.png";

const Navigation = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="humm." className="h-8 w-auto transition-transform group-hover:scale-105" />
          <span className="text-xl font-semibold text-foreground">humm.</span>
        </Link>

        {user && (
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hover:text-primary transition-colors">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="ghost" size="sm" className="hover:text-primary transition-colors">
                <Music className="w-4 h-4 mr-2" />
                Browse
              </Button>
            </Link>
            <Link to="/library">
              <Button variant="ghost" size="sm" className="hover:text-primary transition-colors">
                <Library className="w-4 h-4 mr-2" />
                Library
              </Button>
            </Link>
            <Link to="/player">
              <Button variant="ghost" size="sm" className="hover:text-primary transition-colors">
                Player
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="hover:text-primary transition-colors">
                Admin
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
