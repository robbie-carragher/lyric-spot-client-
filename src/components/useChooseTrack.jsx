import { useState } from 'react';
import axios from 'axios';

const useChooseTrack = () => {
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setLyrics(""); // Reset lyrics
    axios.get("http://localhost:3001/lyrics", {
      params: { track: track.title, artist: track.artist },
    }).then(res => {
      setLyrics(res.data.lyrics);
    });
  };

  return { playingTrack, chooseTrack, lyrics };
};

export default useChooseTrack;
