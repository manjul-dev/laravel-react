import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const GuestLayout = () => {
    const { token, setToken } = useStateContext();
    if (token) {
        return <Navigate to="/users" />
    }
    return (
        <div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default GuestLayout;