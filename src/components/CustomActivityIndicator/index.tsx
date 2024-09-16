import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, ImageBackground, Platform } from 'react-native';
import { COLORS, FONTS, assets } from '../../constants';
import Box from '../Box';

const CustomActivityIndicator = ({ loader = true }: { loader?: boolean }) => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'android' ? (
        <ImageBackground source={assets.Loader} style={styles.image}>
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
      {loader ? (
        <Text style={styles.indicatorText}>Loading...</Text>
      ) : (
        <Box style={{ marginBottom: 10 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
    fontFamily: FONTS.Inter,
    width: '100%',
  },
  image: {
    height: 20,
    width: 20,
  },
});

export default CustomActivityIndicator;
