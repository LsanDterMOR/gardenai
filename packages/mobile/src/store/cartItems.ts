import create from "zustand";

interface Item {
  name: string;
  code: string;
  quantity: number;
}

interface CartItemsState {
  items: Item[];
  setCartItems: (newItems: Item[]) => void;
  setPlantQuantity: (newQuantity: number, index: number) => void;
}

export const useCartItem = create<CartItemsState>()((set, get) => ({
  items: [],
  quantity: 0,
  setCartItems: (newItems) => set({ items: newItems }),
  setPlantQuantity(newQuantity, index: number) {
    const items = get().items;
    items[index].quantity = newQuantity;
    set({ items: items });
  },
}));
