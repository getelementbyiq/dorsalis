import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { UserAuth } from "../index";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/userByIdSlice";
import { auth, db } from "../../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Theme } from "../../../Theme";
import GoogleLogo from "../GoogleLogo";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SignUp = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [ownRestaurants, setOwnRestaurants] = useState([]);
  const [prefereces, setPreferences] = useState([]);
  const [savedRestaurants, setSavedRestaurants] = useState([]);
  const [createdMenus, setCreatedMenus] = useState([]);
  const [savedMenus, setSavedMenus] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [userType, setUserType] = useState(false);
  const [error, setError] = useState("");
  const createdAt = serverTimestamp();
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  console.log("userType", userType);

  const handleChange = () => {
    setUserType((open) => !open);
  };
  const { register, handleSubmit } = useForm();

  const handleReg = async (data) => {
    const { email, password, username } = data;

    setError("");

    try {
      // Schritt 1: Registrieren Sie den Benutzer in Firebase Auth
      const userCredential = await createUser(email, password);
      const user = userCredential.user;
      if (userType) {
        const usersCollectionRef = collection(db, "usersOwner"); // Ändern Sie "users" in den Namen Ihrer Firestore-Sammlung

        await addDoc(usersCollectionRef, {
          uid: user.uid,
          email,
          username, // Hinzufügen des Benutzernamens
          avatarUrl,
          ownRestaurants,
          followers,
          followed,
          createdAt,
          userType: "ownerUser",
        });
      } else {
        const usersCollectionRef = collection(db, "users"); // Ändern Sie "users" in den Namen Ihrer Firestore-Sammlung

        await addDoc(usersCollectionRef, {
          uid: user.uid,
          email,
          username, // Hinzufügen des Benutzernamens
          avatarUrl, // Hinzufügen der Avatar-URL
          savedRestaurants,
          createdMenus,
          savedMenus,
          savedProducts,
          followers,
          followed,
          createdAt,
          userType: "normalUser",
        });
      }
      // Schritt 2: Fügen Sie Benutzerdaten zu Firebase Firestore hinzu

      dispatch(setUser(user));

      await navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  // const handleGoogle = async (e) => {
  //   const provider = await new GoogleAuthProvider();
  //   navigate("/");
  //   return signInWithPopup(auth, provider);
  // };

  const handleGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Fehler bei der Anmeldung", error); // Fehlerbehandlung
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        flexGrow: "1",
        flexDirection: "column",
        gap: "40px",
        // border: "1px solid red",
        mt: "80px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "350px",
          // border: "1px solid red",
          flexDirection: "column",
          gap: "24px",
          px: "80px",
          // background: "rgba(225,225,225,0.2)",
          borderRadius: "32px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              ...Theme.fontPrimary,
              fontSize: "32px",
              color: "#fff",
            }}
          >
            Sign Up
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(handleReg)}>
          <Box sx={{ mb: "8px" }}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              {...register("email")}
              InputProps={{
                style: { borderRadius: "2px", backgroundColor: "#F4F4F4" },
              }}
            />
          </Box>
          <Box sx={{ mb: "8px" }}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              {...register("password")}
              InputProps={{
                style: { borderRadius: "2px", backgroundColor: "#F4F4F4" },
              }}
            />
          </Box>
          <Box sx={{ mb: "8px" }}>
            <TextField
              fullWidth
              label="Username"
              {...register("username")}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                style: { borderRadius: "2px", backgroundColor: "#F4F4F4" },
              }}
            />
          </Box>
          {/* <Box>
            <TextField
              fullWidth
              label="Avatar URL"
              {...register("avatarUrl")}
              onChange={(e) => setAvatarUrl(e.target.value)}
              InputProps={{ style: { borderRadius: "8px" } }}
            />
          </Box> */}

          <Box>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                py: "16px",
                borderRadius: "2px",
                backgroundColor: "#F4F4F4",
                color: "rgba(0,0,0,0.4)",
                mb: "16px",
                "&&:hover": {
                  backgroundColor: "#000",
                  color: "#EBFF00",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontFamily: "Knewave, system-ui",
                  fontWeight: "400",
                  fontStyle: "normal",
                  lineHeight: "90%",
                }}
              >
                lets do it
              </Typography>
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  ...Theme.fontPrimary,
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                or
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "32px",
                justifyContent: "center",
                mt: "16px",
              }}
            >
              <GoogleLogo handleGoogle={handleGoogle} />
              {/* <Typography
                onClick={handleGoogle}
                sx={{
                  ...Theme.fontPrimary,
                  color: "#fff",
                  fontSize: "24px",
                  cursor: "pointer",
                  transition: "150ms",

                  "&&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                Google
              </Typography> */}
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
