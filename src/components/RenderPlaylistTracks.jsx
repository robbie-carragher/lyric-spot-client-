import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';

const RenderPlaylistTracks = ({ playlist, chooseTrack }) => {
  return (
    <>
      {playlist.tracks.items.slice(0, 6).map((item, index) => {
        const track = item.track;
        return (
          <div
            key={index}
            className="playlist-track"
            onClick={(e) => {
              e.stopPropagation();
              chooseTrack(track);
            }}
          >
            <img
              src={track.album.images[0].url}
              alt={track.album.name}
              className="playlist-track__album-cover"
            />
            <div className="playlist-track__track-details">
              <div className="playlist-track__track-title">{track.name}</div>
              <div className="playlist-track__track-artist">
                {track.artists.map((artist) => artist.name).join(", ")}
              </div>
              <FaPlayCircle className="playlist-track__icon" />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RenderPlaylistTracks;
