import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';

import Home from 'src/screens/home';

import Sidebar from 'src/containers/Sidebar';

import {homeDrawer} from 'src/config/navigator';
import Category from '../screens/shop/category';

const Drawer = createDrawerNavigator();
const {width} = Dimensions.get('window');

const WIDTH_DRAWER = width * 0.78;

const drawerStyle = {
  width: WIDTH_DRAWER,
};

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      initialRouteName={homeDrawer.home}
      screenOptions={{headerShown: false}}
      drawerStyle={drawerStyle}>
      <Drawer.Screen name={homeDrawer.home} component={Category} />
    </Drawer.Navigator>
  );
}
