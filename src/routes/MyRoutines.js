import { useOutletContext } from "react-router-dom";

const MyRoutines = () => {
    const [isLoggedIn, setIsLoggedIn] = useOutletContext();
    
};

export default MyRoutines;