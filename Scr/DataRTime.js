import * as React from 'react';
import {
    Container, Content, Body, Header,
    Title, ListItem, Text, Left, Button, Icon,
    Right, Item, Input
} from 'native-base';
import { submitUser } from '../apiService';
import { database } from '../Setup';

export function DataRTimeScreen({ navigation }) {

    const [Id, setId] = React.useState();
    const [Name, setName] = React.useState('');
    const [Position, setPosition] = React.useState('');
    const [users, setUsers] = React.useState([]);
    
    const[state, setState] = React.useState({
        emailAddress: '',
        password: '',
    });
    

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
        .ref('posts')
        .remove()
        .then(()=>{
            setUsers([]);
        });
    };

    const deleteUsers = Item => {
        database()
        .ref('posts/'+Item.Id)
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
        const userRef = database().ref('/posts');
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
                {/* <Left style={{ flex: 0.2 }}>
                    <Button transparent icon onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back'></Icon>
                    </Button>
                </Left> */}
                <Body style={{ flex: 1, justifyContent: 'center' }}>
                    <Title>Real Time Database</Title>
                </Body>
                <Right style={{ flex: 0.2 }}>
                    <Button transparent icon onPress={deleteAllUsers}>
                        <Icon name='trash'></Icon>
                    </Button>
                    <Button transparent icon onPress={saveUsers}>
                        <Icon name='save'></Icon>
                    </Button>
                    <Button transparent icon onPress={() => navigation.navigate('Post')}>
                        <Icon name='home'></Icon>
                    </Button>
                </Right>
            </Header>

            <Header searchBar rounded>
                <Item>
                    <Input
                        placeholder='Name'
                        value={Name}
                        onChangeText={(text) => setName(text)} />
                </Item>
                <Item>
                    <Input
                        keyboardType='numeric'
                        placeholder='Position'
                        value={Position}
                        onChangeText={(text) => setPosition(text)} />
                </Item>
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
                    <Right>
                        <Button transparent onPress={() => editUsers(item)}>
                            <Icon active name='create'></Icon>
                        </Button>
                        <Button transparent onPress={() => deleteUsers(item)}>
                            <Icon active name='trash'></Icon>
                        </Button>
                    </Right>
                </ListItem>
                    ))
                }
            </Content>
        </Container>
    );
}
