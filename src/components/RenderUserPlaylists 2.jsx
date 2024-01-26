

const RenderUserPlaylists = ({ playlists, setSelectedPlaylistId }) => {
  return (
    <>
      {playlists.slice(0, 16).map((playlist) => (
        <div
          key={playlist.id}
          onClick={() => setSelectedPlaylistId(playlist.id)}
          className="dashStyle__playlist-render-inner-wrap"
        >
          <h3 className="dashStyle__playlist-render-title">{playlist.name}</h3>
        </div>
      ))}
    </>
  );
};

export default RenderUserPlaylists;
