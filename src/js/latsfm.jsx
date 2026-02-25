export const fetchRecentTracks = async (limit = 10) => {
  const API_KEY = import.meta.env.LASTFM_API_KEY;
  const USERNAME = "meufshlag";

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=${limit}`,
    );

    const data = await response.json();
    return data.recenttracks?.track || [];
  } catch (error) {
    console.error("Error fetching Last.fm data:", error);
    return [];
  }
};

const processTrackData = (tracks) => {
  return tracks.map((track) => ({
    name: track.name,
    artist: track.artist["#text"] || track.artist.name,
    album: track.album["#text"],    
    image: track.image[3]["#text"], // Large image size
    url: track.url,
    date: track.date ? track.date["#text"] : "Now Playing",
    isNowPlaying: track["@attr"]?.nowplaying === "true",
  }));
};
