import { useEffect, useState } from "react";
import { ProfileProvider } from "./context/ProfileContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

/** সহজ হ্যাশ-ভিত্তিক রাউটিং: "#/admin" -> এডিটর, বাকি সব -> পোর্টফোলিও */
function useIsAdminRoute(): boolean {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash.startsWith("#/admin"));

  useEffect(() => {
    const onChange = () => setIsAdmin(window.location.hash.startsWith("#/admin"));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return isAdmin;
}

export default function App() {
  const isAdmin = useIsAdminRoute();

  useEffect(() => {
    if (isAdmin) window.scrollTo({ top: 0 });
  }, [isAdmin]);

  return (
    <ProfileProvider>
      {isAdmin ? <Admin /> : <Home />}
    </ProfileProvider>
  );
}
