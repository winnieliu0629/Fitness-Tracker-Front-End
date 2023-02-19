import UserActivity from "../components/UserActivity";
import GuestActivity from "../components/GuestActivity";
import { useOutletContext } from "react-router-dom";

const Activities = () => {
    const [isLoggedIn, setIsLoggedIn] = useOutletContext();
    if (isLoggedIn) {
        return <UserActivity />;
    }
    return <GuestActivity />;
};

export default Activities;