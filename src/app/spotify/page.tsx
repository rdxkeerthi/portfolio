import type { Metadata } from "next";
import SpotifyView from "./spotify-view";

export const metadata: Metadata = {
  title: "Spotify & Soundtracks | Keerthivasan M",
  description:
    "Curated Spotify playlists and soundscapes fueling malware research, incident response, and deep coding flow sessions.",
  keywords: [
    "Spotify Playlist",
    "Coding Music",
    "Cybersecurity Soundtracks",
    "Synthwave",
    "Lo-Fi",
    "Focus Music",
    "Keerthivasan M",
  ],
};

export default function SpotifyPage() {
  return <SpotifyView />;
}
