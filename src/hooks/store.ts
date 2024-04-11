import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

/**
 * useDispatch: enviar acciones
 * useSelector: obtener el estado
 */

// Creando CUSTOM HOOKS que usaremos en toda la app para acceder al estado

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch; // para enviar acciones
