import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoutes";
import { AuthContextProvider } from "./context/AuthContext";
import { setupIonicReact } from "@ionic/react";

import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { Provider } from "react-redux";
import store from "./context/store";

/* Theme variables */

setupIonicReact();

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/home">
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Provider store={store}>
                  <Home />
                </Provider>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
