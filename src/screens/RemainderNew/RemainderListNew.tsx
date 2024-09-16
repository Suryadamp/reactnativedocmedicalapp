import React from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import { useRemainder } from '../../hooks/useRemainder'; // Adjust the import path as needed
import {
  AppContainer,
  Box,
  PatientBottomSheet,
  CustomBottomSheet,
  CustomCalenderBottomSheet,
  CustomFilterBottomSheet,
} from '../../components';
import { COLORS, SIZES, assets, strings } from '../../constants';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import RemainderCard from './RemainderCard';
import { DrawerActions } from '@react-navigation/native';
import styles from '../../styles/Reminder.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import CustomHeader from '../../components/CustomHeader';
import { useScrollEndDetection } from '../../hooks/useLogs';

interface NavigateProps {
  navigation: any;
  route: any;
}

export const selectOptions = ['All', 'Today', 'Custom'];

const RemainderListNew = ({ navigation }: NavigateProps) => {
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const { handleScroll } = useScrollEndDetection();
  // Use the custom hook
  const {
    isOpen,
    isSelectOpen,
    isCalendarOpen,
    noRemainder,
    remainderList,
    handleOpenClose,
    handleNavigation,
    setIsSelectOpen,
    setFilterType,
    setStartDate,
    setEndDate,
    setIsOpen,
  } = useRemainder(navigation);

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        {/* <Box style={styles.header}>
          <Box style={styles.topBar}>
            <Box flexDirection="row" alignContent="center" alignItems="center">
              <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <Image source={assets.HamburgerMenu} style={commonStyles.menuIcon} />
              </TouchableOpacity>
            </Box>
            <Box>
              <Text style={commonStyles.topTitleText}>{strings.displayText.remainders}</Text>
            </Box>
            {UsePermission(permissionList.mobileReminderAdd) ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('CreateRemainder');
                }}
              >
                <Image source={assets.AddPlusBlue} style={commonStyles.menuIcon} />
              </TouchableOpacity>
            ) : (
              <Box />
            )}
          </Box>
        </Box>
        <Box style={styles.divider} /> */}
        <CustomHeader
          leftIcon="menu"
          rightIcon="plus"
          onLeftIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          onRightIconPress={() => {
            navigation.navigate('CreateRemainder', { from: 'RemainderList' });
          }}
          title={strings.displayText.remainders}
          hasDivider
          permission={UsePermission(permissionList.mobileReminderAdd)}
        />
        <Box height={46} marginHorizontal={20} justifyContent="center" alignItems="flex-end">
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 80, right: 80 }}
            onPress={() => {
              setIsSelectOpen(true);
            }}
          >
            <Box display="flex" flexDirection="row">
              <IconButton
                style={styles.accountIconStyle}
                name="account"
                size={styles.userIconHeight.height}
                color={COLORS.background.primary}
              />
              <Text style={styles.accNameStyle}>
                {selectedPatient?.name ? selectedPatient?.name : 'Select'}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <Box marginTop={5}>
          <Box height={Platform.OS === 'ios' ? SIZES.screenHeight / 1.3 : SIZES.screenHeight / 1.1}>
            {noRemainder ? (
              <Box style={styles.noAppointment}>
                <Image source={assets.NoPrescription} style={styles.imageTouchStyle} />
                <Text style={styles.noDataFond}>No reminders found</Text>
              </Box>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={[remainderList]}
                onScroll={handleScroll}
                keyExtractor={(group, index) => index.toString()}
                renderItem={({ item }) => (
                  <RemainderCard
                    item={item}
                    handleNavigation={handleNavigation}
                    navigation={navigation}
                  />
                )}
              />
            )}
          </Box>
        </Box>
        {/* <Box style={styles.buttonBoxContainer}>
          <AbstractButton
            onPress={() => {
              navigation.navigate('CreateRemainder');
            }}
            buttonStyle={styles.addBtnStyle}
            textStyle={styles.applyTxtStyle}
          >
            {strings.displayText.addRemainder}
          </AbstractButton>
        </Box> */}
        {isOpen && (
          <CustomBottomSheet
            openBSheet={isOpen}
            snapPoints={['40%']}
            title="Filters"
            setSheetState={setIsOpen}
            enablePanDownToClose={false}
            backgroundStyle={styles.backgroundStyle}
          >
            <CustomFilterBottomSheet
              selectOptions={selectOptions}
              handleSelectedFilterType={setFilterType}
              handleClosePress={() => handleOpenClose('main', false)}
            />
          </CustomBottomSheet>
        )}
        {isCalendarOpen && (
          <CustomBottomSheet
            openBSheet={isCalendarOpen}
            snapPoints={['65%']}
            title="Custom Date"
            setSheetState={(open: any) => handleOpenClose('calendar', open)}
            enablePanDownToClose={true}
            backgroundStyle={styles.backgroundStyle}
          >
            <CustomCalenderBottomSheet
              onDateSelected={(startDate: any, endDate: any) => {
                setStartDate(startDate);
                setEndDate(endDate);
                handleOpenClose('calendar', false);
              }}
            />
          </CustomBottomSheet>
        )}
        {isSelectOpen && <PatientBottomSheet isOpen={isSelectOpen} setIsOpen={setIsSelectOpen} />}
      </AppContainer>
    </>
  );
};

export default RemainderListNew;
