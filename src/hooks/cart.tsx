import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      // LOAD ITEMS FROM ASYNC STORAGE
      const productList = await AsyncStorage.getItem('@GoMarketplace:products');

      if (productList) {
        setProducts(JSON.parse(productList));
      }
    }
    loadProducts();
  }, []);

  // Monitora as mudanças em product e salva no AsyncStorage
  // useEffect(() => {
  //   async function storeProducts(): Promise<void> {
  //     await AsyncStorage.setItem(
  //       '@GoMarketplace:products',
  //       JSON.stringify(products),
  //     );
  //   }

  //   storeProducts();
  // }, [products]);

  const addToCart = useCallback(
    async (product: Product) => {
      // ADD A NEW ITEM TO THE CART

      const checkProductInCart = products.find(item => item.id === product.id);

      if (checkProductInCart) {
        const newProducts = products;

        const productIndex = newProducts.findIndex(
          item => item.id === product.id,
        );
        newProducts[productIndex].quantity += 1;

        setProducts([...newProducts]);

        await AsyncStorage.setItem(
          '@GoMarketplace:products',
          JSON.stringify(newProducts),
        );
      } else {
        const formattedProduct: Product = {
          id: product.id,
          title: product.title,
          image_url: product.image_url,
          price: product.price,
          quantity: 1,
        };
        const newProducts = [...products, formattedProduct];
        setProducts(newProducts);
        await AsyncStorage.setItem(
          '@GoMarketplace:products',
          JSON.stringify(newProducts),
        );
      }
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      // TODO INCREMENTS A PRODUCT QUANTITY IN THE CART
      const newProducts = products;

      const productIndex = products.findIndex(item => item.id === id);

      newProducts[productIndex].quantity += 1;

      setProducts([...newProducts]);

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const newProducts = products;

      const productIndex = newProducts.findIndex(item => item.id === id);

      newProducts[productIndex].quantity -= 1;

      if (products[productIndex].quantity <= 0) {
        newProducts.splice(productIndex, 1);
      }

      setProducts([...newProducts]);

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
