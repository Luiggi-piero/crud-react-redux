// Creando CUSTOM HOOKS que usaremos en toda la app para MANIPULAR el estado de users
import { User, UserId, addNewUser, deleteUserById } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
	// para enviar la accion
	const dispatch = useAppDispatch();

	// envia la accion(addNewUser) a traves del dispatch
	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }));
	};

	// envia la accion(deleteUserById) a traves del dispatch
	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { addUser, removeUser };
};
