import create from "zustand";

interface User {
  id: number;
}

interface UserState {
  user: User | null;
  setUser: (newItems: User) => void;
}

export const useUser = create<UserState>()((set) => ({
  user: null,
  setUser: (actualUser: User) => set({ user: actualUser }),
}));
