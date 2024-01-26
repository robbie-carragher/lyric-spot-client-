

const CurrentlyPlaying = ({ track }) => {
    if (!track) return null;
    return (
      <div className="currently-playing">
        <img
          src={track.albumUrl}
          alt={track.title}
          className="currently-playing__cover"
        />
        <div className="currently-playing__info">
          <div className="currently-playing__title">{track.title}</div>
          <div className="currently-playing__artist">{track.artist}</div>
        </div>
      </div>
    );
  };
  
  export default CurrentlyPlaying;