import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Error, HomeScreen, MyList, VideoPlayer } from "./component";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./utils/store";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/player",
        element: <VideoPlayer />,
      },
      {
        path: "/mylist",
        element: <MyList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
