import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api';
import colors from '../styles/colors';

interface EnvironmentProps {
    key: string;
    title: string
}
interface PlantProps {
    id: string;
      name: string;
      about: string;
      water_tips: string;
      photo: string;
      environments: [string];
      frequency: {
        times: number;
        repeat_every: string
      }
}
export const PlantSelection = ()=> {
    const [ environments, setEnvironments]= useState<EnvironmentProps[]>([])
    const [ plants, setPlants ] = useState<PlantProps[]>([])
    const [filteredPLants, setPLantsFilter ] = useState<PlantProps[]>([])
    const [ isEnvSelected, setEnvSelect ] = useState('all')
    const [ loading, setLoading ] = useState(true)
    const [ page, setPage ] = useState(1)
    const [loadingMore, setLoadingMore ] = useState(false)
    const [loadedAll, setLoadedAll ] = useState(false) 

    async function fetchPlants() {
        const {data} = await api
        .get(`plants?_sort=title&_order=asc&_page=${page}&_limit=8`)
        if(!data) return setLoading(true)
        if (page > 1) {
            setPlants(oldvalue => [...oldvalue, ...data])
            setPLantsFilter(oldvalue => [...oldvalue, ...data])
        } else{
            setPlants(data)
            setPLantsFilter(data)
        }
        setLoading(false)
        setLoadingMore(false)
    }


    function handleEnvironmentSelected(environment: string){
        setEnvSelect(environment)

        if(environment == 'all'){
            return setPLantsFilter(plants)
        }
        const filtered = plants.filter( plant => 
            plant.environments.includes(environment)
        )
        setPLantsFilter(filtered);
    }

    async function handleScroll(scroll: number){
        if(scroll < 1) return;
        setLoadingMore(true)
        setPage(oldvalue => oldvalue + 1)
        await fetchPlants()
    }
    useEffect(()=>{
        async function fetchEnvironment() {
            const {data} = await api.get('plants_environments?_sort=title&_order=asc')
            setEnvironments([
            {
                key: 'all',
                title: 'Todos',
            },
            ...data
            ])
        }
        fetchEnvironment()
    })
    useEffect(()=>{
       
        fetchPlants()
    })

    if(loading){
        return <Loading/>
    }
    return(
        <View style={styles.container}> 
            <View style={styles.header}>
                <Header name='Henrique'/>
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta? </Text>
            </View>
            <View>
                <FlatList 
                data={environments}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.environmentList}
                renderItem={({item})=>(
                    <EnvironmentButton 
                    title={item.title}
                    active={item.key === isEnvSelected}
                    onPress={()=> handleEnvironmentSelected(item.key)}
                    />
                )}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                data={filteredPLants}
                renderItem={({item})=>(
                <PlantCardPrimary data={item} />
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.1}
                onEndReached={({distanceFromEnd})=> handleScroll(distanceFromEnd)}
                ListFooterComponent={
                    loadingMore 
                    ?<ActivityIndicator color={colors.green}/>
                    : <></>
                }
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header:{
        paddingHorizontal: 30
    },
    title:{
        fontSize: 17,
        color: colors.heading,
        lineHeight: 20,
        marginTop: 15,
        fontWeight: '700'
    },
    subtitle:{
        fontSize: 17,
        color: colors.heading,
        lineHeight: 20,
    },
    environmentList:{
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants:{
        flex: 1,
        paddingHorizontal: 32,
        paddingBottom: 32,
        justifyContent: 'center'
    }
})