import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';

interface EnvironmentButtonProps extends RectButtonProps {
    title: string,
    active?: boolean
}
export const EnvironmentButton = ({title, active = false, ...rest} : EnvironmentButtonProps) =>{
    return(
        <RectButton style={[
            styles.container, 
            active && styles.containerActive
        ]}
        {...rest}
        >
            <Text style={[
            styles.text, 
            active && styles.textActive
            ]}>
                {title}
            </Text>
        </RectButton>

    )
}

const styles = StyleSheet.create({  
    container: {
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    containerActive:{
        fontWeight: '600',
        backgroundColor: colors.green_light
    },
    text:{
        color: colors.heading,

    },
    textActive:{
        color: colors.green_dark,

    },
})