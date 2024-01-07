// import { useState, useEffect } from "react";
// import useAuth from "../../components/useAuth";
// import Player from "../../components/Player";
// import TrackSearchResult from "../../components/TrackSearchResult/TrackSearchResult";
// import { Form } from "react-bootstrap";
// import SpotifyWebApi from "spotify-web-api-node";
// import axios from "axios";
// import "./Dashboard.scss";
// import backgroundVideo from "../../../src/assets/images/backVideo.mp4";

// const spotifyApi = new SpotifyWebApi({
//   clientId: "7fca14558bdf4a21a907c174dcf86239",
// });

// export default function Dashboard({ code }) {
//   const accessToken = useAuth(code);
//   const [search, setSearch] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [playingTrack, setPlayingTrack] = useState();
//   const [lyrics, setLyrics] = useState("");
//   const [playlist, setPlaylist] = useState(null);
//   const [playlists, setPlaylists] = useState([]);
//   const [userProfile, setUserProfile] = useState(null);
//   const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

//   // Set User profile

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//     console.log(spotifyApi);
//     spotifyApi
//       .getMe()
//       .then((data) => {
//         console.log(data);
//         setUserProfile(data.body);
//       })
//       .catch((err) => console.error(err));

//     // Default Track id

//     const defaultTrackId = "1TKBTEgnXj3ob26HwJDK7P"; // Replace with a valid Spotify track ID
//     spotifyApi
//       .getTrack(defaultTrackId)
//       .then((res) => {
//         const trackData = res.body;
//         console.log(trackData);
//         setPlayingTrack({
//           artist: trackData.artists[0].name,
//           title: trackData.name,
//           uri: trackData.uri,
//           albumUrl: trackData.album.images[0].url,
//         });

//         // Calling Playlists

//         axios
//           .get("https://api.spotify.com/v1/me/playlists", {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           })
//           .then((response) => setPlaylists(response.data.items))
//           .catch((error) => console.error("Error fetching playlists", error));
//       })
//       .catch((err) => console.error(err));
//   }, [accessToken]);

//   // Secected Playlist Id

//   useEffect(() => {
//     if (!selectedPlaylistId || !accessToken) return;
//     spotifyApi
//       .getPlaylist(selectedPlaylistId)
//       .then((data) => {
//         setPlaylist(data.body);
//       })
//       .catch((err) => console.error(err));
//   }, [selectedPlaylistId, accessToken]);

//   // Get/Set Playlist

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//     spotifyApi
//       .getPlaylist("3HAVA7fMXxAIObFBlXc9B7")
//       .then((data) => {
//         setPlaylist(data.body);
//         console.log(data.body);
//       })
//       .catch((err) => console.error(err));
//   }, [accessToken]);

//   // Set Search Results

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//     if (search === "") {
//       spotifyApi.searchTracks("a").then((res) => {
//         setSearchResults(
//           res.body.tracks.items.map((track) => {
//             const smallestAlbumImage = track.album.images.reduce(
//               (smallest, image) => {
//                 if (image.height < smallest.height) return image;
//                 return smallest;
//               },
//               track.album.images[0]
//             );
//             return {
//               artist: track.artists[0].name,
//               title: track.name,
//               uri: track.uri,
//               albumUrl: smallestAlbumImage.url,
//             };
//           })
//         );
//       });
//     }
//   }, [accessToken, search]);

//   // Search Tracks

//   useEffect(() => {
//     if (!search) return;
//     if (!accessToken) return;
//     let cancel = false;
//     spotifyApi.searchTracks(search).then((res) => {
//       if (cancel) return;
//       setSearchResults(
//         res.body.tracks.items.map((track) => {
//           const smallestAlbumImage = track.album.images.reduce(
//             (smallest, image) => {
//               if (image.height < smallest.height) return image;
//               return smallest;
//             },
//             track.album.images[0]
//           );
//           return {
//             artist: track.artists[0].name,
//             title: track.name,
//             uri: track.uri,
//             albumUrl: smallestAlbumImage.url,
//           };
//         })
//       );
//     });
//     return () => {
//       cancel = true;
//     };
//   }, [search, accessToken]);

