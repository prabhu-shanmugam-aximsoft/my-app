import { useAppDispatch, useAppSelector } from './useRedux';
import {
    fetchContactsRequest,
    fetchContactRequest,
    createContactRequest,
    updateContactRequest,
    deleteContactRequest,
    clearError,
} from '../redux/slices/contactSlice';



export const useContact = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector((state) => state.contact);

    const fetchAll = (params?: Record<string, any>) => {
        dispatch(fetchContactsRequest({ params }));
    };

    const fetchOne = (id: string) => {
        dispatch(fetchContactRequest({ id }));
    };

    const create = (data: Record<string, any>) => {
        dispatch(createContactRequest({ data }));
    };

    const update = (id: string, data: Record<string, any>) => {
        dispatch(updateContactRequest({ id, data }));
    };

    const remove = (id: number) => {
        dispatch(deleteContactRequest( {id }));
    };

    const reset = () => {
        dispatch(clearError());
    };

    return {
        data: contacts.data,
        selectedItem: contacts.selectedItem,
        loading: contacts.loading,
        error: contacts.error,
        fetchAll,
        fetchOne,
        create,
        update,
        remove,
        reset,
    };
};
