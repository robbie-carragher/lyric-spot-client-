import { FaPlayCircle } from "react-icons/fa";

import "./TrackSearchResult.scss";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div
      className="trackResult trackResult__m-2 trackResult__align-center "
      // style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      {/* Add an alt attribute to the img tag */}
      <img
        className="trackResult__image"
        src={track.albumUrl}
        alt={`${track.title} by ${track.artist}`} // Meaningful description
        style={{ height: "64px", width: "64px" }}
      />
      {/* <FaPlayCircle className="trackResult__playIcon" /> */}
      <div className="trackResult__info">
        <div className="trackResult__name-track-wrap">
          <div className="trackResult__title">{track.title}</div>
          <div className="trackResult__artist">{track.artist}</div>
        </div>
        <div className="trackResult__icon">
          {" "}
          <FaPlayCircle className="trackResult__playIcon" />
        </div>
      </div>
    </div>
  );
}
