import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState();

  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    setErrors(null);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <h1 className="title">Login into your account</h1>
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Register <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
