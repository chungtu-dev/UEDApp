import * as React from 'react';
import {
  Container, Content, Body, Header,
  Title, ListItem, Text, Left, Right, Button, Icon
} from 'native-base';
import { SignOutUser } from '../apiService';

export function HomeScreen({ navigation }) {
  const signOut = () => {
    SignOutUser()
      .then(data => {
        alert(data);
        navigation.navigate('Login')
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    console.disableYellowBox = true,
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>UED App/Home</Title>
        </Body>
        <Right>
          <Button transparent icon onPress={signOut}>
            <Icon name='log-out'></Icon>
          </Button>
        </Right>
      </Header>
      <Content>
        <ListItem onPress={() => navigation.navigate('DataRTime')}>
          <Text>Realtime Data</Text>
        </ListItem>
      </Content>
    </Container>
  );
}