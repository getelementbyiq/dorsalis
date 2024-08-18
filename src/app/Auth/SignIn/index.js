import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { UserAuth } from "../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import { Theme } from "../../../Theme";
import GoogleLogo from "../GoogleLogo";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [userName, setUserName] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const { register, handleSubmit } = useForm();

  const handleLog = async (data) => {
    const { email, password } = data;
    setError("");
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.log("error-index-file-submit:", error.message);
    }
  };

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
            Sign In
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(handleLog)}>
          <Box sx={{ mb: "8px" }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register("email")}
              InputProps={{
                style: { borderRadius: "2px", backgroundColor: "#F4F4F4" },
              }}
            />
          </Box>
          <Box sx={{ mb: "16px" }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password")}
              InputProps={{
                style: { borderRadius: "2px", backgroundColor: "#F4F4F4" },
              }}
            />
          </Box>
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
                  color: "#FF00D6",
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
                lets go
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

export default SignIn;
