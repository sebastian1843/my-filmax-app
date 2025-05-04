import { create } from "zustand";

export interface ModalStoreInterface {
    movieId: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModa: () => void;
};

const useInfoModal = create<ModalStoreInterface>((set) => ({
    movieId: "",
    isOpen: false,
    openModal: (movieId: string) => set({ isOpen: true, movieId }),
    closeModa: () => set({ isOpen: false, movieId: undefined }),


}));        

export default useInfoModal;