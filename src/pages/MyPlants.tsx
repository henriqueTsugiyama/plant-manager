import React, {useEffect, useState} from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    Image,
    FlatList,
    Alert
} from 'react-native';
import {Header} from '../components/Header';
import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import {PlantProps, loadPlant, StoragePlantsProps, removePLant} from '../libs/storage';
import { formatDistance } from 'date-fns/esm';
import { pt } from 'date-fns/locale';
import { PlantCardSecundary } from '../components/PlantCardSecundary';
import { Loading } from '../components/Loading';

export const MyPlants = () => {
    const [ ] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWater, setNextWater] = useState<string>()
    const [ myPlants, setMyPlants ] = useState<PlantProps[]>([])

    function onSwipeLeft(plant:PlantProps){
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 🙏 ',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async ()=> {
                    try {
                        removePLant(plant.id)

                        setMyPlants((oldData) => (
                            oldData.filter((item) => item.id != plant.id)
                        ));
                    } catch (error) {
                        Alert.alert("Não foi possível remover.")
                    }
                }
            }
        ])
    }
    useEffect(()=>{
        async function loadStorageData(){
            const plantsStored = await loadPlant();
            const nextTime = formatDistance(
                new Date(plantsStored[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );

            setNextWater(
                `Não esqueça de regar a ${plantsStored[0].name} à ${nextTime}`
            )
            setMyPlants(plantsStored);
            setLoading(false)
        }
        loadStorageData()
    }, [])
    if(loading){
        return <Loading/>
    }
    return(
        <View style={styles.container}>
            <Header />
            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWater}
                </Text>
            </View>
            <View style={styles.plants}>
                
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>
                <FlatList 
                    data={myPlants}
                    keyExtractor={ item => String(item.id)}
                    renderItem={({item}) => 
                    <PlantCardSecundary 
                    data={item} 
                    onSwipeLeft={()=> onSwipeLeft(item)}
                    />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background

    },
    spotlight :{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightImage:{
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants:{
        flex: 1,
        width: '100%'
    },
    plantsTitle:{
        fontSize: 24,
        color: colors.heading,
        marginVertical: 20
    }
})