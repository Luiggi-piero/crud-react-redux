// Creamos el primer slice (trozo del estado total)
// este trozo tiene las acciones para manipular esta parte
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Mario Balotelli misitich",
		email: "mario@gmail.com",
		github: "mario",
	},
	{
		id: "2",
		name: "Zlatan Ibrahimović",
		email: "zlatan@gmail.com",
		github: "zlatan",
	},
	{
		id: "3",
		name: "Arjen Robben",
		email: "arjen@gmail.com",
		github: "arjen",
	},
	{
		id: "4",
		name: "Didier Drogba",
		email: "didier@gmail.com",
		github: "didier",
	},
	{
		id: "5",
		name: "Marco Reus",
		email: "marco@gmail.com",
		github: "marco",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users", // nombre del slice
	initialState,
	reducers: {
		// PayloadAction<User> : tipa el payload
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
			// return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		// En caso falle la accion(eliminar) agrega el usuario que queria eliminar
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				state.push(action.payload);
				// return [...state, action.payload];
			}
		},
	},
});

export default usersSlice.reducer;

// exportando las acciones
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
