import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import { AppContainer, Box } from '../../components';
import { COLORS, assets } from '../../constants';
import { logout, removeAccessToken } from '../../service/AuthService';
import { resetState } from '../../state/auth';
import { resetStateInPatients } from '../../state/inpatients';
import styles from '../../styles/Setting.styles';
import { deleteUser } from '../../service/UserService';
import DeleteMedicine from '../../dialogs/DeleteMedicineDialog';
import CustomHeader from '../../components/CustomHeader';
import { strings } from '../../i18n';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';

interface NavigateProps {
  navigation: any;
  route: any;
}

const Settings = ({ navigation }: NavigateProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const onLogout = () => {
    setIsLoading(true);
    logout()
      .then(() => {
        setIsLoading(false);
        handleNavigation();
      })
      .catch((err) => {
        setIsLoading(false);
        removeAccessToken();
        handleNavigation();
        console.log('err', err);
      });
  };

  const onDeleteAccount = () => {
    setIsDeleteLoading(true);
    deleteUser()
      .then(() => {
        setIsDeleteLoading(false);
        closeDialog();
        handleNavigation();
      })
      .catch((err) => {
        console.log(err);
        closeDialog();
        removeAccessToken();
        setIsDeleteLoading(false);
        handleNavigation();
      });
  };

  const handleNavigation = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      }),
    );
    dispatch(resetState());
    dispatch(resetStateInPatients());
  };

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        {/* <Box style={styles.container}> */}
        {/* <StatusBar backgroundColor={COLORS.background.white} barStyle={'dark-content'} /> */}
        {/* <Box style={styles.header}>
          <Box style={styles.topBar}>
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
              style={{ padding: 1 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
            </TouchableOpacity>
            <Text style={styles.topBarTitle}>Preference</Text>
          </Box>
        </Box> */}
        <CustomHeader
          leftIcon="arrow-left"
          onLeftIconPress={() => navigation.goBack()}
          title={strings.displayText.preference}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Box style={styles.content}>
            <Box style={styles.row}>
              <Text style={styles.menuTitle}>Settings</Text>
            </Box>
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuItem}>Notification Settings</Text>
              <Image source={assets.ArrowRight} />
            </TouchableOpacity>
          </Box>
          <Box style={styles.content}>
            <Box style={styles.row}>
              <Text style={styles.menuTitle}>Reminder Settings</Text>
            </Box>
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuItem}>Reminder Volume</Text>
              <Image source={assets.ArrowRight} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuItem}>Vibrate</Text>
              <Image source={assets.ArrowRight} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuItem}>Snooze duration</Text>
              <Image source={assets.ArrowRight} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuItem}>Popup notification</Text>
              <Image source={assets.ArrowRight} />
            </TouchableOpacity>
          </Box>
          <Box style={styles.content}>
            <Box style={styles.row}>
              <Text style={styles.menuTitle}>General</Text>
            </Box>
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuItem}>About Dr.Carrot</Text>
              <Image source={assets.ArrowRight} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuItem}>Privacy Policy</Text>
              <Image source={assets.ArrowRight} />
            </TouchableOpacity>
          </Box>
          <Box style={styles.content}>
            <Box style={styles.row}>
              <Text style={styles.menuTitle}>Accounts</Text>
            </Box>
            <TouchableOpacity style={styles.menuRow} onPressIn={onLogout} disabled={isLoading}>
              <Box display="flex" flexDirection="row">
                <Text style={[styles.menuItem, { color: isLoading ? '#CCCCCC' : COLORS.darkBlue }]}>
                  Logout
                </Text>
                {isLoading && <ActivityIndicator size={14} />}
              </Box>
              <Image source={assets.ArrowRight} />
            </TouchableOpacity>
          </Box>
          {UsePermission(permissionList?.mobileDeleteAccount) && (
            <Box style={styles.content}>
              <Box style={styles.row} />
              <TouchableOpacity style={styles.menuRow} onPress={openDialog}>
                <Box display="flex" flexDirection="row">
                  <Text style={styles.deleteAccounttem}>Delete account</Text>
                  {/* <ActivityIndicator size={14} /> */}
                  {isDeleteLoading && <ActivityIndicator size={14} />}
                </Box>
              </TouchableOpacity>
            </Box>
          )}
        </ScrollView>

        {/* </Box> */}
      </AppContainer>
      <Box justifyContent="flex-end" position="absolute">
        <DeleteMedicine
          visible={showDialog}
          onClose={closeDialog}
          callback={onDeleteAccount}
          closeDialog={closeDialog}
          loader={isDeleteLoading}
          title={'Account'}
        />
      </Box>
    </>
  );
};

export default Settings;
