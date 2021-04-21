import React from 'react';
import  { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, View} from 'react-native';
import waterDrop from '../assets/watering.png';
import colors from '../styles/colors';
import {  Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core';

export const Welcome = () =>{
    const navigation = useNavigation();
    function handleStart(){
        navigation.navigate('UserIdentification')
    }
    
    return (
        <SafeAreaView style={styles.container}>
           <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'} 
                    suas plantas de {'\n'}
                    forma fácil
                </Text>
                <Image source={waterDrop} style={styles.images} resizeMode='contain'/>
                <Text style={styles.subtitle}>
                    Não esqueça de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={handleStart}>
                    <Feather name='chevron-right' style={styles.buttonIcon} />
                </TouchableOpacity>
           </View>
            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    wrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: '15%',
        lineHeight: 28
    },
    subtitle:{
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
,    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: "10%",
        height: 56,
        width: 56
    },
    buttonIcon :{
        color: colors.white,
        fontSize: 24,
    },
    images: {
        height: Dimensions.get('window').width * 0.7,
    },
    
})