//   // Choose Track

//   function chooseTrack(track) {
//     setPlayingTrack(track);
//     setSearch("");
//     setLyrics("");
//     axios
//       .get("http://localhost:3001/lyrics", {
//         params: {
//           track: track.title,
//           artist: track.artist,
//         },
//       })
//       .then((res) => {
//         setLyrics(res.data.lyrics);
//       });
//   }

//   // Render Playlist Tracks

//   const renderPlaylistTracks = (playlist) => {
//     return playlist.tracks.items.slice(0, 6).map((item, index) => {
//       console.log(playlist);
//       const track = item.track;
//       console.log(item);
//       console.log(track);
//       return (
//         <div
//           key={index}
//           className="playlist-track"
//           onClick={() => chooseTrack(track)}
//         >
//           <img
//             src={track.album.images[0].url}
//             alt={track.album.name}
//             className="playlist-track__album-cover"
//           />
//           <div className="playlist-track__track-details">
//             <div className="playlist-track__track-title">{track.name}</div>
//             <div className="playlist-track__track-artist">
//               {track.artists.map((artist) => artist.name).join(", ")}
//             </div>
//           </div>
//         </div>
//       );
//     });
//   };

//   // Render User Playlist Tracks

//   const renderUserPlaylists = () => {
//     return playlists.slice(0, 16).map((playlist) => (
//       <div
//         key={playlist.id}
//         onClick={() => setSelectedPlaylistId(playlist.id)}
//         className="dashStyle__playlist-render-inner-wrap"
//       >
//         <h3 className="dashStyle__playlist-render-title">{playlist.name}</h3>
//       </div>
//     ));
//   };

//   // Currently Playing Track

//   const CurrentlyPlaying = ({ track }) => {
//     if (!track) return null;
//     return (
//       <div className="currently-playing">
//         <img
//           src={track.albumUrl}
//           alt={track.title}
//           className="currently-playing__cover"
//         />
//         <div className="currently-playing__info">
//           <div className="currently-playing__title">{track.title}</div>
//           <div className="currently-playing__artist">{track.artist}</div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="dashStyle">
//       <div className="dashStyle__outer-wrap">
//         <div className="dashStyle__inner-wrap">
//           {/* User Profile */}

//           <div className="dashStyle__profile-wrap">
//             <div className="spacer"></div>{" "}
//             {userProfile && (
//               <div className="dashStyle__user-profile">
//                 <img
//                   src={userProfile.images[0].url}
//                   alt={userProfile.display_name}
//                   className="user-profile__image"
//                 />
//                 <div className="dashStyle__user-profile-name">
//                   {userProfile.display_name}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Header Search and Logout Button */}

//           <div className="dashStyle__search">
//             <div className="dashStyle__search-flex">
//               <div className="dashStyle__btn">
//                 <a href="/">LOGOUT</a>
//               </div>
//               <div className="dashStyle__search-input">
//                 <Form.Control
//                   type="search"
//                   placeholder="Search Songs/Artists"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Lyric Block */}

//             <div className="dashStyle__lyric">
//               <div className="dashStyle__lyric-result">
//                 <h1 className="dashStyle__title">Welcome To Lyric Spot</h1>
//                 <div className="dashStyle__lyric-render">
//                   {lyrics !== ""
//                     ? lyrics
//                     : "Search for a song to see lyrics here."}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="dashStyle__playparent">
//             <video autoPlay muted loop className="dashStyle__video">
//               <source src={backgroundVideo} type="video/mp4" />
//             </video>

//             {/* Playlist Area */}

