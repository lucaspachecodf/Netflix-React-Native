import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
// import { MaterialCommunityIcons, Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

import Home from '../screen/Home'
import More from '../screen/More'

export const Tabs = () => {

  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: 'white',
      style: {
        backgroundColor: '#1a1718',
        borderTopColor: 'transparent',
      },
    }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="home" size={size} color={color} />
            // <MaterialCommunityIcons name="home-outline" size={size} color={color} />
          )
        }} />
      <Tab.Screen
        name='Busca'
        component={Home}
        options={{
          tabBarLabel: 'Busca',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="search" size={size} color={color} />
            // <Feather name="search" size={size} color={color} />
          )
        }} />
      <Tab.Screen
        name='Em Breve'
        component={Home}
        options={{
          tabBarLabel: 'Em Breve',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="movie-filter" size={size} color={color} />
            // <MaterialIcons name="movie-filter" size={size} color={color} />
          )
        }} />

      <Tab.Screen
        name='Downloads'
        component={Home}
        options={{
          tabBarLabel: 'Downloads',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="file-download" size={size} color={color} />
            // <FontAwesome name="download" size={size} color={color} />
          )
        }} />
      <Tab.Screen
        name='More'
        component={More}
        options={{
          tabBarLabel: 'Mais',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="more-vert" size={size} color={color} />
            // <Feather name="more-vertical" size={size} color={color} />
          )
        }} />
    </Tab.Navigator>
  )
}