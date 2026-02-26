import React, { useState, useEffect } from "react";

const LastFMData = ({ username, apiKey }) => {
  const [lastfmData, updateLastfmData] = useState({});
  useEffect(() => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${username}&api_key=${apiKey}&limit=1&nowplaying=true&format=json`,
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("error");
      })
      .then((data) => updateLastfmData(data))
      .catch(() =>
        updateLastfmData({
          error: "Whoops! Something went wrong with Last.fm",
        }),
      );
  }, []);

  const buildLastFmData = () => {
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
  return buildLastFmData();
};

export default LastFMData;