//             <div className="dashStyle__playlist">
//               {playlist && (
//                 <div className="dashStyle__playlist-wrap">
//                   <h2 className="dashStyle__playlist-title">PlayList:</h2>
//                   <h3 className="dashStyle__playlist-name">{playlist.name}</h3>
//                   <div className="dashStyle__playlist-playlist">
//                     {renderPlaylistTracks(playlist)}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Currenly Playing and Track Search Result */}

//         <div className="dashStyle__map">
//           <div className="dashStyle__currentPlaying-track">
//             <CurrentlyPlaying track={playingTrack} />
//           </div>
//           {searchResults.slice(0, 8).map((track) => (
//             <TrackSearchResult
//               track={track}
//               key={track.uri}
//               chooseTrack={chooseTrack}
//             />
//           ))}

//           {/* User Playlist */}

//           <div className="dashStyle__renderUserPlaylist-wrap">
//             {renderUserPlaylists()}
//           </div>
//         </div>
//       </div>

//       {/* Player */}

//       <div className="player">
//         <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import useAuth from "../../components/useAuth";
// import Player from "../../components/Player";
// import TrackSearchResult from "../../components/TrackSearchResult/TrackSearchResult";
// import { Form } from "react-bootstrap";
// import SpotifyWebApi from "spotify-web-api-node";
// import axios from "axios";
// import "./Dashboard.scss";
// import backgroundVideo from "../../../src/assets/images/backVideo.mp4";
// // import { FaPlayCircle } from 'react-icons/fa';

// const spotifyApi = new SpotifyWebApi({
//   clientId: "7fca14558bdf4a21a907c174dcf86239",
// });

// export default function Dashboard({ code }) {
//   const accessToken = useAuth(code);
//   const [search, setSearch] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [playingTrack, setPlayingTrack] = useState();
//   const [lyrics, setLyrics] = useState("");
//   const [playlist, setPlaylist] = useState(null);
//   const [playlists, setPlaylists] = useState([]);
//   const [userProfile, setUserProfile] = useState(null);
//   const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

//   // Set User profile

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//     console.log(spotifyApi);
//     spotifyApi
//       .getMe()
//       .then((data) => {
//         console.log(data);
//         setUserProfile(data.body);
//       })
//       .catch((err) => console.error(err));

//     // Default Track id

//     const defaultTrackId = "1TKBTEgnXj3ob26HwJDK7P"; // Replace with a valid Spotify track ID
//     spotifyApi
//       .getTrack(defaultTrackId)
//       .then((res) => {
//         const trackData = res.body;
//         console.log(trackData);
//         setPlayingTrack({
//           artist: trackData.artists[0].name,
//           title: trackData.name,
//           uri: trackData.uri,
//           albumUrl: trackData.album.images[0].url,
//         });

//         // Calling Playlists

//         axios
//           .get("https://api.spotify.com/v1/me/playlists", {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           })
//           .then((response) => setPlaylists(response.data.items))
//           .catch((error) => console.error("Error fetching playlists", error));
//       })
//       .catch((err) => console.error(err));
//   }, [accessToken]);

//   // Secected Playlist Id

//   useEffect(() => {
//     if (!selectedPlaylistId || !accessToken) return;
//     spotifyApi
//       .getPlaylist(selectedPlaylistId)
//       .then((data) => {
//         setPlaylist(data.body);
//       })
//       .catch((err) => console.error(err));
//   }, [selectedPlaylistId, accessToken]);

//   // Get/Set Playlist

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//     spotifyApi
//       .getPlaylist("3HAVA7fMXxAIObFBlXc9B7")
//       .then((data) => {
//         setPlaylist(data.body);
//         console.log(data.body);
//       })
//       .catch((err) => console.error(err));
//   }, [accessToken]);

//   // Set Search Results

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//     if (search === "") {
//       spotifyApi.searchTracks("a").then((res) => {
//         setSearchResults(
//           res.body.tracks.items.map((track) => {
//             const smallestAlbumImage = track.album.images.reduce(
//               (smallest, image) => {
//                 if (image.height < smallest.height) return image;
//                 return smallest;
//               },
//               track.album.images[0]
//             );
//             return {
//               artist: track.artists[0].name,
//               title: track.name,
//               uri: track.uri,
//               albumUrl: smallestAlbumImage.url,
//             };
//           })
//         );
//       });
//     }
//   }, [accessToken, search]);

