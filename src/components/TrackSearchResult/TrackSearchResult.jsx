// export default function TrackSearchResult({ track, chooseTrack }) {
//     function handlePlay() {
//       chooseTrack(track)
//     }
  
//     return (
//       <div
//         className="d-flex m-2 align-items-center"
//         style={{ cursor: "pointer" }}
//         onClick={handlePlay}
//       >
//         {/* Add an alt attribute to the img tag */}
//         <img 
//           src={track.albumUrl} 
//           alt={`${track.title} by ${track.artist}`} // Meaningful description
//           style={{ height: "64px", width: "64px" }} 
//         />
//         <div className="ml-3">
//           <div>{track.title}</div>
//           <div className="text-muted">{track.artist}</div>
//         </div>
//       </div>
//     )
//   }

import "./TrackSearchResult.scss"

  export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
      chooseTrack(track)
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
        <div className="ml-3">
          <div>{track.title}</div>
          <div className="text-muted">{track.artist}</div>
        </div>
      </div>
    )
  }