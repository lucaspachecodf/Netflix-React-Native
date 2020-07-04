'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


Icon.loadFont();

export default class CameraScreen extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { type: RNCamera.Constants.Type.front, hasPermission: null }
  }

  componentDidMount() {

    /*const handlePermission = async () => {

      const { status } = await Camera.requestPermissionsAsync();
      this.setState({ hasPermission: status === 'granted' });
    }*/

    //handlePermission()

  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 1, base64: true }
      let photo = await this.camera.takePictureAsync(options);

      this.props.navigation.navigate('More', {
        image: photo.uri,
        name: this.props.route.params.name,
        icon: null
      })
    }
  };


  render() {
   
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.type}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permissão para usar a câmera',
            message: 'Precisamos da sua permissão para usar sua câmera',
            buttonPositive: 'Permitir',
            buttonNegative: 'Negar',
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>
              {/* <MaterialCommunityIcons name="camera" size={24} color="black" /> */}
              <MaterialCommunityIcons name="camera" size={22} color="black" /> Tirar Foto
             </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={async () => {
            this.setState({
              type: this.state.type === RNCamera.Constants.Type.back
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back
            })
          }} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>
              {/* <MaterialCommunityIcons name="camera-party-mode" size={24} color="black" /> */}
              <MaterialCommunityIcons name="camera-party-mode" size={22} color="black" /> Mudar Câmera
             </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});