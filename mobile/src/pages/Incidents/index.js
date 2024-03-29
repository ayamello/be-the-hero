import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'; 
import { Feather } from '@expo/vector-icons';

import api from '../../services/api'

import styles from './style';
import logoImg from '../../assets/logo.png';

export default function Incidents() {
    const navigation = useNavigation();

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    function navigationToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if(loading){
            return;
        }

        if(total > 0 && incidents.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', { params: {page} });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>

                <Image source={logoImg}/>

                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>

            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            {/* Permitir rolagem */}
            <FlatList 
                data={incidents} //array de dados que vai montar a lista
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigationToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}> 
                                Ver mais detalhes
                            </Text>

                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )} //função responsável por renderizar cada item - retornará code jsx, por isso o parentese dps do '=>'
            />

        </View>
    );
}