
import "./Login.scss"


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=7fca14558bdf4a21a907c174dcf86239&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function Login() {
    return (
      
      <div
      className="login">
     
   
      <a className="login__btn" href={AUTH_URL}>
        Login With Lyric Spot
      </a>
    </div>
    )
  }
  