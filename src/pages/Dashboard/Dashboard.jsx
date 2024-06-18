// import { useState, useEffect } from "react";
// import useAuth from "../../components/useAuth";
// import Player from "../../components/Player";
// import TrackSearchResult from "../../components/TrackSearchResult/TrackSearchResult";
// import { Form } from "react-bootstrap";
// import SpotifyWebApi from "spotify-web-api-node";
// import axios from "axios";
// import "./Dashboard.scss";
// import backgroundVideo from "../../../src/assets/images/backVideo.mp4";
// import CurrentlyPlaying from "../../components/CurrentlyPlaying";
// import RenderUserPlaylists from "../../components/RenderUserPlaylists";
// import RenderPlaylistTracks from "../../components/RenderPlaylistTracks";
// import { FaSearch } from "react-icons/fa";
// import { RiPlayListFill } from "react-icons/ri";
// import { GiSoundOn } from "react-icons/gi";
// import { IoAlbumsOutline } from "react-icons/io5";


// import LikedSongs from "../../components/LikedSongs";
// import "./LikedSong.scss"


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
//   const [albums, setAlbums] = useState([]);
  
//   const [topArtists, setTopArtists] = useState([]);



//   // Default Track 

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//     spotifyApi
//       .getMe()
//       .then((data) => setUserProfile(data.body))
//       .catch((err) => console.error(err));
//     const defaultTrackId = "1TKBTEgnXj3ob26HwJDK7P";
//     spotifyApi
//       .getTrack(defaultTrackId)
//       .then((res) => {
//         const trackData = res.body;
//         setPlayingTrack({
//           artist: trackData.artists[0].name,
//           title: trackData.name,
//           uri: trackData.uri,
//           albumUrl: trackData.album.images[0].url,
//         });
//         axios
//           .get("https://api.spotify.com/v1/me/playlists", {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           })
//           .then((response) => setPlaylists(response.data.items))
//           .catch((error) => console.error("Error fetching playlists", error));
//       })
//       .catch((err) => console.error(err));
//   }, [accessToken]);

//   // Get Playlists 

//   useEffect(() => {
//     if (!selectedPlaylistId || !accessToken) return;
//     spotifyApi
//       .getPlaylist(selectedPlaylistId)
//       .then((data) => setPlaylist(data.body))
//       .catch((err) => console.error(err));
//   }, [selectedPlaylistId, accessToken]);

  
//   // Set playlists

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//     spotifyApi
//       .getPlaylist("3uJ85Fk3TEkTlNRyJafLia")
//       .then((data) => setPlaylist(data.body))
//       .catch((err) => console.error(err));
//   }, [accessToken]);

//   // Track Search 

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//     if (search === "") {
//       spotifyApi.searchTracks("a").then((res) => {
//         setSearchResults(
//           res.body.tracks.items.map((track) => {
//             const smallestAlbumImage = track.album.images.reduce(
//               (smallest, image) =>
//                 image.height < smallest.height ? image : smallest,
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

//   // Track Search Result with image name and title

//   useEffect(() => {
//     if (!search) return;
//     if (!accessToken) return;
//     let cancel = false;
//     spotifyApi.searchTracks(search).then((res) => {
//       if (cancel) return;
//       setSearchResults(
//         res.body.tracks.items.map((track) => {
//           const smallestAlbumImage = track.album.images.reduce(
//             (smallest, image) =>
//               image.height < smallest.height ? image : smallest,
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

// // Playlists endpoint call

//   useEffect(() => {
//     if (!accessToken) return;

//     const fetchData = async () => {
//       try {
//         const playlistsResponse = await axios.get(
//           "https://api.spotify.com/v1/me/playlists",
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );
//         setPlaylists(playlistsResponse.data.items);

//         // Albums endpoint call

//         const albumsResponse = await axios.get(
//           "https://api.spotify.com/v1/me/albums",
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );
//         setAlbums(albumsResponse.data.items);

//         // Top Artists api call

