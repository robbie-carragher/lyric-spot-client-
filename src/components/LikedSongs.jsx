import { useState, useEffect } from 'react';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";

const LikedSongs = ({ accessToken, chooseTrack }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get(
          'https://api.spotify.com/v1/me/tracks',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              limit: 20, // Adjust as needed
            },
          }
        );

        setLikedSongs(response.data.items);
      } catch (err) {
        console.error('Failed to fetch liked songs', err);
      }
    };

    fetchLikedSongs();
  }, [accessToken]);

  return (
    <div className='liked-songs-inner'>
     <div className="liked-songs-wrap">
     <div className="liked-songs-heart-icon">
     <CiHeart className="liked-songs-heart-icon"/>
     </div>
    
      <h3 className='liked-songs__title'>Liked Songs</h3>
     </div>
      <ul className='liked-songs__list'>
        {likedSongs.map((item, index) => (
          <li key={index} className='liked-song__item'>
            {/* Wrap each song in a clickable div to play the song */}
            <div
            className='liked-songs__itemTrack'
              onClick={() => chooseTrack(item.track)}
              style={{ cursor: 'pointer' }}
            >
              <img className='liked-songs__image'
                src={item.track.album.images[0].url}
                alt={item.track.name}
                // style={{ width: '50px', height: '50px', marginRight: '10px' }}
              />
             <p className="liked-songs__trackName"> {item.track.name}</p> 
             
             
         <div className="liked-songs__meta-wrap">
         <div className="liked-songs__by">by</div>
             
             <div className="liked-songs__artist">
             {item.track.artists.map((artist) => artist.name).join(', ')}
             </div>
         </div>




            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedSongs;
