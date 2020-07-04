import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Tabs } from './routes/Tabs'
import ProfileToEdit from './screen/ProfileToEdit'
import ChooseIcon from './screen/ChooseIcon'
import Camera from './screen/Camera'

import { Alert, AsyncStorage } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { ProfileContext } from './context/ProfileContext'



const App = () => {

	const [user, setUser] = useState();

	AsyncStorage.getItem('profile').then((result) => {

		var convertResult = JSON.parse(result)

		if (convertResult != null)
			setUser(convertResult.name)
	})

	const changeProfile = (profile) => {
		setUser(profile.name)
	}

	useEffect(() => {
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
		});

		return unsubscribe;
	}, []);

	const Stack = createStackNavigator()

	return (
		<ProfileContext.Provider value={{ changeProfile, user }}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
					<Stack.Screen name="ProfileToEdit" component={ProfileToEdit} options={{ headerShown: false }} />
					<Stack.Screen name="ChooseIcon" component={ChooseIcon} options={{ headerShown: false }} />
					<Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		</ProfileContext.Provider>
	)
}

export default App
