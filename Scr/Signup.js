import * as React from 'react';
import {
    Container, Content, Body, Header, Title, Left,
    Icon, Button, Right, Form, Item, Label, Input, Text
} from 'native-base';
import { Auth } from '../Setup';
import { SignUpUser } from '../apiService';

export function Signup({ navigation }) {

    const [state, setState] = React.useState({
        emailAddress: '',
        password: '',
    });

    const [user, setUser] = React.useState();

    const onAuthStateChanged = user => {
        setUser(user);
    };

    React.useEffect(() => {
        const subcriber = Auth().onAuthStateChanged(onAuthStateChanged);
        return subcriber;
    }, [])

    const signUp = () => {
        SignUpUser(state.emailAddress, state.password)
            .then(data => {
                // alert(data);
                alert('Đăng Kí Thành Công')
                navigation.navigate('Login');
            })
            .catch(error => {
                alert(error);
            });
    };

    return (
        console.disableYellowBox = true,
        <Container>
            <Header>
                <Left>
                    <Button transparent icon onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back'></Icon>
                    </Button>
                </Left>
                <Body>
                    <Title>Sign Up</Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <Form>
                    <Item floatingLabel>
                        <Label>Email Address</Label>
                        <Input
                            keyboardType='email-address'
                            value={state.emailAddress}
                            onChangeText={(text) => setState({ ...state, emailAddress: text })}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry
                            value={state.password}
                            onChangeText={(text) => setState({ ...state, password: text })}
                        />
                    </Item>

                    <Button block onPress={signUp}>
                        <Text>Sign Up</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}