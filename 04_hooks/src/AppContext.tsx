import React, { useReducer } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Cart {
  products: Array<Product>;
  shipping_value?: number;
}

type CartActionType = {
  type: 'ADD_PRODUCT' | 'DELETE_PRODUCT';
};

export default function AppContext() {
  const cart = useReducer(
    (state: Cart, action: CartActionType) => {
      switch (action.type) {
        case 'ADD_PRODUCT':
          return {
            ...state,
            products: [
              ...state.products,
              { id: 1, name: 'Produto', price: 20 },
            ],
          };

        default:
          return state;
      }
    },
    {
      products: [],
      shipping_value: 0,
    }
  );

  return <div />;
}
