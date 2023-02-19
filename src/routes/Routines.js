import UserRoutine from "../components/UserRoutine";
import GuestRoutine from "../components/GuestRoutine";
import { useOutletContext } from "react-router-dom";

const Routines = () => {
    const [isLoggedIn, setIsLoggedIn] = useOutletContext();
    if (isLoggedIn) {
        return <UserRoutine />;
    }
    return <GuestRoutine />;
};

export default Routines;