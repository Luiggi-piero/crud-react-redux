import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser";
import { ListOfUsers } from "./components/ListOfUsers";

function App() {
	return (
		<>
			<ListOfUsers />
			<CreateNewUser />
			<Toaster richColors />
		</>
	);
}

export default App;

/**
 *
 * - Linter rome (formateador y corrección de errores)
 * - libreria tremor (gráficas) + tailwind
 * - Heroicons (iconos)
 *
 */

/**
 * DATOS💡
 * 1. En reducer trata de no llamar a apis, mejor usa react query(revisar)
 * 2. Todo lo que tenga que ver con manipular el estado en reducer
 */
