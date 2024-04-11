import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store";

// - Nuestra aplicacion tenemos que envolverla con un provider
// - Ahora desde cualquier parte de la aplicacion podemos leer
// la store y mandar acciones a la store
// para que genere nuevos estados ✅

// rome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
	</Provider>,
);
