import * as React from 'react';
import {
    Container, Content, Body, Header, Title, Left,
    Icon, Button, Right, Form, Item, Label, Input, Text
}from 'native-base';
import { Auth } from '../Setup';
import { SignUpUser, SignInUser, SignOutUser } from '../apiService';

export function AuthScreen({ navigation }) {

    const signUp = () => {
        // alert(JSON.stringify(state)); //check user null
        SignUpUser(state.emailAddress, state.password)
        .then(data=>{
            alert(data);
        })
        .catch(error=>{
            alert(error);
        });        
    };

    const signIn = () => {
        SignInUser(state.emailAddress, state.password)
        .then(data=>{
            alert(data);
        })
        .catch(error=>{
            alert(error);
        }); 
     };

    const signOut = () => {
        SignOutUser()
        .then(data=>{
            alert(data);
        })
        .catch(error=>{
            alert(error);
        }); 
    };

    const [state, setState] = React.useState({
        emailAddress: '',
        password: '',
    });

    const [user, setUser] = React.useState();

    const onAuthStateChanged = user => {
        setUser(user)
    }

    React.useEffect(() => {
        const subscriber = Auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber;
    }, [])

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
                    <Title>UED Auth</Title>
                </Body>
                <Right>
                    {user && (
                        <Button transparent icon onPress={signOut}>
                            <Icon name='log-out'></Icon>
                        </Button>
                    )}
                </Right>
            </Header>

            <Content padder>
                {/* From Sign Up */}
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

                {/* From Sign In */}
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

                    <Button block onPress={signIn}>
                        <Text>Sign In</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    );
}
