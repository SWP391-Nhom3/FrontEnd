import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setToken } from "../../../utils/localStorageService";

export default function Authenticate() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    console.log(window.location.href);

    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

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
          console.log(data);

          setToken(data.result?.token);
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
      <div>Authenticating...</div>
    </>
  );
}
