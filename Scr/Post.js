import * as React from 'react';
import {
    Container, Content, Body, Header,
    Title, ListItem, Text, Left, Button, Icon,
    Right, Item, Input
} from 'native-base';
import { submitUser } from '../apiService';
import { database } from '../Setup';

export function PostScreen({ navigation }) {

    const [Id, setId] = React.useState();
    const [Name, setName] = React.useState('');
    const [Position, setPosition] = React.useState('');
    const [users, setUsers] = React.useState([]);

    const saveUsers = () => {
        submitUser(Id, Name, Position)
            .then(result => {
                setId(null);
                setName('');
                setPosition('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const deleteAllUsers = () => {
        database()
        .ref('users')
        .remove()
        .then(()=>{
            setUsers([]);
        });
    };

    const deleteUsers = Item => {
        database()
        .ref('users/'+Item.Id)
        .remove()
        .then(()=>{})
        .catch(err=>{
            console.log(err);
        });
    };

    const editUsers = Item => {
        setId(Item.Id);
        setName(Item.Name);
        setPosition(Item.Position);
    };

    React.useEffect(()=>{
        const userRef = database().ref('/users');
        const OnLoadingListener = userRef.on('value', snapshot =>{
            setUsers([]);
            snapshot.forEach(function(childSnapshot){
                setUsers(users=>[...users, childSnapshot.val()]);
            });
        });
        const childChangedListener = userRef.on('child_changed', snapshot=>{
            alert('Đã Sửa/Thay Đổi');
        })
        const childRemoveListener = userRef.on('child_removed', snapshot=>{
            alert('Đã Xóa');
        })
        return()=>{
            userRef.off('value', OnLoadingListener);
            userRef.off('child_changed', childChangedListener);
            userRef.off('child_removed', childRemoveListener);
        };
    },[]);

    return (
        console.disableYellowBox = true,
        <Container>
            <Header>
                <Left style={{ flex: 0.2 }}>
                    <Button transparent icon onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back'></Icon>
                    </Button>
                </Left>
                <Body style={{ flex: 1, justifyContent: 'center' }}>
                    <Title>Post</Title>
                </Body>
                <Right style={{ flex: 0.2 }}>
                    <Button transparent icon onPress={() => navigation.navigate('DataRTime')}>
                        <Icon name='create'></Icon>
                    </Button>
                </Right>
            </Header>
            <Content padder>
                {
                    users.map((item,index)=>(
                        <ListItem icon>
                    <Body>
                    <Text>
                    {'Name: '}
                    {item.Name}
                    </Text>

                    <Text>
                    {'Position: '}
                    {item.Position}
                    </Text>

                    </Body>
                </ListItem>
                    ))
                }
            </Content>
        </Container>
    );
}
