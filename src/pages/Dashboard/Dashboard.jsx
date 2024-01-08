import { useState, useEffect } from "react";
import useAuth from "../../components/useAuth";
import Player from "../../components/Player";
import TrackSearchResult from "../../components/TrackSearchResult/TrackSearchResult";
import { Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import "./Dashboard.scss";
import backgroundVideo from "../../../src/assets/images/backVideo.mp4";
import CurrentlyPlaying from "../../components/CurrentlyPlaying";
import RenderUserPlaylists from "../../components/RenderUserPlaylists";
import RenderPlaylistTracks from "../../components/renderPlaylistTracks";

// Spotify <Api></Api>
const spotifyApi = new SpotifyWebApi({
  clientId: "7fca14558bdf4a21a907c174dcf86239",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  const [playlist, setPlaylist] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .getMe()
      .then((data) => {
        setUserProfile(data.body);
      })
      .catch((err) => console.error(err));

    const defaultTrackId = "1TKBTEgnXj3ob26HwJDK7P";
    spotifyApi
      .getTrack(defaultTrackId)
      .then((res) => {
        const trackData = res.body;
        setPlayingTrack({
          artist: trackData.artists[0].name,
          title: trackData.name,
          uri: trackData.uri,
          albumUrl: trackData.album.images[0].url,
        });

        axios
          .get("https://api.spotify.com/v1/me/playlists", {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((response) => setPlaylists(response.data.items))
          .catch((error) => console.error("Error fetching playlists", error));
      })
      .catch((err) => console.error(err));
  }, [accessToken]);

  useEffect(() => {
    if (!selectedPlaylistId || !accessToken) return;
    spotifyApi
      .getPlaylist(selectedPlaylistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.error(err));
  }, [selectedPlaylistId, accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .getPlaylist("3uJ85Fk3TEkTlNRyJafLia")
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.error(err));
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    if (search === "") {
      spotifyApi.searchTracks("a").then((res) => {
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
    }
  }, [accessToken, search]);

  useEffect(() => {
    if (!search) return;
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
    return () => {
      cancel = true;
    };
  }, [search, accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      try {
        const playlistsResponse = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setPlaylists(playlistsResponse.data.items);
        console.log(playlistsResponse.data);

        const albumsResponse = await axios.get(
          "https://api.spotify.com/v1/me/albums",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setAlbums(albumsResponse.data.items);
        console.log(albumsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [accessToken]);

  // Choose Track Function

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: track.title,
          artist: track.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }

  return (
    <div className="dashStyle">
      <div className="dashStyle__outer-wrap">
        <div className="dashStyle__inner-wrap">
          {/* User Profile */}

          <div className="dashStyle__profile-wrap">
            {userProfile && (
              <div className="dashStyle__user-profile">
                <img
                  src={userProfile.images[0].url}
                  alt={userProfile.display_name}
                  className="user-profile__image"
                />
                <div className="dashStyle__user-profile-name">
                  {userProfile.display_name}
                </div>
              </div>
            )}
          </div>

          {/* Search */}

          <div className="dashStyle__search">
            <div className="dashStyle__search-flex">
              <div className="dashStyle__btn">
                <a href="/">LOGOUT</a>
              </div>
              <div className="dashStyle__search-input">
                <Form.Control
                  type="search"
                  placeholder="Search Songs/Artists"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Lyrics */}

            <div className="dashStyle__lyric">
              <div className="dashStyle__lyric-result">
                <h1 className="dashStyle__title">Welcome To Lyric Spot</h1>
                <div className="dashStyle__lyric-render">
                  {lyrics !== ""
                    ? lyrics
                    : "Search for a song to see lyrics here."}
                </div>
              </div>
            </div>
          </div>

          <div className="dashStyle__playparent">
            <video autoPlay muted loop className="dashStyle__video">
              <source src={backgroundVideo} type="video/mp4" />
            </video>

            <div className="dashStyle__playlist">
              {playlist && (
                <div className="dashStyle__playlist-wrap">
                  <div className="dashStyle__playlist-title-wrap">
                    <h2 className="dashStyle__playlist-title">PlayList:</h2>
                    <h3 className="dashStyle__playlist-name">
                      {playlist.name}
                    </h3>
                  </div>

                  {/* Render Playlist Tracks */}

                  <div className="dashStyle__playlist-playlist">
                    {playlist && (
                      <RenderPlaylistTracks
                        playlist={playlist}
                        chooseTrack={chooseTrack}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="dashStyle__map">
          <h3 className="dashStyle__sub-title">Now Playing</h3>

          {/* Currently Playing */}

          <div className="dashStyle__currentPlaying-track">
            <CurrentlyPlaying track={playingTrack} />
          </div>
          <h3 className="dashStyle__sub-title">Search Result</h3>
          <div className="dashStyle__tracklist-wrap">
            {searchResults.slice(0, 16).map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>

          {/* Albums */}

          {/* User Playlists */}

          <div className="dashStyle__renderUserPlaylist-outer-wrap">
            <div className="dashStyle__renderUserPlaylist-wrap">
              <div className="">
                {" "}
                <h3 className="dashStyle__sub-title">My Playlists</h3>
              </div>
              <RenderUserPlaylists
                playlists={playlists}
                setSelectedPlaylistId={setSelectedPlaylistId}
              />
            </div>
          </div>
          <h3 className="dashStyle__sub-title albums__title">My Albums</h3>
          <div className="albums__wrap">
            <div className="albums">
              {albums.map((item, index) => (
                <div key={index} className="albums__list">
                  <img
                    src={item.album.images[0].url}
                    alt={item.album.name}
                    className="albums__image"
                  />
                  <div className="albums__info">
                    <h3 className="albums__name">{item.album.name}</h3>
                    <p className="albums__map">
                      {item.album.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dashStyle__playlist-selected">
        <div className="dashStyle__renderUserPlaylist-wrap-mobile">
          <div className="dashStyle__playlist-title-mobile">
            <h2 className="">Playlists</h2>
          </div>

          <RenderUserPlaylists
            playlists={playlists}
            setSelectedPlaylistId={setSelectedPlaylistId}
          />
        </div>

        {/* Playlist Tracks */}

        <div className="dashStyle__playParent-mobile">
          {playlist && (
            <RenderPlaylistTracks
              playlist={playlist}
              chooseTrack={chooseTrack}
            />
          )}
        </div>
      </div>

      {/* Player */}

      <div className="player">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
}
