import React from 'react';
import styled from 'styled-components/native';
import Avatar from '../components/Avatar';
import { View, AsyncStorage } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();
import { ScrollView } from 'react-native-gesture-handler';
import { ProfileContext } from '../context/ProfileContext'

const Screen = styled.View`
  flex: 1;
  background-color: #000;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
`;

const AvatarsContainer = styled.View`
  height: 150px;  
`;

const RowScroll = styled.ScrollView`
  height: 100px;      
`;

const Row = styled.View`
  flex: 1;
  background-color: #000;
  padding: 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const NetflixButton = styled.TouchableOpacity`
  flex-direction: row;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

const ButtonLabel = styled.Text`
  margin: 10px;
  color: gray;
`;

let profilesAvailables = [
  {
    icon: require('../assets/avatars/avatar1.png'),
    name: 'José',
    uri: null,
  },
  {
    icon: require('../assets/avatars/avatar2.png'),
    name: 'Luiz',
    uri: null,
  },
  {
    icon: require('../assets/avatars/avatar3.png'),
    name: 'João',
    uri: null,
  },
  {
    icon: require('../assets/avatars/avatar4.png'),
    name: 'Maria',
    uri: null,
  },
  {
    icon: require('../assets/avatars/avatar5.png'),
    name: 'Lucas',
    uri: null,
  },
];

const replaceAvatarsWithImage = (props, profilesAvailables) => {
  if (props.route?.params?.name) {
    profilesAvailables.map((item) => {
      if (item.name === props.route.params.name) {
        if (props.route?.params?.image) {
          item.uri = props.route.params.image;
          item.image = null;
        }
        if (props.route?.params?.icon) {
          item.icon = props.route.params.icon;
          item.uri = null;
        }
      }
      return item;
    });
  }
};

const selectProfile = (navigation, item) => {
  navigation.navigate('Home', { name: item.name });
};

const editProfile = (navigation, profiles) => {
  navigation.navigate('ProfileToEdit', { profiles: profiles });
};

const More = (props) => {
  replaceAvatarsWithImage(props, profilesAvailables);

  return (
    <ProfileContext.Consumer>
      {(context) => (
        <Screen>
          <AvatarsContainer>
            <Row>
              <RowScroll horizontal>
                {profilesAvailables.map((item) => {
                  return (
                    <Avatar
                      key={item.name}
                      image={item.icon}
                      uri={item.uri}
                      name={item.name}
                      onPress={() => {
                        context.changeProfile(item)
                        AsyncStorage.setItem("profile", JSON.stringify(item))
                        selectProfile(props.navigation, item)}
                      }
                    />

                  );
                })}
              </RowScroll>
            </Row>
          </AvatarsContainer>

          <NetflixButton
            onPress={() => editProfile(props.navigation, profilesAvailables)}>
            {/* <MaterialIcons name="edit" size={24} color="gray" /> */}
            <Icon name="create" size={24} color="gray" />
            <ButtonLabel>Gerenciar perfis</ButtonLabel>
          </NetflixButton>
        </Screen>
      )}

    </ProfileContext.Consumer>
  );
};

export default More;
