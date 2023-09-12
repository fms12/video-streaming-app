import { useEffect } from "react";
import "./App.css";
import { LoginScreen } from "./component";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./utils/userSlice";
import { Outlet } from "react-router-dom";

function App() {
  const user = useSelector(selectUser);
  // const  = useSelector(store )
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return <div className="app">{!user ? <LoginScreen /> : <Outlet />}</div>;
}

export default App;
