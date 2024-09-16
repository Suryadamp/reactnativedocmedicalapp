import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { FONTS } from '../../constants';

const CustomUserAvatar = ({ bgColor, size, style, name, image }: any) => {
  const firstName = name?.split('. ')[1] ? name?.split('. ')[1] : ''; // Get the first name after removing "Dr."
  const firstNameSpace = name?.split('.')[1] ? name?.split('.')[1] : ''; // Get the first name after removing "Dr."
  const firstLetter = firstName
    ? firstName.charAt(0).toUpperCase()
    : firstNameSpace
    ? firstNameSpace.charAt(0).toUpperCase()
    : name?.charAt(0).toUpperCase(); // Capitalize the first letter

  return (
    <View
      style={[styles.container, { backgroundColor: bgColor, width: size, height: size }, style]}
    >
      {name ? (
        <Text style={styles.text}>{firstLetter}</Text>
      ) : (
        <Image source={image} style={styles.doctorImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  doctorImage: {
    width: 50,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 42,
    color: 'white',
    ontFamily: FONTS.SFProDisplayRegular,
    fontWeight: '800',
  },
});

export default CustomUserAvatar;
