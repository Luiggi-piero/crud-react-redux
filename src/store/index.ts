/**
 * - Una store es como una caja donde se guarda el estado de toda la app
 * - Debemos organizar la caja en partes (en este caso una parte del estado es un arreglo de users)
 * - Cada parte/trozo se llama slice 👍
 */

import { configureStore, type Middleware } from "@reduxjs/toolkit"; // en store se guardara todo (estado, acciones, reducers)
import { toast } from "sonner";
import usersReducer, { UserWithId, rollbackUser } from "./users/slice";

/**
 * middleware ✅
 * - se ejecuta algo en mitad de algo
 * - funcion que recupera la store
 * - devuelve una funcion que recupera un metodo next que asu vez devuelve una funcion que recupera un metodo action
 *
 */
const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		// podemos hacer cosas antes de cualquier accion
		next(action);
		// podemos hacer cosas despues de cualquier accion
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	const previousState = store.getState();

	next(action);

	if (type === "users/deleteUserById") {
		const userIdToRemove = payload;
		const userToRemove = previousState.users.find(
			(user: UserWithId) => user.id === userIdToRemove,
		);

		// con esto falla para hacer el rollback
		// fetch(`https://jsonplaceholder.typicode.asfsaf/users/${userIdToRemove}`, {

		fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					return toast.success(
						`Usuario ${userIdToRemove} eliminado correctamente`,
					);
				}
				throw new Error("Error al eliminar el usuario");
			})
			.catch((err) => {
				toast.error(`Error al borrar el usuario ${userIdToRemove}`);
				// falla la accion y agrega el usuario en caso no exista
				if (userToRemove) store.dispatch(rollbackUser(userToRemove));
				console.log("Error", err);
			});
	}
	if (type === "users/addNewUser") {
		fetch("https://jsonplaceholder.typicode.com/users", {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((res) => {
				if (res.ok)
					toast.success(`Usuario ${payload.name} guardado correctamente`);
			})
			.catch((err) => {
				console.log("Error", err);
			});
	}
};

// Nuestra aplicacion tenemos que envolverla con un provider
export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	// Forma en redux toolkit v1 y anterior
	// middleware:[persistanceLocalStorageMiddleware]

	// Forma en redux toolkit v2 o superior
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			persistanceLocalStorageMiddleware,
			syncWithDatabase,
		);
	},
});

// tipando el estado que retorna
export type RootState = ReturnType<typeof store.getState>;

// tipando dispatch
export type AppDispatch = typeof store.dispatch;