//         const topArtistsResponse = await axios.get(
//           "https://api.spotify.com/v1/me/top/artists",
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );
//         setTopArtists(topArtistsResponse.data.items);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     };

//     fetchData();
//   }, [accessToken]);

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

//   // Play Top Tracks

//   const playArtistTopTrack = async (artistId) => {
//     try {
//       const market = "US";
//       const topTracksResponse = await axios.get(
//         `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       const topTracks = topTracksResponse.data.tracks;
//       if (topTracks.length === 0) {
//         console.log("No top tracks found for this artist.");
//         return;
//       }

//       // Top Tracks Playable

//       const trackUri = topTracks[0].uri;
//       await axios.put(
//         "https://api.spotify.com/v1/me/player/play",
//         {
//           uris: [trackUri],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       console.log(`Playing top track of the artist: ${topTracks[0].name}`);
//     } catch (error) {
//       console.error("Error in playArtistTopTrack:", error);
//     }
//   };

//   // Albums

//   const playAlbum = async (albumId) => {
//     try {
//       const tracksResponse = await spotifyApi.getAlbumTracks(albumId);
//       const tracks = tracksResponse.body.items;
//       if (tracks.length > 0) {
//         chooseTrack(tracks[0]); // Assuming chooseTrack can handle the track object
//       } else {
//         console.log("No tracks found in this album.");
//       }
//     } catch (error) {
//       console.error("Error fetching album tracks:", error);
//     }
//   };

//   spotifyApi.setAccessToken(accessToken);

//   // Liked Songs

//   spotifyApi
//     .getMySavedTracks({
//       limit: 50, // Number of songs to retrieve
//       offset: 0, // Index of the first song to retrieve
//     })
//     .then(
//       function (data) {
//         console.log("Liked songs:", data.body);
//       },
//       function (err) {
//         console.log("Something went wrong!", err);
//       }
//     );



//   return (
//     <div className="outer-wrapper">
//       <div className="dashStyle">
//         <div className="wrapper">
//           <div className="dashStyle__outer-wrap">
//             <div className="dashStyle__inner-wrap">
//               <div className="dashStyle__profile-wrap">

//               {/* Logout  */}

//                 <div className="dashStyle__btn">
//                   <a href="/">LOGOUT</a>
//                 </div>

//                 {/* User Profile  */}

//                 <div className="dashStyle__profile-inner-wrap">
//                   {userProfile && (
//                     <div className="dashStyle__user-profile">
//                       <img
//                         src={userProfile.images[0].url}
//                         alt={userProfile.display_name}
//                         className="user-profile__image"
//                       />
//                       <div className="dashStyle__user-profile-name">
//                         {userProfile.display_name}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Lyric Section */}

//               <div className="dashStyle__search" >
//                 <div className="dashStyle__search-flex"></div>
//                 <div className="dashStyle__lyric">
//                   <h1 className="dashStyle__title">Welcome To Lyric Spot</h1>
//                   <div className="dashStyle__lyric-result">
//                     <div className="dashStyle__lyric-render">
//                       {lyrics !== ""
//                         ? lyrics
//                         : "Search for a song to see lyrics here."}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Top Artists */}

//               <div className="dashStyle__playparent">
//                 <div className="topArtists">
//                   <h2 className="topArtists__title">Top Artists</h2>
//                   <div className="topArtists__list">
//                     {topArtists.slice(0, 4).map((artist, index) => (
//                       <div
//                         key={index}
//                         className="topArtists__item"
//                         onClick={() => playArtistTopTrack(artist.id)}
//                       >
//                         <img
//                           src={artist.images[0].url}
//                           alt={artist.name}
//                           className="topArtists__image"
//                         />
//                         <div className="topArtists__info">
//                           <h3 className="topArtists__name">{artist.name}</h3>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Video Background */}

//                 <video autoPlay muted loop className="dashStyle__video">
//                   <source src={backgroundVideo} type="video/mp4" />
//                 </video>

//                 {/* On page My Playlist */}

