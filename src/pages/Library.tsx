import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Disc, User } from "lucide-react";

const Library = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch saved songs
      const { data: librarySongs } = await supabase
        .from("user_library")
        .select(`
          song_id,
          songs (
            id,
            title,
            duration,
            cover_url,
            hi_res,
            artists (name)
          )
        `)
        .eq("user_id", user.id);

      if (librarySongs) setSongs(librarySongs.map(item => item.songs));

      // Fetch saved albums
      const { data: savedAlbums } = await supabase
        .from("user_saved_albums")
        .select(`
          album_id,
          albums (
            id,
            title,
            cover_url,
            artists (name)
          )
        `)
        .eq("user_id", user.id);

      if (savedAlbums) setAlbums(savedAlbums.map(item => item.albums));

      // Fetch followed artists
      const { data: following } = await supabase
        .from("user_following_artists")
        .select(`
          artist_id,
          artists (
            id,
            name,
            image_url
          )
        `)
        .eq("user_id", user.id);

      if (following) setArtists(following.map(item => item.artists));
    };

    fetchLibrary();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Your Library</h1>

          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="songs">
                <Music className="w-4 h-4 mr-2" />
                Songs
              </TabsTrigger>
              <TabsTrigger value="albums">
                <Disc className="w-4 h-4 mr-2" />
                Albums
              </TabsTrigger>
              <TabsTrigger value="artists">
                <User className="w-4 h-4 mr-2" />
                Artists
              </TabsTrigger>
            </TabsList>

            <TabsContent value="songs" className="space-y-2">
              {songs.length === 0 ? (
                <p className="text-muted-foreground">No saved songs yet</p>
              ) : (
                songs.map((song: any) => (
                  <Card key={song.id} className="p-4 bg-card border-border hover:bg-muted/50 cursor-pointer transition-all">
                    <div className="flex items-center gap-4">
                      {song.cover_url ? (
                        <img src={song.cover_url} alt={song.title} className="w-12 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center">
                          <Music className="w-6 h-6" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{song.title}</p>
                        <p className="text-sm text-muted-foreground">{song.artists?.name}</p>
                      </div>
                      {song.hi_res && (
                        <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">Hi-Res</span>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="albums" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {albums.length === 0 ? (
                <p className="text-muted-foreground col-span-full">No saved albums yet</p>
              ) : (
                albums.map((album: any) => (
                  <Card key={album.id} className="p-4 bg-card border-border hover:bg-muted/50 cursor-pointer transition-all">
                    {album.cover_url ? (
                      <img src={album.cover_url} alt={album.title} className="w-full aspect-square rounded object-cover mb-3" />
                    ) : (
                      <div className="w-full aspect-square rounded bg-primary/20 flex items-center justify-center mb-3">
                        <Disc className="w-12 h-12" />
                      </div>
                    )}
                    <p className="font-medium text-sm truncate">{album.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{album.artists?.name}</p>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="artists" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {artists.length === 0 ? (
                <p className="text-muted-foreground col-span-full">No followed artists yet</p>
              ) : (
                artists.map((artist: any) => (
                  <Card key={artist.id} className="p-4 bg-card border-border hover:bg-muted/50 cursor-pointer transition-all">
                    {artist.image_url ? (
                      <img src={artist.image_url} alt={artist.name} className="w-full aspect-square rounded-full object-cover mb-3" />
                    ) : (
                      <div className="w-full aspect-square rounded-full bg-primary/20 flex items-center justify-center mb-3">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                    <p className="font-medium text-sm truncate text-center">{artist.name}</p>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Library;