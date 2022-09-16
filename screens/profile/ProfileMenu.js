import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardCover,
    Title,
    Paragraph,
    List
} from 'react-native-paper';


const Profile = (props) => {

    const navigation = useNavigation()

    handleClick = () => {
        
        navigation.navigate('Profile');
    
    
    }

    
    return (
        <View>
            <Card>
                <Card.Content>
                    <Title>Perfil</Title>
                </Card.Content>

                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />

            </Card>
            <List.Item
                title="Editar Perfil"

                left={props => <List.Icon {...props} icon="account" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => handleClick(this)}
            />



            <List.Item
                title="Contraseña"

                left={props => <List.Icon {...props} icon="security" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
            />

            <List.Item
                title="Salir"

                left={props => <List.Icon {...props} icon="logout" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
            />

        </View>
    )
}

export default Profile;


