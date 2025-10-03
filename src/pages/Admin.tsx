import { useState, useEffect } from "react";
import { Upload, Music, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState<any[]>([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (!user) {
        navigate("/auth");
        return;
      }

      // Check if user is admin
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      setIsAdmin(!!roles);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchArtists = async () => {
      const { data } = await supabase
        .from("artists")
        .select("*")
        .order("name");
      if (data) setArtists(data);
    };
    
    if (isAdmin) fetchArtists();
  }, [isAdmin]);

  const handleAddArtist = async () => {
    if (!artistName.trim()) {
      toast.error("Please enter artist name");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase
      .from("artists")
      .insert({ name: artistName });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Artist added successfully!");
      setArtistName("");
      // Refresh artists list
      const { data } = await supabase.from("artists").select("*").order("name");
      if (data) setArtists(data);
    }
    setIsLoading(false);
  };

  const handleAddSong = async () => {
    if (!songTitle.trim() || !selectedArtist || !duration) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // Parse duration (expecting format like "3:45")
      const [mins, secs] = duration.split(":").map(Number);
      const totalSeconds = mins * 60 + secs;

      const { error } = await supabase
        .from("songs")
        .insert({
          title: songTitle,
          artist_id: selectedArtist,
          duration: totalSeconds,
          hi_res: true
        });

      if (error) throw error;

      toast.success("Song added successfully!");
      setSongTitle("");
      setDuration("");
      setSelectedArtist("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 bg-card border-border max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            You need admin privileges to access this page.
          </p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-semibold mb-8">Admin Panel</h1>

          <div className="grid gap-6">
            {/* Add Artist */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <Plus className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Add Artist</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="artistName">Artist Name</Label>
                  <Input
                    id="artistName"
                    placeholder="Enter artist name"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddArtist} disabled={isLoading}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Artist
                </Button>
              </div>
            </Card>

            {/* Add Song */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <Music className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Add Song</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="songTitle">Song Title</Label>
                  <Input
                    id="songTitle"
                    placeholder="Enter song title"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="artist">Artist</Label>
                  <select
                    id="artist"
                    value={selectedArtist}
                    onChange={(e) => setSelectedArtist(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md"
                  >
                    <option value="">Select an artist</option>
                    {artists.map((artist) => (
                      <option key={artist.id} value={artist.id}>
                        {artist.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration (mm:ss)</Label>
                  <Input
                    id="duration"
                    placeholder="3:45"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddSong} disabled={isLoading}>
                  <Upload className="w-4 h-4 mr-2" />
                  Add Song
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;