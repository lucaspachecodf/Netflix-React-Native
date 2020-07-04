import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Platform, TouchableOpacity, Text } from 'react-native';
import Avatar from '../components/Avatar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Screen = styled.View`
  flex: 1;
  background-color: #000;
  padding: 10px;
  align-content: center;
`;

const Row = styled.ScrollView`
  height: 80px;  
`;

const Label = styled.Text`
  color: white;
  padding: 10px;  
`;

const ButtonCamera = styled.TouchableOpacity`
  margin: 10px;
  background-color: ${Platform.OS === 'ios' ? 'white' : '#1a1718'};
  text-align: center
`;

let iconsAvailables = [
  require('../assets/avatars/avatar6.png'),
  require('../assets/avatars/avatar5.png'),
  require('../assets/avatars/avatar4.png'),
  require('../assets/avatars/avatar3.png'),
  require('../assets/avatars/avatar2.png'),
  require('../assets/avatars/avatar1.png'),
];

const ChooseIcon = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: 'Choose your Avatar',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
      },
      headerStyle: {
        backgroundColor: 'black',
        borderBottomColor: '#ffffff',
      },
      headerTintColor: 'white',
    });
  }, []);

  return (
    <Screen>
      <Label>Clássico</Label>
      <View style={{ height: 80 }}>
        <Row horizontal>
          {iconsAvailables.map((item, index) => (
            <Avatar
              key={index}
              image={item}
              onPress={() => {
                props.navigation.navigate('More', {
                  icon: item,
                  name: props?.route?.params?.name,
                  image: null,
                });
              }}
            />
          ))}
        </Row>
      </View>
      <Label>Crie seu avatar</Label>
      {/* <Button
        color={ Platform.OS ===  'ios' ? 'white' : "#1a1718" }
        title="CAMERA"
        onPress={() => {
          props.navigation.navigate('Camera', {
            name: props?.route?.params?.name,
          });
        }}
      /> */}

      <ButtonCamera onPress={() => {
          props.navigation.navigate('Camera', {
            name: props?.route?.params?.name,
          });
        }}>
        <Label style={[{ alignItems: "center", textAlign: 'center', textAlignVertical: 'center' }]}>
          {/* <MaterialCommunityIcons name="camera" size={19} color="white" />  */}
          <MaterialCommunityIcons name="camera" size={19} color="white" /> CÂMERA

        </Label>
      </ButtonCamera>

    </Screen>
  );
};

export default ChooseIcon;
