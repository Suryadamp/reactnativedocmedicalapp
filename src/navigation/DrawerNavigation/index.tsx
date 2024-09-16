import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Image, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS } from '../../constants';
import DrawerContent from './DrawerContent';
import { routes } from './routes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RootState } from '../../state';
import styles from './../../styles/DrawerContent.styles';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  const { permissions } = useSelector((state: RootState) => state.users);

  return (
    <>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: COLORS.blue_D3E5FF,
          drawerHideStatusBarOnOpen: false,
          drawerActiveTintColor: COLORS.background.primary,
          drawerInactiveTintColor: COLORS.black,
          drawerLabelStyle: styles.drawerLabelStyle,
          drawerType: 'front',
          drawerStyle: {
            width: hp('35%'),
          },
        }}
      >
        {routes.map(({ name, component, icon, iconArrow, comingSoon, permission }) => {
          if (permission) {
            if (!permissions?.includes(permission)) {
              return;
            }
          }
          return (
            <Drawer.Screen
              key={name}
              name={name}
              component={component}
              options={{
                drawerIcon: ({ focused }) => (
                  <>
                    {icon}
                    <Image
                      source={iconArrow}
                      style={[
                        styles.drawerArrowIcon,
                        focused && { tintColor: COLORS.background.primary },
                      ]}
                    />
                    {comingSoon && <Text style={styles.txtComingSoon}>Coming soon</Text>}
                  </>
                ),
              }}
            />
          );
        })}
      </Drawer.Navigator>
    </>
  );
}

export default DrawerNavigation;