//                 <div className="dashStyle__playlist">
//                   {playlist && (
//                     <div className="dashStyle__playlist-wrap">
//                       <div className="dashStyle__playlist-title-wrap">
//                         <h2 className="dashStyle__playlist-title">PlayList:</h2>
//                         <h3 className="dashStyle__playlist-name">
//                           {playlist.name}
//                         </h3>
//                       </div>
//                       <div className="dashStyle__playlist-playlist">
//                         {playlist && (
//                           <RenderPlaylistTracks
//                             playlist={playlist}
//                             chooseTrack={chooseTrack}
//                           />
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
       
//               </div>
//             </div>

//             {/* Search Artist Input */}

//             <div className="dashStyle__map">
//               <div className="dashStyle__search-input">
//                 <Form.Control
//                   className="search-input "
//                   type="search"
//                   placeholder="Search Songs/Artists"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>

//               {/* Header Logout  */}

//               <div className="dashStyle__btn-desk">
//                 <a href="/">LOGOUT</a>
//               </div>

// {/* Current Track Playing  */}

//               <div className="dashStyle__current-track-wrap">
//                 <div className="dashStyle__current-track">
//                   <div className="dashStyle__icon">
//                     <GiSoundOn className="dashStyle__sound" />
//                   </div>
//                 </div>
//                 <div className="dashStyle__current-title">
//                   <h3 className="dashStyle__sub-title">Now Playing</h3>
//                 </div>
//               </div>
//               <div className="dashStyle__currentPlaying-track">
//                 <CurrentlyPlaying track={playingTrack} />
//               </div>
//               <div className="dashStyle__search-input-desk">
//                 <Form.Control
//                   type="search"
//                   placeholder="Search Songs/Artists"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>

//               {/* Search Result */}

//               <div className="dashStyle__outer-wrap">
//                 <div className="dashStyle__search-icon">
//                   <FaSearch className="dashStyle__search-icon-in" />
//                 </div>
//                 <div className="dashStyle__seach-title">
//                   <h3 className="dashStyle__sub-title">Search Result</h3>
//                 </div>
//               </div>

//               {/* Search Map Result */}

//               <div className="dashStyle__tracklist-wrap">
//                 {searchResults.slice(0, 16).map((track) => (
//                   <TrackSearchResult
//                     track={track}
//                     key={track.uri}
//                     chooseTrack={chooseTrack}
//                   />
//                 ))}
//               </div>

//               {/* Playlists */}
//               <div className="dashStyle__renderUserPlaylist-outer-wrap">
//                 <div className="dashStyle__playlist-icon">
//                   <RiPlayListFill />
//                 </div>

//                 <div className="dashStyle__title-heading">
//                   <h3 className="dashStyle__sub-title">My Playlists</h3>
//                 </div>
//               </div>

//               {/* Sidebar My Playlists */}

//               <div className="dashStyle__renderUserPlaylist-wrap">
//                 <div className="dashStyle__playlist-inner-wrap">
//                   <div className="dashStyle__playlist__title-wrap">
//                     <RenderUserPlaylists
//                       playlists={playlists}
//                       setSelectedPlaylistId={setSelectedPlaylistId}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/*  Side bar Albums */}

//               <div className="albums-title-wrap">
            
//                 <div className="albums__title">
//                   <div className=""><IoAlbumsOutline /></div>
//                   <h3 className="dashStyle__sub-title ">
//                     My Albums
//                   </h3>
//                 </div>
//               </div>

//               <div className="albums__wrap">
//                 <div className="albums">
//                   {albums.map((item, index) => (
//                     <div
//                       key={index}
//                       className="albums__list"
//                       onClick={() => playAlbum(item.album.id)} // Add onClick here
//                     >
//                       <img
//                         src={item.album.images[0].url}
//                         alt={item.album.name}
//                         className="albums__image"
//                       />
//                       <div className="albums__info">
//                         <h3 className="albums__name">{item.album.name}</h3>
//                         <p className="albums__map">
//                           {item.album.artists
//                             .map((artist) => artist.name)
//                             .join(", ")}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar my playlist */}

