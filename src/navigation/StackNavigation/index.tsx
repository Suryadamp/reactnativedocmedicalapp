/* eslint-disable react-hooks/rules-of-hooks */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { routes } from './routes';
import { useScreenActiveTime } from '../../hooks/useLogs';

const Stack = createStackNavigator();

const Navigation = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          cardOverlayEnabled: true,
        }}
      >
        {routes?.map(({ name, component }) => {
          const ScreenComponent = component;
          return (
            <Stack.Screen
              key={name}
              name={name}
              component={(props: any) => {
                useScreenActiveTime(name);

                return <ScreenComponent {...props} />;
              }}
              options={{}}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
