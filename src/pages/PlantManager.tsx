import React, { useState } from 'react';
import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Alert
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import waterdrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import Datetimepicker, { Event } from '@react-native-community/datetimepicker';
import { isBefore, format } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';


interface Params {
    plant: PlantProps
}

export const PlantManager = () => {
    const [dateTimePicked, setDateTimePicked ] = useState(new Date)
    const [ showDatePicker, setShowDatePicker ] = useState(Platform.OS === 'ios')
    const route = useRoute();
    const { plant } = route.params as Params;
    const navigation = useNavigation()

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'ios'){
            setShowDatePicker(oldState => !oldState);
        }
        if(dateTime && isBefore(dateTime, new Date())){
            setDateTimePicked(new Date())
            return Alert.alert("Escolha uma hora no futuro ")
        }
        if(dateTime){
            setDateTimePicked(dateTime);
        }
    }

    function handleOpenDateTimePicker(){
        setShowDatePicker(oldState => !oldState)
    }

    async function handleSave(){
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: dateTimePicked
            })
            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar das sua plantinha com muito cuidado.',
                buttonTitle: 'Muito obrigado',
                icon: 'hug',
                nextScreen: 'MyPlants'
                }   
            )
        } catch (error) {
            Alert.alert('Nao foi possivel salvar :|')
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <SvgFromUri 
                uri={plant.photo}
                height={150}
                width={150}
                />
                <Text style={styles.plantName}>
                   {plant.name}
                </Text>
                <Text style={styles.plantAbout}>
                    {plant.about} 
                </Text>
            </View>

            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image 
                    source={waterdrop}
                    style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                    {plant.water_tips} 
                    </Text>                    
                </View>
                <Text style={styles.alertLabel}>
                    Alert label
                </Text>

                {showDatePicker && (
                    <Datetimepicker 
                    value={dateTimePicked}
                    mode="time"
                    display="spinner"
                    onChange={handleChangeTime}
                    />
                )}
                {
                    Platform.OS === 'android' && (
                        <TouchableOpacity 
                        
                        // style={styles.dateTimePickerButton}
                        onPress={handleOpenDateTimePicker}
                        >
                            <Text style={styles.dateTimePickerText}>
                                {`Mudar ${format(dateTimePicked, 'HH:mm')}`}
                            </Text>

                            
                        </TouchableOpacity>
                    )
                }
                <Button 
                    label="Cadastrar Planta"
                    onPress={handleSave}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    info:{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40
    },
    plantName:{
        textAlign: 'center',
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout:{
        textAlign: 'center',
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    
    tipContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage:{
        width: 56,
        height: 56
    },
    tipText:{
        flex: 1,
        marginLeft: 20,
        color:colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel:{
        textAlign: 'center',
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    
    dateTimePickerButton:{
        color: colors.heading,
        fontSize: 24,
    },
    dateTimePickerText: {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 28,
        paddingVertical: 40
    },
})