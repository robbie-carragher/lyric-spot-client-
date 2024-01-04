// // // import { useState, useEffect } from "react";
// // // import useAuth from "../../components/useAuth";
// // // import Player from "../../components/Player";
// // // import TrackSearchResult from "../../components/TrackSearchResult/TrackSearchResult";
// // // import { Form } from "react-bootstrap";
// // // import SpotifyWebApi from "spotify-web-api-node";
// // // import axios from "axios";
// // // import "./Dashboard.scss";
// // // // import { Link } from "react-router-dom";
// // // import backgroundVideo from "./../../../src/assets/images/backVideo.mp4"; // Ensure this path is correct

// // // const spotifyApi = new SpotifyWebApi({
// // //   clientId: "7fca14558bdf4a21a907c174dcf86239",
// // // });

// // // export default function Dashboard({ code }) {
// // //   const accessToken = useAuth(code);
// // //   const [search, setSearch] = useState("");
// // //   const [searchResults, setSearchResults] = useState([]);
// // //   const [playingTrack, setPlayingTrack] = useState();
// // //   const [lyrics, setLyrics] = useState("");

// // //   useEffect(() => {
// // //     if (!accessToken) return;
// // //     spotifyApi.setAccessToken(accessToken);
// // //     console.log(accessToken)
// // //     if (search === "") {
// // //       spotifyApi.searchTracks("a").then((res) => {
// // //         setSearchResults(
// // //           res.body.tracks.items.map((track) => {
// // //             console.log(track);
// // //             const smallestAlbumImage = track.album.images.reduce(
// // //               (smallest, image) => {
// // //                 if (image.height < smallest.height) return image;
// // //                 return smallest;
// // //               },
// // //               track.album.images[0]
// // //             );
// // //             return {
// // //               artist: track.artists[0].name,
// // //               title: track.name,
// // //               uri: track.uri,
// // //               albumUrl: smallestAlbumImage.url,
// // //             };
// // //           })
// // //         );
// // //       });
// // //     }
// // //   }, [accessToken, search]);

// // //   useEffect(() => {
// // //     if (!search) return;
// // //     if (!accessToken) return;
// // //     let cancel = false;
// // //     spotifyApi.searchTracks(search).then((res) => {
// // //       if (cancel) return;
// // //       setSearchResults(
// // //         res.body.tracks.items.map((track) => {
// // //           const smallestAlbumImage = track.album.images.reduce(
// // //             (smallest, image) => {
// // //               if (image.height < smallest.height) return image;
// // //               return smallest;
// // //             },
// // //             track.album.images[0]
// // //           );
// // //           return {
// // //             artist: track.artists[0].name,
// // //             title: track.name,
// // //             uri: track.uri,
// // //             albumUrl: smallestAlbumImage.url,
// // //           };
// // //         })
// // //       );
// // //     });

// // //     return () => {
// // //       cancel = true;
// // //     };
// // //   }, [search, accessToken]);

// // //   function chooseTrack(track) {
// // //     setPlayingTrack(track);
// // //     setSearch("");
// // //     setLyrics("");

// // //     axios
// // //       .get("http://localhost:3001/lyrics", {
// // //         params: {
// // //           track: track.title,
// // //           artist: track.artist,
// // //         },
// // //       })
// // //       .then((res) => {
// // //         setLyrics(res.data.lyrics);
// // //       });
// // //   }

// // //   return (
// // //     <div className="dashStyle">
// // //       <div className="dashStyle__outer-wrap">
// // //         <div className="dashStyle__inner-wrap">
// // //           <div className="dashStyle__search">
// // //             <div className="dashStyle__btn">
// // //               {/* <Link to="/" className="btn btn-primary">Logout</Link> */}
// // //               <a href="/">LOGOUT</a>
// // //             </div>
// // //             <div className="dashStyle__search-input">
// // //               <Form.Control
// // //                 type="search"
// // //                 placeholder="Search Songs/Artists"
// // //                 value={search}
// // //                 onChange={(e) => setSearch(e.target.value)}
// // //               />
// // //             </div>
// // //           </div>

