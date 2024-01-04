import "./Login.scss"
import backgroundVideo from "../../../src/assets/images/backVideo.mp4";
  
  import "./Login.scss";

// const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=7fca14558bdf4a21a907c174dcf86239&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative";
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=7fca14558bdf4a21a907c174dcf86239&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative%20user-top-read%20user-read-currently-playing%20user-read-recently-played%20user-follow-read";

export default function Login() {
    return (
        <>
        <div className="logoLogin">
          <div className="logoLogin__image">
            <img src="./../../../src/assets/logo/gradient-logo-back.png" alt="" />
          </div>
        </div>
            <div className="login">
                <video autoPlay muted loop className="login__video">
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
                <a className="login__btn" href={AUTH_URL}>
                    <span className="login__btn-title">LOGIN TO LYRIC SPOT</span>
                </a>
            </div>
        </>
    );
}
