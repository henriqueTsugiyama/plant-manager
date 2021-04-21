import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, Text } from 'react-native';
import colors from '../styles/colors';

interface ButtonText extends TouchableOpacityProps{
    label: String,
}
export const Button = ({label, ...rest}: ButtonText)=> {
    return( 
        <TouchableOpacity 
        style={styles.container}
        {...rest}
        >
            <Text style={styles.text}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        height:  56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: colors.white,
        fontSize: 16,
    }
})