import {useLocation} from "react-router-dom";

const HIDDEN_IN_PAGES_BY_DEFAULT = ['/signIn', "/signUp", "/memoization"];

export default function useSidebarStatus() {
    const location = useLocation();
    return !HIDDEN_IN_PAGES_BY_DEFAULT.includes(location.pathname);
};