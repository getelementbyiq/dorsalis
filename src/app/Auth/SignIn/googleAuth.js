import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { google } from "googleapis";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = `${process.env.REACT_APP_GOOGLE_ID}.apps.googleusercontent.com`;

const App = () => {
  const handleLoginSuccess = (response) => {
    const { tokenId } = response;
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      process.env.REACT_APP_GOOGLE_FONTS_API_KEY,
      "http://localhost:3000"
    );
    oauth2Client.setCredentials({ token: tokenId });

    const drive = google.drive({ version: "v3", auth: oauth2Client });
    drive.files.list({ pageSize: 10 }, (err, res) => {
      if (err) return console.error("Error fetching files:", err);
      console.log("Files:", res.data.files);
    });
  };

  return (
    <div>
      <h1>Google Docs Integration</h1>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleLoginSuccess}
        onFailure={(error) => console.error("Login Failed:", error)}
        scope="https://www.googleapis.com/auth/drive"
      />
    </div>
  );
};

export default App;