// // //           <div className="dashStyle__lyric">
// // //             <video autoPlay muted loop className="dashStyle__video">
// // //               <source src={backgroundVideo} type="video/mp4" />
// // //               Your browser does not support HTML5 video.
// // //             </video>
// // //             <h1 className="dashStyle__title">Welcome To Lyric Spot</h1>
// // //             <div className="dashStyle__lyric-result">
// // //               {lyrics !== "" ? lyrics : "Search for a song to see lyrics here."}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="dashStyle__map">
// // //           {searchResults.slice(0, 8).map((track) => (
// // //             <TrackSearchResult
// // //               track={track}
// // //               key={track.uri}
// // //               chooseTrack={chooseTrack}
// // //             />
// // //           ))}
// // //         </div>
// // //       </div>

// // //       <div className="player">
// // //         <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useState, useEffect } from "react";
// // import useAuth from "../../components/useAuth";
// // import Player from "../../components/Player";
// // import TrackSearchResult from "../../components/TrackSearchResult/TrackSearchResult";
// // import { Form } from "react-bootstrap";
// // import SpotifyWebApi from "spotify-web-api-node";
// // import axios from "axios";
// // import "./Dashboard.scss";
// // import backgroundVideo from "./../../../src/assets/images/backVideo.mp4";

// // const spotifyApi = new SpotifyWebApi({
// //   clientId: "7fca14558bdf4a21a907c174dcf86239",
// // });

// // export default function Dashboard({ code }) {
// //   const accessToken = useAuth(code);
// //   const [search, setSearch] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [playingTrack, setPlayingTrack] = useState();
// //   const [lyrics, setLyrics] = useState("");
// //   const [playlist, setPlaylist] = useState(null);

// //   useEffect(() => {
// //     if (!accessToken) return;
// //     spotifyApi.setAccessToken(accessToken);

// //     if (search === "") {
// //       spotifyApi.searchTracks("a").then((res) => {
// //         setSearchResults(
// //           res.body.tracks.items.map((track) => {
// //             const smallestAlbumImage = track.album.images.reduce(
// //               (smallest, image) => {
// //                 if (image.height < smallest.height) return image;
// //                 return smallest;
// //               },
// //               track.album.images[0]
// //             );
// //             return {
// //               artist: track.artists[0].name,
// //               title: track.name,
// //               uri: track.uri,
// //               albumUrl: smallestAlbumImage.url,
// //             };
// //           })
// //         );
// //       });
// //     }

// //     // Fetching playlist data
// //     const playlistId = "3HAVA7fMXxAIObFBlXc9B7?si=d811fef68b164577"; // Replace with the desired playlist ID
// //     spotifyApi.getPlaylist(playlistId)
// //       .then((data) => {
// //         setPlaylist(data.body);
// //         console.log(playlist)
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching playlist data:", err);
// //       });
// //   }, [accessToken, search]);

// //   useEffect(() => {
// //     if (!search) return setSearchResults([]);
// //     if (!accessToken) return;
    
// //     let cancel = false;
// //     spotifyApi.searchTracks(search).then((res) => {
// //       if (cancel) return;
// //       setSearchResults(
// //         res.body.tracks.items.map((track) => {
// //           const smallestAlbumImage = track.album.images.reduce(
// //             (smallest, image) => {
// //               if (image.height < smallest.height) return image;
// //               return smallest;
// //             },
// //             track.album.images[0]
// //           );
// //           return {
// //             artist: track.artists[0].name,
// //             title: track.name,
// //             uri: track.uri,
// //             albumUrl: smallestAlbumImage.url,
// //           };
// //         })
// //       );
// //     });

// //     return () => (cancel = true);
// //   }, [search, accessToken]);

// //   function chooseTrack(track) {
// //     setPlayingTrack(track);
// //     setSearch("");
// //     setLyrics("");

// //     axios
// //       .get("http://localhost:3001/lyrics", {
// //         params: {
// //           track: track.title,
// //           artist: track.artist,
// //         },
// //       })
// //       .then((res) => {
// //         setLyrics(res.data.lyrics);
// //       });
// //   }

// //   return (
// //     <div className="dashStyle">
// //       <div className="dashStyle__outer-wrap">
// //         <div className="dashStyle__inner-wrap">
// //           <div className="dashStyle__search">
// //             <div className="dashStyle__btn">
// //               <a href="/">LOGOUT</a>
// //             </div>
// //             <div className="dashStyle__search-input">
// //               <Form.Control
// //                 type="search"
// //                 placeholder="Search Songs/Artists"
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //               />
// //             </div>
// //           </div>

