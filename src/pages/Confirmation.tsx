import { useNavigation, useRoute } from '@react-navigation/core';
import React from  'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Button } from '../components/Button';
import colors from '../styles/colors';

interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string
}
const emojis = {
    smile: '😃',
    hug: '🤗'

}

export const Confirmation = () =>{

    const routes = useRoute();
    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen 
    } = routes.params as Params
    const navigation = useNavigation();

    function handleConfirmation(){
        navigation.navigate(nextScreen)
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subTitle}>
                   {subtitle}
                </Text> 

                <View style={styles.footer}>
                    <Button label={buttonTitle} onPress={handleConfirmation}/>
                </View>
            </View>
           
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        padding: 30
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
   },
    subTitle: {
        fontSize: 17,
        textAlign: 'center',
        color: colors.heading,
        paddingVertical: 10,
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    },
    emoji:{
        fontSize: 78, 

    },
})