import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginGoogle() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const result = params.get("result");
    const user = params.get("user");

    localStorage.setItem("result", result);
    localStorage.setItem("user", user);

    const userObject = JSON.parse(user);

    if (userObject.username) {
      navigate("/");
    } else {
      navigate("/profile", { state: { newAccount: true } });
    }

    window.location.reload();
  }, [params, navigate]);

  return <div>Login</div>;
}
