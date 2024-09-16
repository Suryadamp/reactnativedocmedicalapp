import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Box } from '../../components';
import { COLORS, assets } from '../../constants';
import { RootState } from '../../state';
import styles from '../../styles/DrawerContent.styles';
import { Avatar } from 'react-native-paper';

const DrawerContent = (props: any) => {
  const { userName, roles } = useSelector((state: RootState) => state.users);

  return (
    <Box flex={1}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Profile');
          }}
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            paddingRight={20}
            backgroundColor={COLORS.grey_line}
            paddingVertical={10}
          >
            <Box paddingLeft={10} flexDirection="row" alignItems="center">
              <Avatar.Text
                size={50}
                style={[styles.avatar, { backgroundColor: COLORS.background.primary }]}
                label={userName ? userName?.slice(0, 2) : 'A'}
              />
              <Text style={styles.avatarText}>{userName}</Text>
            </Box>
            <Image source={assets.rightArrowBlack} style={styles.arrow} />
          </Box>
        </TouchableOpacity>
        <Box style={styles.drawerItemList}>
          <ScrollView style={{ height: SCREEN_HEIGHT }} showsVerticalScrollIndicator={false}>
            <DrawerItemList {...props} />
          </ScrollView>
        </Box>
        <Box />
      </DrawerContentScrollView>
    </Box>
  );
};

export default DrawerContent;
