import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  top: 0px;

  width: 100%;

  flex-direction: row;
  background: #00c700;

  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
`;

export const LogoText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;

export const CartButton = styled.TouchableOpacity`
  flex-direction: row;
  background: #00c700;

  padding: 20px 20px;

  justify-content: center;
`;

export const CartButtonText = styled.Text`
  font-weight: bold;
  color: #fff;
  background-color: red;
  font-size: 12px;

  position: absolute;
  top: 15px;
  left: 35px

  width: 15px;
  text-align: center;

  border-radius: 10px;
  z-index: 10
`;