// //           <div className="dashStyle__lyric">
// //             <video autoPlay muted loop className="dashStyle__video">
// //               <source src={backgroundVideo} type="video/mp4" />
// //               Your browser does not support HTML5 video.
// //             </video>
// //             <h1 className="dashStyle__title">Welcome To Lyric Spot</h1>
// //             <div className="dashStyle__lyric-result">
// //               {lyrics !== "" ? lyrics : "Search for a song to see lyrics here."}
// //             </div>
// //           </div>
// //         </div>

// //         <div className="dashStyle__map">
// //           {searchResults.slice(0, 8).map((track) => (
// //             <TrackSearchResult
// //               track={track}
// //               key={track.uri}
// //               chooseTrack={chooseTrack}
// //             />
// //           ))}

// //                   {/* Displaying playlist */}
// //         {playlist && (
// //   <div className="playlist-details">
// //     <h2>{playlist.name}</h2>
// //     {playlist.description && <p>{playlist.description}</p>}
// //     <div className="playlist-tracks">
// //       {playlist.tracks.items.map((item, index) => (
// //         <div key={index} className="track">
// //           <div className="track-info">
// //             <span className="track-name">{item.track.name}</span>
// //             <span className="track-artist">
// //               {item.track.artists.map(artist => artist.name).join(", ")}
// //             </span>
// //             <span className="track-album">{item.track.album.name}</span>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // )}
// //         </div>


// //       </div>

// //       <div className="player">
// //         <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from "react";
// import useAuth from "../../components/useAuth";
// import Player from "../../components/Player";
// import TrackSearchResult from "../../components/TrackSearchResult/TrackSearchResult";
// import { Form } from "react-bootstrap";
// import SpotifyWebApi from "spotify-web-api-node";
// import axios from "axios";
// import "./Dashboard.scss";
// import backgroundVideo from "./../../../src/assets/images/backVideo.mp4";

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
//     return playlist.tracks.items.map((item, index) => {
//       // console.log(playlist)
//       const track = item.track;
//       return (
//         <div key={index} className="playlist-track" onClick={() => chooseTrack(track)}>
//           <img 
//             src={track.album.images[0].url} 
//             alt={track.album.name} 
//             className="album-cover"
//           />
//           <div className="track-details">
//             <div className="track-title">{track.name}</div>
//             <div className="track-artist">{track.artists.map(artist => artist.name).join(", ")}</div>
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
//             <div className="dashStyle__btn">
//               <a href="/">LOGOUT</a>
//             </div>
//             <div className="dashStyle__search-input">
//               <Form.Control
//                 type="search"
//                 placeholder="Search Songs/Artists"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//           </div>

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



// {playlist && (
//           <div>
//             <h2>{playlist.name}</h2>
//             <div>{renderPlaylistTracks(playlist)}</div>
//           </div>
//         )}
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

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getPlaylist('3HAVA7fMXxAIObFBlXc9B7') 
      .then(data => {
        setPlaylist(data.body);
      })
      .catch(err => console.error(err));
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
    return playlist.tracks.items.slice(0,6).map((item, index) => {
      const track = item.track;
      return (
        <div key={index} className="playlist-track" onClick={() => chooseTrack(track)}>
          <img 
            src={track.album.images[0].url} 
            alt={track.album.name} 
            className="playlist-track__album-cover"
          />
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
          <div className="dashStyle__search">
            <div className="dashStyle__btn">
              <a href="/">LOGOUT</a>

             {/* <renderPlaylistTracks />  */}
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
            <video autoPlay muted loop className="dashStyle__video">
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            <h1 className="dashStyle__title">Welcome To Lyric Spot</h1>
            <div className="dashStyle__lyric-result">
              {lyrics !== "" ? lyrics : "Search for a song to see lyrics here."}
            </div>
          </div>
        </div>
        <div className="dashStyle__map">
          {searchResults.slice(0, 8).map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
        {playlist && (
          <div>
            <h2>{playlist.name}</h2>
            <div>{renderPlaylistTracks(playlist)}</div>
          </div>
        )}
      </div>
      <div className="player">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
}
