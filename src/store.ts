import { create } from 'zustand';
import { ElementType } from './types';

interface EditorState {
  elements: ElementType[];
  selectedElement: ElementType | null;
  cart: Array<{ product: any; quantity: number }>;
  addElement: (element: ElementType) => void;
  updateElement: (id: string, updates: Partial<ElementType>) => void;
  removeElement: (id: string) => void;
  setSelectedElement: (element: ElementType | null) => void;
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  elements: [],
  selectedElement: null,
  cart: [],
  addElement: (element) =>
    set((state) => ({ elements: [...state.elements, element] })),
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    })),
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
    })),
  setSelectedElement: (element) => set({ selectedElement: element }),
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),
  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));