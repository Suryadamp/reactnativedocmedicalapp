// Loader
import * as React from 'react';
import { View, ActivityIndicator, Platform, ImageBackground } from 'react-native';

import { COLORS } from '../../constants';
import { assets } from '../../constants';

export const InpatientLoader = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {Platform.OS === 'android' ? (
      <ImageBackground source={assets.Loader} style={{ height: 20, width: 20 }}>
        <ActivityIndicator
          size="large"
          style={{ marginBottom: 15 }}
          color={COLORS.background.primary}
        />
      </ImageBackground>
    ) : (
      <ActivityIndicator
        size="large"
        style={{ marginBottom: 15 }}
        color={COLORS.background.primary}
      />
    )}
  </View>
);

export default InpatientLoader;
