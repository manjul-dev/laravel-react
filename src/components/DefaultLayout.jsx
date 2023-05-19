import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
const DefaultLayout = () => {
  const { user, token, setUser, setToken, notification } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }
  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient
      .post('/logout')
      .then(()=>{
        setUser({});
        setToken(null);
      })
      .catch((err) => {
        throw err;
      })
  };

  useEffect(()=>{
    axiosClient
      .get("/user")
      .then((response) => {
        setUser(response.data);
      })
      .catch()
  },[]);
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
          <div>
            {user.name}
            <a href="#" onClick={onLogout} className="btn-logout">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      {notification && (<div className="notification">
        {notification}
      </div>)
      }
    </div>
  );
};

export default DefaultLayout;
