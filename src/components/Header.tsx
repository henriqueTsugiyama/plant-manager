import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image ,SafeAreaView} from 'react-native';
import colors from '../styles/colors';
import userImg from '../assets/profilePic.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
interface HeaderProps {
    name: string,
}
export const Header = ()=> {
    const [user, setUsername ] = useState<string>('')

    useEffect(()=>{
        async function loadAsyncStorageData(){
            const data = await AsyncStorage.getItem('@plantmanager:user')
            setUsername(data || '')
        }
        loadAsyncStorageData()
    })
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{user}</Text>
            </View>
            <Image  source={userImg} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: '10%',

    },
    greeting :{
        fontSize: 32,
        color: colors.heading,
        fontWeight: '600',
    },
    userName :{
        fontSize: 32,
        fontWeight: '300',
        color: colors.heading,
        lineHeight: 40
    },
    image:{
        width: 80,
        height: 80,
        borderRadius: 40
    }
})