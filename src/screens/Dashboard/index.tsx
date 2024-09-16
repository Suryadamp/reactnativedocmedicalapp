import { DrawerActions } from '@react-navigation/native';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import { AppContainer, Box, CustomBottomSheet, CustomHeader } from '../../components';
import { COLORS, SIZES, assets, strings } from '../../constants';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import DoctorSelectBottomSheet from './DoctorSelectBottomSheet';
import { TextInput } from 'react-native-paper';
import styles from '../../styles/Dashboard.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import { isHpBottomTablet } from '../../hooks/useDeviceCheck';
import { useScrollEndDetection } from '../../hooks/useLogs';
import { uploadLogs } from '../../service/commonVariableService';
import RNFS from 'react-native-fs';

interface NavigateProps {
  navigation?: any;
  route?: any;
}

const doctorImage = [assets.DoctorDp, assets.DoctorP, assets.DoctorR, assets.DoctorV];

const Dashboard = ({ navigation }: NavigateProps) => {
  const { doctorsList } = useSelector((state: RootState) => state.doctors);
  const [isOpen, setIsOpen] = useState(false);
  const { handleScroll } = useScrollEndDetection();
  // BottomSheet Hooks
  const sheetRef = useRef<BottomSheet>(null);

  // BottomSheet Callbacks
  const handleClosePress = useCallback(() => {
    setIsOpen(false);
    sheetRef.current?.close();
  }, []);

  const DoctorRender = ({ item, index }: any) => {
    return (
      <Box marginRight={20}>
        <Image
          source={item?.image ?? doctorImage?.[index] ?? assets.DoctorDp}
          style={styles.doctorImage}
        />

        <Text style={styles.doctorName}>
          {item?.name?.slice(0, 10)}
          {item?.name?.length > 10 && '...'}
        </Text>
        <Text style={styles.doctorDesination}>{item?.specialist ?? 'Cardiologist'}</Text>
      </Box>
    );
  };
  const handleLogsUpload = () => {
    const logFilePath = `${RNFS.DocumentDirectoryPath}/logs/app_logs.log`;

    RNFS.stat(logFilePath)
      .then((stats) => {
        // Calculate the size of the file in MB
        const fileSizeInMB = stats.size / (1024 * 1024); // Convert bytes to megabytes
        //developer
        // if (Number(fileSizeInMB.toFixed(2)) > 0.02) {
        if (Number(fileSizeInMB.toFixed(2)) > 1) {
          uploadLogs();
        }
      })
      .catch((error) => {
        console.error('Error getting file information:', error);
      });
  };
  useEffect(() => {
    handleLogsUpload();
  }, []);

  return (
    <AppContainer
      statusBarBgColor={'transparent'}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      {/* Header */}
      {/* <Box style={styles.headerContainer}>
        <Box style={styles.headerColumn}>
          <TouchableOpacity
            style={styles.addPadding}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Image source={assets.HamburgerMenu} style={commonStyles.menuIcon} />
          </TouchableOpacity>
        </Box>
        <Text style={styles.topBarTitle}>Dr.Carrot</Text>
        {/* <TouchableOpacity style={styles.addPadding}>
          <Image source={assets.Notification} style={commonStyles.menuIcon} />
        </TouchableOpacity>
      </Box> */}
      <CustomHeader
        leftIcon="menu"
        rightIconType="image"
        rightIcon="Notification"
        onLeftIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        title={strings.displayText.drcarrot}
        textColor={COLORS.background.primary}
        permission={false}
      />
      {/* Search box */}
      {/* <Box paddingVertical={5} /> */}
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <TextInput
          label={'Search for doctors'}
          mode="outlined"
          placeholderTextColor={'#AEB2B3'}
          placeholder={strings.displayText.search}
          style={styles.inputTxtStyle}
          disabled={true}
          outlineColor={'#EDEDED'}
          activeOutlineColor={COLORS.background.primary}
          onPressIn={() => setIsOpen(true)}
          // Add an icon at the end of the TextInput
          left={
            <TextInput.Icon
              // style={styles.iconStyle}
              style={styles.searchDoctorInput}
              iconColor={'#A7A7A7'}
              icon={assets.SearchGrey}
              size={22}
            />
          }
          theme={{
            colors: {
              primary: COLORS.gray,
              underlineColor: 'transparent',
              background: COLORS.background.secondary,
            },
            roundness: SIZES.padding * 0.9,
          }}
        />
      </TouchableOpacity>
      <Box height={20} />
      <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
        {/* Upcomming schedule card */}
        <Box style={{ marginHorizontal: 24 }}>
          <Text style={styles.cardTitle}>TOP FEATURES</Text>
          <Box paddingTop={15} />
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box style={styles.appointMainBox}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('My Appointments');
                }}
                disabled={!UsePermission(permissionList.mobileInvestigationsAdd)}
              >
                <Box
                  backgroundColor="#E0F0FF"
                  style={{
                    borderTopStartRadius: 9,
                    borderTopEndRadius: 9,
                  }}
                  padding={5}
                >
                  <Image
                    source={assets.BookAppointment}
                    style={{
                      alignSelf: 'center',
                      height: SIZES.screenWidth * 0.22,
                      width: SIZES.screenWidth * 0.28,
                    }}
                  />
                </Box>
                <Box>
                  <Text style={styles.bookText}>Book Appointment</Text>
                </Box>
              </TouchableOpacity>
            </Box>
            <Box style={styles.appointMainBox}>
              <Box
                backgroundColor="#EDECFF"
                style={{
                  borderTopStartRadius: 9,
                  borderTopEndRadius: 9,
                }}
                padding={5}
              >
                <Image
                  source={assets.TeleCons}
                  // style={styles.teleImage}
                  style={{
                    alignSelf: 'center',
                    height: SIZES.screenWidth * 0.22,
                    width: SIZES.screenWidth * 0.25,
                  }}
                />
              </Box>
              <Box>
                <Text style={styles.bookText}>Tele-Consultation</Text>
              </Box>
            </Box>
          </Box>

          <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={20}>
            <Box
              style={{
                width: '30%',
                backgroundColor: 'white',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#EEEEEE',
                borderRadius: 10,
              }}
            >
              <Box
                backgroundColor="#FAECFF"
                style={{
                  borderTopStartRadius: 9,
                  borderTopEndRadius: 9,
                }}
                padding={5}
              >
                <Image
                  source={assets.Pharmacy}
                  style={{
                    alignSelf: 'center',
                    height: SIZES.screenWidth * 0.18,
                    width: SIZES.screenWidth * 0.18,
                  }}
                />
              </Box>
              <Box>
                <Text style={styles.bookText}> Pharmacy</Text>
              </Box>
            </Box>
            <TouchableOpacity
              style={{
                width: '30%',
                backgroundColor: 'white',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#EEEEEE',
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate('Laboratory')}
            >
              <Box
                backgroundColor="#FFEFEF"
                style={{
                  borderTopStartRadius: 9,
                  borderTopEndRadius: 9,
                }}
                padding={5}
              >
                <Image
                  source={assets.Laboratory}
                  style={{
                    alignSelf: 'center',
                    height: SIZES.screenWidth * 0.18,
                    width: SIZES.screenWidth * 0.18,
                  }}
                />
              </Box>
              <Box>
                <Text style={styles.bookText}>Laboratory</Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '30%',
                backgroundColor: 'white',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#EEEEEE',
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate('Vaccines')}
            >
              <Box
                backgroundColor="#E4FBF5"
                style={{
                  borderTopStartRadius: 9,
                  borderTopEndRadius: 9,
                }}
                padding={5}
              >
                <Image
                  source={assets.Vaccine}
                  style={{
                    alignSelf: 'center',
                    height: SIZES.screenWidth * 0.185,
                    width: SIZES.screenWidth * 0.22,
                  }}
                />
              </Box>
              <Box>
                <Text style={styles.bookText}> Vaccines</Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
        <Box
          style={{
            borderBottomWidth: 2,
            borderColor: COLORS.grey_E5E5E5,
            marginVertical: 12,
            marginTop: 18,
          }}
        />
        <Box style={{ paddingHorizontal: 24 }}>
          <Box display="flex" flexDirection="row">
            <MCIcon
              name="account"
              size={styles.iconHeight.height}
              style={{ justifyContent: 'center', alignSelf: 'center', marginRight: 5 }}
              color={'#207DFF'}
            />
            <Text style={styles.doctorConsultText}>Doctors you have consulted</Text>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <FlatList
              horizontal
              // style={styles.scrollViewStyle}
              showsHorizontalScrollIndicator={false}
              data={doctorsList[0]?.data}
              onScroll={handleScroll}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <DoctorRender item={item} index={index} key={index?.toString()} />
              )}
            />
          </Box>
        </Box>
        <Box style={styles.divider} />
        {/* Categories card */}
        <Box style={{ paddingHorizontal: 24 }}>
          <Text style={styles.cardTitle}>ADDITIONAL FEATURES</Text>
          <Box marginVertical={3} />
          <Image
            source={assets.EvadeFrame}
            style={[
              styles.imageFrameStyle,
              {
                height: SIZES.screenWidth * 0.85,
                marginBottom: 20,
              },
            ]}
          />

          <Image
            source={assets.LiveFrame}
            style={[
              styles.imageFrameStyle,
              {
                height: SIZES.screenWidth * 0.4,
                marginBottom: 10,
              },
            ]}
          />

          <Image source={assets.CovidFrame} style={styles.imageFrameStyle} />
          <Image source={assets.HealthFrame} style={styles.imageFrameStyle} />
          <Image source={assets.PrescriptionsFrame} style={styles.imageFrameStyle} />
          <Image source={assets.SecureFrame} style={styles.imageFrameStyle} />
          <Image source={assets.SafetyFrame} style={styles.imageFrameStyle} />
        </Box>
        {/* <Box>
          <Image source={assets.ExploreFrame} style={styles.expolreFrame} />
        </Box> */}
        <Box>
          <Image
            source={assets.ExtraInfoFrame}
            style={[
              styles.doctorFrame,
              {
                width: SIZES.screenWidth / 1.13,
                marginTop: 10,
                height: SIZES.screenWidth * 0.4,
              },
            ]}
          />
          <Image
            source={assets.DoctorFrame}
            style={[
              styles.doctorFrame,
              { height: SIZES.screenWidth * 0.45, width: SIZES.screenWidth },
            ]}
          />
        </Box>
        {/* <Box paddingVertical={15} /> */}
      </ScrollView>
      {isOpen && (
        <CustomBottomSheet
          openBSheet={isOpen}
          snapPoints={[
            Platform.OS === 'ios' ? `${isHpBottomTablet(10, 3.3)}` : `${isHpBottomTablet(7, 2.6)}`,
          ]}
          setSheetState={setIsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={'Search for doctors'}
        >
          <DoctorSelectBottomSheet
            options={doctorsList[0]?.data || []}
            navigation={navigation}
            handleClosePress={handleClosePress}
          />
        </CustomBottomSheet>
      )}
      {/* </Box> */}
    </AppContainer>
  );
};
export default Dashboard;
