import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Music } from "lucide-react";

const Browse = () => {
  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const { data } = await supabase
        .from("songs")
        .select(`
          *,
          artists (name),
          albums (title, cover_url)
        `)
        .order("created_at", { ascending: false })
        .limit(50);

      if (data) setSongs(data);
    };

    fetchSongs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Browse</h1>
          
          <div className="space-y-2">
            {songs.length === 0 ? (
              <p className="text-muted-foreground">No songs available yet</p>
            ) : (
              songs.map((song) => (
                <Card key={song.id} className="p-4 bg-card border-border hover:bg-muted/50 cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    {song.albums?.cover_url || song.cover_url ? (
                      <img 
                        src={song.albums?.cover_url || song.cover_url} 
                        alt={song.title} 
                        className="w-14 h-14 rounded object-cover" 
                      />
                    ) : (
                      <div className="w-14 h-14 rounded bg-primary/20 flex items-center justify-center">
                        <Music className="w-7 h-7" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-muted-foreground">{song.artists?.name}</p>
                    </div>
                    {song.hi_res && (
                      <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">Hi-Res</span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;