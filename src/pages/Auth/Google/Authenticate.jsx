import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Authenticate() {
  const setToken = (token) => {
    localStorage.setItem("accessToken", token);
  };
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];
      console.log("ssssssssssssssssssssssssssssssssss".authCode);
      fetch(
        `http://localhost:8080/api/auth/outbound/login-google?code=${authCode}`,
        {
          method: "POST",
        },
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setToken(data.data?.accessToken);
          setIsLoggedin(true);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress></CircularProgress>
        <Typography>Authenticating...</Typography>
      </Box>
    </>
  );
}
