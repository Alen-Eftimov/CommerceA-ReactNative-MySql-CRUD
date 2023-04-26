/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const Update = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [text, setText] = useState({
    name: '',
    username: '',
    email: '',
    address: '',
  });

  // console.warn(route.params.userId);
  const userIdd = route.params.userId;
  const onPress = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.1.126:3500/users/${userIdd}`, text);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log(error);
    }
  };
// const onChangeText = (e) => {
//   setText(text => ({...text, [e.target.name]: e.target.value}))
// };

//   const [book, setBook] = useState({
//     title: "",
//     description: "",
//     price: null,
//     image_cover: "",
// })

// const navigate = useNavigate()

// const handleChange = (e) => {
//   setBook(prev => ({...prev, [e.target.name]: e.target.value}))
// };
  //const [loading, setLoading] = useState(true);

  // const fetchData = async () => {
  //   const resp = await fetch('http://192.168.1.124:3500/users');
  //   const data = await resp.json();
  //   setDatas(data);
  //   //setLoading(false);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const renderItem = ({ item }) => {
  //   return (
  //     <View style={styles.card}>
  //       <Text style={{ color: '#fff', fontWeight: 'bold', letterSpacing: 5 }}>
  //         {item.name}
  //       </Text>
  //       <Text style={{ color: '#fff', letterSpacing: 5 }}>{item.email}</Text>
  //       <Text>{item.address}</Text>
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Update Item</Text>
      <View>
        <TextInput
         style={styles.input}
         onChangeText={(txt) => setText({...text, name: txt})}
         value={text.name}
         placeholderTextColor="white"
         placeholder="name"
         autoComplete={'name'}
        />
        <TextInput
         style={styles.input}
         onChangeText={(txt) => setText({...text, username: txt})}
         value={text.username}
         placeholderTextColor="white"
         placeholder="username"
         autoComplete={'username'}
        />
        <TextInput
         style={styles.input}
         onChangeText={(txt) => setText({...text, email: txt})}
         value={text.email}
         placeholderTextColor="white"
         placeholder="email"
         autoComplete={'email'}
        />
        <TextInput
         style={styles.input}
         onChangeText={(txt) => setText({...text, address: txt})}
         value={text.address}
         placeholderTextColor="white"
         placeholder="address"
         autoComplete={'street-address'}
        />
      </View>
      <View  >
        <Pressable style={styles.button} onPress={onPress} >
          <Text style={styles.textAdd}>Update</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  text: {
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: 10,
    textShadowColor: 'grey',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    paddingVertical: 20,
  },
  input: {
    width: 350,
    textDecorationColor: '#000',
    fontSize: 25,
    backgroundColor: '#abc123',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'red',
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    width: 150,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#abc123',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 5, height: 5 },
    // shadowColor: 'red',
    shadowRadius: 10,
    elevation: 10,
  },
  textAdd: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default Update;
