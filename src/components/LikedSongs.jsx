import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikedSongs = ({ accessToken, chooseTrack }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get(
          'https://api.spotify.com/v1/me/tracks',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              limit: 20, // Adjust as needed
            },
          }
        );

        setLikedSongs(response.data.items);
      } catch (err) {
        console.error('Failed to fetch liked songs', err);
      }
    };

    fetchLikedSongs();
  }, [accessToken]);

  return (
    <div>
      <h3>Liked Songs</h3>
      <ul>
        {likedSongs.map((item, index) => (
          <li key={index}>
            {/* Wrap each song in a clickable div to play the song */}
            <div
              onClick={() => chooseTrack(item.track)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={item.track.album.images[0].url}
                alt={item.track.name}
                style={{ width: '50px', height: '50px', marginRight: '10px' }}
              />
              {item.track.name} by {item.track.artists.map((artist) => artist.name).join(', ')}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedSongs;
