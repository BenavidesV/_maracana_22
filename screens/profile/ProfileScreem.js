import React, { useEffect, useState } from 'react'
import { View, Text } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { TextInput } from 'react-native-paper';




const ProfileScreem = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [identification, setIdentification] = useState('')

    return (
        <View>
            <View />
            <Card>
                <Card.Cover source={{ uri: 'https://picsum.photos/500' }} />
            </Card>

            <TextInput
                placeholder="Nombre completo"
                value={fullname}
                onChangeText={text => setFullname(text)}

            />
            <TextInput
                label="Id"
                placeholder="Identificación"
                value={identification}
                onChangeText={text => setIdentification(text)}

            />
            <TextInput
                placeholder="Teléfono"
                value={phone}
                onChangeText={text => setPhone(text)}
                keyboardType="phone-pad"
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                email-address
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
        </View>
    );
};

export default ProfileScreem;