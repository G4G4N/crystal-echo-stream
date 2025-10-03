import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Music } from "lucide-react";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-music.jpg";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [recentSongs, setRecentSongs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (!user) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchRecentSongs = async () => {
      const { data } = await supabase
        .from("songs")
        .select(`
          *,
          artists (name),
          albums (title, cover_url)
        `)
        .order("created_at", { ascending: false })
        .limit(6);

      if (data) setRecentSongs(data);
    };

    if (user) fetchRecentSongs();
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden mb-16" style={{ height: "400px" }}>
            <img 
              src={heroImage} 
              alt="Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <h1 className="text-5xl md:text-6xl font-semibold mb-4 text-white">
                Experience Music in <span className="text-primary">Hi-Res</span>
              </h1>
              <p className="text-xl text-white/90 mb-6 max-w-2xl">
                Stream millions of songs in studio-quality sound
              </p>
              <Link to="/browse">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Play className="w-5 h-5 mr-2" />
                  Start Listening
                </Button>
              </Link>
            </div>
          </div>

          {/* Recently Added */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Recently Added</h2>
            {recentSongs.length === 0 ? (
              <p className="text-muted-foreground">No songs available yet. Visit the Admin panel to add content.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {recentSongs.map((song) => (
                  <Card key={song.id} className="p-4 bg-card border-border hover:bg-muted/50 cursor-pointer transition-all">
                    {song.albums?.cover_url || song.cover_url ? (
                      <img 
                        src={song.albums?.cover_url || song.cover_url} 
                        alt={song.title} 
                        className="w-full aspect-square rounded object-cover mb-3" 
                      />
                    ) : (
                      <div className="w-full aspect-square rounded bg-primary/20 flex items-center justify-center mb-3">
                        <Music className="w-12 h-12" />
                      </div>
                    )}
                    <p className="font-medium text-sm truncate">{song.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{song.artists?.name}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;