import { create } from "zustand";
interface MobileNavState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useMobileNavState = create<MobileNavState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));