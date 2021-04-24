import React from 'react';
import { StyleSheet, Text, View, Animated} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Feather} from '@expo/vector-icons';
import colors from '../styles/colors';
import { SvgFromUri } from 'react-native-svg';
interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour:string;
    };
    onSwipeLeft: ()=> void
}

export const PlantCardSecundary = ({data, onSwipeLeft, ...rest} : PlantProps) => {
    return(
        <Swipeable
            overshootRight={false}
            renderRightActions={()=>(
                <Animated.View>
                    <View>
                        <RectButton
                        style={styles.removeButton}
                        onPress={onSwipeLeft}
                        >
                        <Feather name='trash' size={32} color={colors.white} />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton style={styles.container} {...rest}>
                <SvgFromUri 
                uri={data.photo}
                width={50}
                height={50}
                />
                <Text style={styles.title} >
                    {data.name}
                </Text>

                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                        Regar às
                    </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>

       
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5
    },
    title:{
       flex: 1,
       marginLeft: 10,
       fontSize: 17,
       color: colors.heading
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        marginTop: 5,
        fontSize: 16,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        color: colors.body_dark
    },
    removeButton:{
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems:  'center', 
        position: 'relative',
        paddingLeft: 15
    },

})