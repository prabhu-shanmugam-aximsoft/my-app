import { useAppDispatch, useAppSelector } from './useRedux';
import {
    fetchUsersRequest,
    fetchUserRequest,
    createUserRequest,
    updateUserRequest,
    deleteUserRequest,
    clearError,
} from '../redux/slices/userSlice';



export const useUser = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.user);

    const fetchAll = (params?: Record<string, any>) => {
        dispatch(fetchUsersRequest({ params }));
    };

    const fetchOne = (id: string) => {
        dispatch(fetchUserRequest({ id }));
    };

    const create = (data: Record<string, any>) => {
        dispatch(createUserRequest({ data }));
    };

    const update = (id: string, data: Record<string, any>) => {
        dispatch(updateUserRequest({ id, data }));
    };

    const remove = (id: number) => {
        dispatch(deleteUserRequest( {id }));
    };

    const reset = () => {
        dispatch(clearError());
    };

    return {
        data: users.data,
        selectedItem: users.selectedItem,
        loading: users.loading,
        error: users.error,
        fetchAll,
        fetchOne,
        create,
        update,
        remove,
        reset,
    };
};