//   // Search Tracks

//   useEffect(() => {
//     if (!search) return;
//     if (!accessToken) return;
//     let cancel = false;
//     spotifyApi.searchTracks(search).then((res) => {
//       if (cancel) return;
//       setSearchResults(
//         res.body.tracks.items.map((track) => {
//           const smallestAlbumImage = track.album.images.reduce(
//             (smallest, image) => {
//               if (image.height < smallest.height) return image;
//               return smallest;
//             },
//             track.album.images[0]
//           );
//           return {
//             artist: track.artists[0].name,
//             title: track.name,
//             uri: track.uri,
//             albumUrl: smallestAlbumImage.url,
//           };
//         })
//       );
//     });
//     return () => {
//       cancel = true;
//     };
//   }, [search, accessToken]);

//   // Choose Track

//   function chooseTrack(track) {
//     setPlayingTrack(track);
//     setSearch("");
//     setLyrics("");
//     axios
//       .get("http://localhost:3001/lyrics", {
//         params: {
//           track: track.title,
//           artist: track.artist,
//         },
//       })
//       .then((res) => {
//         setLyrics(res.data.lyrics);
//       });
//   }

//   // Render Playlist Tracks

//   const renderPlaylistTracks = (playlist) => {
//     return playlist.tracks.items.slice(0, 6).map((item, index) => {
//       console.log(playlist);
//       const track = item.track;
//       console.log(item);
//       console.log(track);
//       return (
//         <div
//           key={index}
//           className="playlist-track"
//           onClick={() => chooseTrack(track)}
//         >
//           <img
//             src={track.album.images[0].url}
//             alt={track.album.name}
//             className="playlist-track__album-cover"
//           />
//           <div className="playlist-track__track-details">
//             <div className="playlist-track__track-title">{track.name}</div>
//             <div className="playlist-track__track-artist">
//               {track.artists.map((artist) => artist.name).join(", ")}
//             </div>
//           </div>

//         </div>
//       );
//     });
//   };

//   // Render User Playlist Tracks

//   const renderUserPlaylists = () => {
//     return playlists.slice(0, 16).map((playlist) => (
//       <div
//         key={playlist.id}
//         onClick={() => setSelectedPlaylistId(playlist.id)}
//         className="dashStyle__playlist-render-inner-wrap"
//       >
//         <h3 className="dashStyle__playlist-render-title">{playlist.name}</h3>
//       </div>
//     ));
//   };

//   // Currently Playing Track

//   const CurrentlyPlaying = ({ track }) => {
//     if (!track) return null;
//     return (
//       <div className="currently-playing">
//         <img
//           src={track.albumUrl}
//           alt={track.title}
//           className="currently-playing__cover"
//         />
//         <div className="currently-playing__info">
//           <div className="currently-playing__title">{track.title}</div>
//           <div className="currently-playing__artist">{track.artist}</div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="dashStyle">
//       <div className="dashStyle__outer-wrap">
//         <div className="dashStyle__inner-wrap">
//           {/* User Profile */}

//           <div className="dashStyle__profile-wrap">
//             <div className="spacer"></div>{" "}
//             {userProfile && (
//               <div className="dashStyle__user-profile">
//                 <img
//                   src={userProfile.images[0].url}
//                   alt={userProfile.display_name}
//                   className="user-profile__image"
//                 />
//                 <div className="dashStyle__user-profile-name">
//                   {userProfile.display_name}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Header Search and Logout Button */}

//           <div className="dashStyle__search">
//             <div className="dashStyle__search-flex">
//               <div className="dashStyle__btn">
//                 <a href="/">LOGOUT</a>
//               </div>
//               <div className="dashStyle__search-input">
//                 <Form.Control
//                   type="search"
//                   placeholder="Search Songs/Artists"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Lyric Block */}