//           <div className="dashStyle__playlist-selected">
//             <div className="dashStyle__renderUserPlaylist-wrap-mobile">
//               <div className="dashStyle__playlist-title-mobile">
//                 <h2 className="">Playlists</h2>
//               </div>
//               <RenderUserPlaylists
//                 playlists={playlists}
//                 setSelectedPlaylistId={setSelectedPlaylistId}
//               />
//             </div>
//             <div className="dashStyle__playParent-mobile">
//               {playlist && (
//                 <RenderPlaylistTracks
//                   playlist={playlist}
//                   chooseTrack={chooseTrack}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//          <div className="liked-songs">
//           <LikedSongs accessToken={accessToken} chooseTrack={chooseTrack} />
//         </div> 
     


//         <div className="player">
//           <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
//         </div>
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
import CurrentlyPlaying from "../../components/CurrentlyPlaying";
import RenderUserPlaylists from "../../components/RenderUserPlaylists";
import RenderPlaylistTracks from "../../components/RenderPlaylistTracks";
import { FaSearch } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import { GiSoundOn } from "react-icons/gi";
import { IoAlbumsOutline } from "react-icons/io5";
import LikedSongs from "../../components/LikedSongs";
import "./LikedSong.scss"; // Ensure this path is correct and matches the file name exactly

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
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .getMe()
      .then((data) => setUserProfile(data.body))
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
      .then((data) => setPlaylist(data.body))
      .catch((err) => console.error(err));
  }, [selectedPlaylistId, accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .getPlaylist("3uJ85Fk3TEkTlNRyJafLia")
      .then((data) => setPlaylist(data.body))
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
              (smallest, image) =>
                image.height < smallest.height ? image : smallest,
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
            (smallest, image) =>
              image.height < smallest.height ? image : smallest,
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

        const albumsResponse = await axios.get(
          "https://api.spotify.com/v1/me/albums",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setAlbums(albumsResponse.data.items);

        const topArtistsResponse = await axios.get(
          "https://api.spotify.com/v1/me/top/artists",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setTopArtists(topArtistsResponse.data.items);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [accessToken]);

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

  const playArtistTopTrack = async (artistId) => {
    try {
      const market = "US";
      const topTracksResponse = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const topTracks = topTracksResponse.data.tracks;
      if (topTracks.length === 0) {
        console.log("No top tracks found for this artist.");
        return;
      }

      const trackUri = topTracks[0].uri;
      await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          uris: [trackUri],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(`Playing top track of the artist: ${topTracks[0].name}`);
    } catch (error) {
      console.error("Error in playArtistTopTrack:", error);
    }
  };

  const playAlbum = async (albumId) => {
    try {
      const tracksResponse = await spotifyApi.getAlbumTracks(albumId);
      const tracks = tracksResponse.body.items;
      if (tracks.length > 0) {
        chooseTrack(tracks[0]);
      } else {
        console.log("No tracks found in this album.");
      }
    } catch (error) {
      console.error("Error fetching album tracks:", error);
    }
  };

  spotifyApi.setAccessToken(accessToken);

  spotifyApi
    .getMySavedTracks({
      limit: 50,
      offset: 0,
    })
    .then(
      function (data) {
        console.log("Liked songs:", data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

  return (
    <div className="outer-wrapper">
      <div className="dashStyle">
        <div className="wrapper">
          <div className="dashStyle__outer-wrap">
            <div className="dashStyle__inner-wrap">
              <div className="dashStyle__profile-wrap">
                <div className="dashStyle__btn">
                  <a href="/">LOGOUT</a>
                </div>
                <div className="dashStyle__profile-inner-wrap">
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
              </div>
              <div className="dashStyle__search">
                <div className="dashStyle__search-flex"></div>
                <div className="dashStyle__lyric">
                  <h1 className="dashStyle__title">Welcome To Lyric Spot</h1>
                  <div className="dashStyle__lyric-result">
                    <div className="dashStyle__lyric-render">
                      {lyrics !== ""
                        ? lyrics
                        : "Search for a song to see lyrics here."}
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashStyle__playparent">
                <div className="topArtists">
                  <h2 className="topArtists__title">Top Artists</h2>
                  <div className="topArtists__list">
                    {topArtists.slice(0, 4).map((artist, index) => (
                      <div
                        key={index}
                        className="topArtists__item"
                        onClick={() => playArtistTopTrack(artist.id)}
                      >
                        <img
                          src={artist.images[0].url}
                          alt={artist.name}
                          className="topArtists__image"
                        />
                        <div className="topArtists__info">
                          <h3 className="topArtists__name">{artist.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
              <div className="dashStyle__search-input">
                <Form.Control
                  className="search-input "
                  type="search"
                  placeholder="Search Songs/Artists"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="dashStyle__btn-desk">
                <a href="/">LOGOUT</a>
              </div>
              <div className="dashStyle__current-track-wrap">
                <div className="dashStyle__current-track">
                  <div className="dashStyle__icon">
                    <GiSoundOn className="dashStyle__sound" />
                  </div>
                </div>
                <div className="dashStyle__current-title">
                  <h3 className="dashStyle__sub-title">Now Playing</h3>
                </div>
              </div>
              <div className="dashStyle__currentPlaying-track">
                <CurrentlyPlaying track={playingTrack} />
              </div>
              <div className="dashStyle__search-input-desk">
                <Form.Control
                  type="search"
                  placeholder="Search Songs/Artists"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="dashStyle__outer-wrap">
                <div className="dashStyle__search-icon">
                  <FaSearch className="dashStyle__search-icon-in" />
                </div>
                <div className="dashStyle__seach-title">
                  <h3 className="dashStyle__sub-title">Search Result</h3>
                </div>
              </div>
              <div className="dashStyle__tracklist-wrap">
                {searchResults.slice(0, 16).map((track) => (
                  <TrackSearchResult
                    track={track}
                    key={track.uri}
                    chooseTrack={chooseTrack}
                  />
                ))}
              </div>
              <div className="dashStyle__renderUserPlaylist-outer-wrap">
                <div className="dashStyle__playlist-icon">
                  <RiPlayListFill />
                </div>
                <div className="dashStyle__title-heading">
                  <h3 className="dashStyle__sub-title">My Playlists</h3>
                </div>
              </div>
              <div className="dashStyle__renderUserPlaylist-wrap">
                <div className="dashStyle__playlist-inner-wrap">
                  <div className="dashStyle__playlist__title-wrap">
                    <RenderUserPlaylists
                      playlists={playlists}
                      setSelectedPlaylistId={setSelectedPlaylistId}
                    />
                  </div>
                </div>
              </div>
              <div className="albums-title-wrap">
                <div className="albums__title">
                  <div className="">
                    <IoAlbumsOutline />
                  </div>
                  <h3 className="dashStyle__sub-title ">My Albums</h3>
                </div>
              </div>
              <div className="albums__wrap">
                <div className="albums">
                  {albums.map((item, index) => (
                    <div
                      key={index}
                      className="albums__list"
                      onClick={() => playAlbum(item.album.id)}
                    >
                      <img
                        src={item.album.images[0].url}
                        alt={item.album.name}
                        className="albums__image"
                      />
                      <div className="albums__info">
                        <h3 className="albums__name">{item.album.name}</h3>
                        <p className="albums__map">
                          {item.album.artists.map((artist) => artist.name).join(", ")}
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
            <div className="dashStyle__playParent-mobile">
              {playlist && (
                <RenderPlaylistTracks
                  playlist={playlist}
                  chooseTrack={chooseTrack}
                />
              )}
            </div>
          </div>
          <div className="liked-songs">
            <LikedSongs accessToken={accessToken} chooseTrack={chooseTrack} />
          </div>
          <div className="player">
            <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
          </div>
        </div>
      </div>
    </div>
  );
}
