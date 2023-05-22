import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import { useSelector } from "react-redux";
import { LoginView, RegisterView } from "./views";

import "./App.css";

function App() {
  const user = useSelector((state: any) => state.user);
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          {routes.map((route) => {
            if (route.authenticated) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    user.obj || localStorage.getItem("user") ? (
                      route.element
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
              );
            }
          })}
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
