import React, { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  LogoText,
  CartButton,
  CartButtonText,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';
import { Text, View } from 'react-native';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    // TODO RETURN THE SUM OF THE PRICE FROM ALL ITEMS IN THE CART
    const totalSum = products.reduce(
      (total, { price, quantity }) => quantity * price + total,
      0,
    );
    return formatValue(totalSum);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    // TODO RETURN THE SUM OF THE QUANTITY OF THE PRODUCTS IN THE CART
    const productCount = products.reduce(
      (total, { quantity }) => quantity + total,
      0,
    );
    return productCount;
  }, [products]);

  return (
    <Container>
      <LogoText>ton camisas</LogoText>

      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <CartButtonText>{`${totalItensInCart}`}</CartButtonText>
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
      </CartButton>
    </Container>
  );
};

export default FloatingCart;
