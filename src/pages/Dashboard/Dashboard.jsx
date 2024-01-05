
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
//   const [userProfile, setUserProfile] = useState(null);

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
  
//     // Fetch user's profile
//     spotifyApi.getMe().then((data) => {
//       setUserProfile(data.body);
//     }).catch(err => console.error(err));
//   }, [accessToken]);




//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//     spotifyApi.getPlaylist('3HAVA7fMXxAIObFBlXc9B7') 
//       .then(data => {
//         setPlaylist(data.body);
//       })
//       .catch(err => console.error(err));
//   }, [accessToken]);

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

//   const renderPlaylistTracks = (playlist) => {
//     return playlist.tracks.items.slice(0,6).map((item, index) => {
//       const track = item.track;
//       return (
//         <div key={index} className="playlist-track" onClick={() => chooseTrack(track)}>
//           <img 
//             src={track.album.images[0].url} 
//             alt={track.album.name} 
//             className="playlist-track__album-cover"
//           />
//           <div className="playlist-track__track-details">
//             <div className="playlist-track__track-title">{track.name}</div>
//             <div className="playlist-track__track-artist">{track.artists.map(artist => artist.name).join(", ")}</div>
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="dashStyle">
//       <div className="dashStyle__outer-wrap">
//         <div className="dashStyle__inner-wrap">

//           <div className="dashStyle__search">
// <div className="dashStyle__search-flex">
// <div className="dashStyle__btn">
//     <a href="/">LOGOUT</a>
//   </div>
//   <div className="dashStyle__search-input">
//     <Form.Control
//       type="search"
//       placeholder="Search Songs/Artists"
//       value={search}
//       onChange={(e) => setSearch(e.target.value)}
//     />
//   </div>
// </div>

//   <div className="dashStyle__playlist">
//     {playlist && (
//       <div className="dashStyle__playlist-wrap">
//         <h2 className="dashStyle__playlist-name">{playlist.name}</h2>
//         <div className="dashStyle__playlist-playlist">{renderPlaylistTracks(playlist)}</div>
//       </div>
//     )}
//   </div>
// </div>

//           <div className="dashStyle__lyric">
//             <video autoPlay muted loop className="dashStyle__video">
//               <source src={backgroundVideo} type="video/mp4" />
//             </video>
//             <h1 className="dashStyle__title">Welcome To Lyric Spot</h1>
//             <div className="dashStyle__lyric-result">
//               {lyrics !== "" ? lyrics : "Search for a song to see lyrics here."}
//             </div>
//           </div>
//         </div>
//         <div className="dashStyle__map">
//           {searchResults.slice(0, 8).map((track) => (
//             <TrackSearchResult
//               track={track}
//               key={track.uri}
//               chooseTrack={chooseTrack}
//             />
//           ))}
//         </div>

//       </div>
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
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe().then((data) => {
      setUserProfile(data.body);
    }).catch(err => console.error(err));
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getPlaylist('3HAVA7fMXxAIObFBlXc9B7').then(data => {
      setPlaylist(data.body);
    }).catch(err => console.error(err));
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
    axios.get("http://localhost:3001/lyrics", {
      params: {
        track: track.title,
        artist: track.artist,
      },
    }).then((res) => {
      setLyrics(res.data.lyrics);
    });
  }

  const renderPlaylistTracks = (playlist) => {
    return playlist.tracks.items.slice(0,6).map((item, index) => {
      const track = item.track;
      return (
        <div key={index} className="playlist-track" onClick={() => chooseTrack(track)}>
          <img src={track.album.images[0].url} alt={track.album.name} className="playlist-track__album-cover" />
          <div className="playlist-track__track-details">
            <div className="playlist-track__track-title">{track.name}</div>
            <div className="playlist-track__track-artist">{track.artists.map(artist => artist.name).join(", ")}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="dashStyle">
      <div className="dashStyle__outer-wrap">
        <div className="dashStyle__inner-wrap">

<div className="dashStyle__profile-wrap">
            <div className="spacer"></div> {/* Empty spacer for flex alignment */}

            {userProfile && (
              <div className="dashStyle__user-profile">
                <img src={userProfile.images[0].url} alt={userProfile.display_name} className="user-profile__image" />
                <div className="dashStyle__user-profile-name">{userProfile.display_name}</div>
              </div>
            )}
          </div>
          <div className="dashStyle__search">
            <div className="dashStyle__search-flex">
              <div className="dashStyle__btn">
                <a href="/">LOGOUT</a>
              </div>
              <div className="dashStyle__search-input">
                <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
       

<div className="dashStyle__lyric">
  <div className="dashStyle__lyric-result">
<h1 className="dashStyle__title">Welcome To Lyric Spot</h1>
             <div className="dashStyle__lyric-render">
             {lyrics !== "" ? lyrics : "Search for a song to see lyrics here."}
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
                  <div className="dashStyle__playlist-playlist">{renderPlaylistTracks(playlist)}</div>
                </div>
              )}
            </div>
          </div>



        </div>
        <div className="dashStyle__map">
          {searchResults.slice(0, 8).map((track) => (
            <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
          ))}
        </div>
      </div>
      <div className="player">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
}
