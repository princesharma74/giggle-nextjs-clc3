import { create } from "zustand"
import { Platform } from "@prisma/client";

interface VerifyModalState {
    platform: Platform;
    userid: string;
    isOpen: boolean;
    loading: boolean;
    uuid: string;
    verified: boolean;
    setUUID: (uuid: string) => void;
    onLoading: () => void;
    onStopLoading: () => void;
    onOpen: () => void;
    onClose: () => void;
    setPlatform: (platform: Platform) => void;
}


export const useVerifyModal = create<VerifyModalState>((set) => ({
    platform: Platform.codeforces,
    userid: "",
    isOpen: false,
    loading: false,
    uuid: Math.random().toString(36),
    verified: false,
    setUUID: (uuid: string) => set({ uuid }),
    setUserId: (userid: string) => set({ userid }),
    onLoading: () => set({ loading: true }),
    onStopLoading: () => set({ loading: false }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setPlatform: (platform: Platform) => set({ platform }),
}));