//             <div className="dashStyle__lyric">
//               <div className="dashStyle__lyric-result">
//                 <h1 className="dashStyle__title">Welcome To Lyric Spot</h1>
//                 <div className="dashStyle__lyric-render">
//                   {lyrics !== ""
//                     ? lyrics
//                     : "Search for a song to see lyrics here."}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="dashStyle__playparent">
//             <video autoPlay muted loop className="dashStyle__video">
//               <source src={backgroundVideo} type="video/mp4" />
//             </video>

//             {/* Playlist Area */}

//             <div className="dashStyle__playlist">
//               {playlist && (
//                 <div className="dashStyle__playlist-wrap">
//                   <h2 className="dashStyle__playlist-title">PlayList:</h2>
//                   <h3 className="dashStyle__playlist-name">{playlist.name}</h3>
//                   <div className="dashStyle__playlist-playlist">
//                     {renderPlaylistTracks(playlist)}
//                   </div>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>

//         {/* Currenly Playing and Track Search Result */}

//         <div className="dashStyle__map">
//           <div className="dashStyle__currentPlaying-track">
//             <CurrentlyPlaying track={playingTrack} />
//           </div>
//           {searchResults.slice(0, 8).map((track) => (
//             <TrackSearchResult
//               track={track}
//               key={track.uri}
//               chooseTrack={chooseTrack}
//             />
//           ))}

//           {/* User Playlist */}

// <div className="dashStyle__playlist-selected">
// <div className="dashStyle__renderUserPlaylist-wrap">
//             {renderUserPlaylists()}
//           </div>

//   {/* Playlist Area  for Mobile */}

//         <div className="dashStyle__playParent-mobile">
//             {/* {renderPlaylistTracks(playlist)} */}
//         </div>

// </div>

//         </div>
//       </div>

//       {/* Player */}

//       <div className="player">
//         <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import useAuth from "../../components/useAuth";
import Player from "../../components/Player";
import TrackSearchResult from "../../components/TrackSearchResult/TrackSearchResult";
import { Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import "./Dashboard.scss";
import backgroundVideo from "../../../src/assets/images/backVideo.mp4";

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
      .getPlaylist("3HAVA7fMXxAIObFBlXc9B7")
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

  const renderPlaylistTracks = (playlist) => {
    return playlist.tracks.items.slice(0, 6).map((item, index) => {
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
          </div>
        </div>
      );
    });
  };

  const renderUserPlaylists = () => {
    return playlists.slice(0, 16).map((playlist) => (
      <div
        key={playlist.id}
        onClick={() => setSelectedPlaylistId(playlist.id)}
        className="dashStyle__playlist-render-inner-wrap"
      >
        <h3 className="dashStyle__playlist-render-title">{playlist.name}</h3>
      </div>
    ));
  };

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

  return (
    <div className="dashStyle">
      <div className="dashStyle__outer-wrap">
        <div className="dashStyle__inner-wrap">
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
                  <h2 className="dashStyle__playlist-title">PlayList:</h2>
                  <h3 className="dashStyle__playlist-name">{playlist.name}</h3>
                  <div className="dashStyle__playlist-playlist">
                    {renderPlaylistTracks(playlist)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="dashStyle__map">
          <div className="dashStyle__currentPlaying-track">
            <CurrentlyPlaying track={playingTrack} />
          </div>
          {searchResults.slice(0, 8).map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}

          <div className="dashStyle__renderUserPlaylist-wrap">
            {renderUserPlaylists()}
          </div>
        </div>
      </div>

      <div className="dashStyle__playlist-selected">
        <div className="dashStyle__renderUserPlaylist-wrap-mobile">
          {renderUserPlaylists()}
        </div>

        <div className="dashStyle__playParent-mobile">
          {playlist && renderPlaylistTracks(playlist)}
        </div>
      </div>

      <div className="player">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
}
