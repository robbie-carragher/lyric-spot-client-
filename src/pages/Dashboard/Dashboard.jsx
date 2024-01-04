import { useState, useEffect } from "react";
import useAuth from "../../components/useAuth";
import Player from "../../components/Player";
import TrackSearchResult from "../../components/TrackSearchResult/TrackSearchResult";
import { Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import "./Dashboard.scss";

const spotifyApi = new SpotifyWebApi({
  clientId: "7fca14558bdf4a21a907c174dcf86239",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  const searchGenius = async (query) => {
    try {
      const response = await axios.get("http://localhost:3001/search-genius", {
        params: { q: query },
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    searchGenius(search);

    return () => (cancel = true);
  }, [search, accessToken]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <div className="dashStyle">
      <div className="dashStyle__search">
        <div className="dashStyle__search-input">
          <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="dashStyle_btn">
          <button>Logout</button>
        </div>
        
      </div>

      <div className="search__map">
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>

      <div className="search__results">
        {searchResults.length === 0 && (
          <div className="search__results-lyric">{lyrics}</div>
        )}
      </div>

      {/* Player  */}

      <div className="player">
        <div className="player__control">
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </div>
    </div>
  );
}
