import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const LastfmData = ({ username, apiKey }) => {
  const [lastfmData, updateLastfmData] = useState({});

  const fetchLastfmData = async () => {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${username}&api_key=${apiKey}&limit=1&nowplaying=true&format=json`,
    );
    return res.json();
  };

  const { data, status } = useQuery("lastFM", fetchLastfmData);

  <div className="music-player">
    {status === "error" && <p>Error fetching Lastfm data</p>}
    {status === "loading" && <p>Fetching Lastfm data...</p>}
    {status === "success" && ((data) => updateLastfmData(data))}
  </div>;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch(
  //       `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${username}&api_key=${apiKey}&limit=1&nowplaying=true&format=json`,
  //     )
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         throw new Error("error");
  //       })
  //       .then((data) => updateLastfmData(data))
  //       .catch(() =>
  //         updateLastfmData({
  //           error: "Whoops! Something went wrong with Last.fm",
  //         }),
  //       );
  //   };

  //   fetchData();
  // }, []);

  const buildLastfmData = () => {
    const { error } = lastfmData;
    const track = lastfmData?.recenttracks?.track;

    if (error) {
      return <p>{error}</p>;
    }

    if (!track) {
      return <p>Loading</p>;
    }

    const [{ name: songName, artist: { "#text": artistName } = {} } = {}] =
      track;

    return (
      <h3>
        Currently listening to: {songName} by {artistName}
      </h3>
    );
  };
  return buildLastfmData();
};

export default LastfmData;
