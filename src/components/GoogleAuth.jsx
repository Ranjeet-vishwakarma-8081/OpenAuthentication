import { useState } from "react";
import {
  GoogleOAuthProvider,
  useGoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import ReactGA from "react-ga4";
const GoogleAuth = () => {
  const [user, setUser] = useState(null);

  // Login function
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Login Success:", response);
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
      )
        .then((res) => res.json())
        .then((userInfo) => {
          setUser(userInfo);
        })
        .catch((err) => console.error("Error fetching user info:", err));

      ReactGA.event({
        category: "button",
        action: "Click",
        label: "Login with Google",
      });
    },
    onError: () => {
      console.error("Login Failed");
    },
  });

  // Logout function
  const logout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Hi there!</h2>
      <h2>
        Welcome to
        <span
          style={{
            color: "#843248",
          }}
        >
          {" "}
          Ranjeet Vishwakarma
        </span>{" "}
        world!
      </h2>
      <h3>Login/Logout with Google OAuth 2.0 </h3>
      {!user ? (
        <button
          onClick={() => login()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4285F4",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login with Google
        </button>
      ) : (
        <div>
          <h3>Welcome, {user.name}!</h3>
          <img
            src={user.picture}
            alt="User Profile"
            style={{ borderRadius: "50%" }}
          />
          <p>Email: {user.email}</p>
          <button
            onClick={logout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#DB4437",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <GoogleOAuthProvider clientId="505234396794-qmdhnqtbd2hssh18p4i1lnfbq9jntr2p.apps.googleusercontent.com">
    <GoogleAuth />
  </GoogleOAuthProvider>
);

export default App;
