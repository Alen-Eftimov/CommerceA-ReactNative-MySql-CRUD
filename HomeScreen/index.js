/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const HomeScreen = () => {
  const navigation = useNavigation();

  const [datas, setDatas] = useState([]);
  //const [loading, setLoading] = useState(true);

  // const fetchData = async () => {
  //   const resp = await fetch('http://192.168.1.126:3500/users');
  //   const data = await resp.json();
  //   setDatas(data);
  //   //setLoading(false);
  // };

  const fetchData = async () => {
    try {
      const resp = await axios.get('http://192.168.1.126:3500/users');
      // const data = await resp.json();
      setDatas(resp.data);
      //setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onPressDelete = async (id) => {
    try {
        await axios.delete(`http://192.168.1.126:3500/users/${id}`);
        // window.location.reload()
    } catch (error) {
        console.log(error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View>
          <Text style={{ color: '#fff', fontWeight: 'bold', letterSpacing: 5 }}>
            {item.name}
          </Text>
          <Text style={{ color: '#fff', letterSpacing: 5 }}>{item.email}</Text>
          <Text>{item.address}</Text>
        </View>
        <View style={styles.buttonOperations}>
          <View style={{paddingBottom: 10}}>
            <Pressable style={styles.delete} onPress={() => onPressDelete(item.id.toString())}>
              <MaterialIcons name="delete" style={{color: 'red', fontSize: 24}} />
            </Pressable>
          </View>
          <View>
            <Pressable style={styles.update} onPress={() => navigation.navigate('Update', {userId: item.id.toString()})}>
              <MaterialIcons name="edit" style={{color: 'blue', fontSize: 24}} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Hello Alen!</Text>
      <View>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Add')}>
          <Text style={styles.textAdd}><FontAwesome5 name="user-plus" style={{color: '#abc123', fontSize: 27}} /></Text>
        </Pressable>
      </View>
      <FlatList
        data={datas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkorange',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  text: {
    fontSize: 35,
    color: '#abc123',
    fontWeight: 'bold',
    letterSpacing: 15,
    textShadowColor: 'grey',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#abc123',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'green',
    shadowRadius: 10,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 5, height: 5 },
    // shadowColor: 'red',
    shadowRadius: 10,
    elevation: 10,
  },
  textAdd: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  delete: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // shadowOffset: { width: 5, height: 5 },
    // // shadowColor: 'red',
    // shadowRadius: 10,
    // elevation: 10,
  },
  // textDelete: {
  //   color: 'white',
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  buttonOperations: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  update: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // shadowOffset: { width: 5, height: 5 },
    // // shadowColor: 'red',
    // shadowRadius: 10,
    // elevation: 10,
  },
  // textUpdate: {
  //   color: 'white',
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
});

export default HomeScreen;
