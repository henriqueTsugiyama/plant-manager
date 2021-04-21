import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View, 
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    TouchableWithoutFeedbackComponent,
    Keyboard
} from 'react-native';
import { Button } from '../components/Button';
import {useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';

export const UserIdentification = () => {
    const [ isFocused, setFocus ] = useState(false);
    const [ isFilled, setFill ] = useState(false);
    const [ user, setUser ] = useState<string>('')
    const navigation = useNavigation();

    function handleInputBlur(){
        setFocus(false)
    };
    function handleInputFocus(){
        setFocus(true)
    };
    function handleInputChange(value: string){
        setFill(!!value)
        setUser(value)
    }
    
    function handleStart(){
        navigation.navigate('Confirmation')
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View  style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? ':)': ':/'}
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                    te chamar?
                                </Text>
                            </View>
                            

                            <TextInput 
                            style={[
                                styles.input,
                                (isFocused || isFilled) && 
                                {borderColor: colors.green}
                            ]} 
                            placeholder='Digite um nome'
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                            />

                            <View style={styles.footer}>
                                <Button label='Confirmar' onPress={handleStart}/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    content: {
        flex:1,
        width:'100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
        
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        padding: 10,
        marginTop: 20,
        textAlign: 'center'
    },
    title:{
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        marginTop: 32,
        color: colors.heading,
    },
    header: {
        alignItems: 'center'
    },
    footer: {
        marginTop: 28,
        width: '100%'
    }
})