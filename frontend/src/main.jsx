import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "./components/ui/toaster";
import { StateProvider } from "./pages/admin-view/mainform";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <StateProvider>
        <App />
        <Toaster />
      </StateProvider>
    </Provider>
  </BrowserRouter>
);
