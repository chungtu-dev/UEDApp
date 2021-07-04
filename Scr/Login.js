import * as React from 'react';
import {
    Container, Content, Body, Header, Title, Left,
    Icon, Button, Right, Form, Item, Label, Input, Text, View
} from 'native-base';
import {AsyncStorage} from 'react-native';
import { Auth } from '../Setup';
import { SignInUser } from '../apiService';

export function Login({ navigation }) {

    const [user, setUser] = React.useState();

    const[state, setState] = React.useState({
        emailAddress: '',
        password: '',
    });

    const onAuthStateChanged = user => {
        setUser(user)
    }

    React.useEffect(() => {
        const subscriber = Auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber;
    }, [])

    const signIn = async () =>{        
        if(!state.emailAddress){
            alert('Email Sai');
        }
        else if(!state.password){
            alert('Password Sai');
        }
        else{
            SignInUser(state.emailAddress, state.password)
            .then(data=>{
                alert(data);
                navigation.navigate('Home');
            })
        }
    }

    return (
        console.disableYellowBox = true,
        <Container>
            <Header>
                <Left/>
                <Body>
                    <Title>Sign In</Title>
                </Body>
                <Right/>
            </Header>
            <Content padder>
                <Form>
                    <Item floatingLabel>
                        <Label>Email Address</Label>
                        <Input
                            keyboardType='email-address'
                            value={state.emailAddress}
                            onChangeText={(text)=>setState({...state, emailAddress: text})}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry
                            value={state.password}
                            onChangeText={(text)=>setState({...state, password: text})}
                        />
                    </Item>

                    <Button block onPress={signIn}>
                        <Text>Sign In</Text>
                    </Button>

                    <View style={{marginTop:30}}></View>

                    <Button block onPress={()=>navigation.navigate('Signup')}>
                        <Text>Sign Up</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}