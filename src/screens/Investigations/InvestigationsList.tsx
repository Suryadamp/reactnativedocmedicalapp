import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import { AppContainer, Box, PatientBottomSheet, CustomHeader } from '../../components';
import { RootState } from '../../state';
import { useSelector } from 'react-redux';
import { showSnackBar, showSuccessSnackBar, Snackbar } from '../../util/AlertUtil';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import { strings } from '../../i18n';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import {
  deleteAllInvestigation,
  deleteInvestigation,
  getInvestigation,
} from '../../service/InvestigationService';
import TestListBottomSheet from '../BookTest/TestListBottomSheet';
import { BottomsheetTitle } from '../BookTest/SelectTest';
import DeleteMedicine from '../../dialogs/DeleteMedicineDialog';
import commonStyles from '../../styles/Common.styles';
import styles from '../../styles/Investigation.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import { useScrollEndDetection } from '../../hooks/useLogs';
import InpatientLoader from '../../components/InpatientLoader';
import { isWpTablet } from '../../hooks/useDeviceCheck';
interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const InvestigationsList = ({ navigation, route }: Props) => {
  const item = route?.params?.item;
  const render = route?.params?.render;
  const { handleScroll } = useScrollEndDetection();
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const [appontmentList] = useState(item);
  const [investigationList, setInvestigationList] = useState<any[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [testListData, settTestListData] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteType, setDeleteType] = useState('');

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    getInvestigationList();
  }, [selectedPatient?.name, render]);

  const getInvestigationList = async () => {
    await getInvestigation({ appointment_id: appontmentList?.id })
      .then((resp) => {
        if (resp) {
          setInvestigationList(resp?.data?.result);
        } else {
          // showSnackBar('Invalid data');
        }
        setIsLoading(false);
      })
      .catch((_err) => {
        // showSnackBar('Invalid data');
        setIsLoading(false);
      });
  };

  const handleDelete = async () => {
    setShowLoader(true);
    if (deleteType === 'All') {
      if (appontmentList?.id) {
        await deleteAllInvestigation(appontmentList?.id)
          .then(async (resp) => {
            if (resp?.message === 'Deleted Successfully') {
              showSuccessSnackBar('Investigation deleted successfully.');
              await getInvestigationList();
              setShowDialog(false);
            } else {
              // showSnackBar('Investigation deleted failed.');
            }
          })
          .catch((_err) => {
            // showSnackBar('Investigation deleted failed.');
          });
      }
    } else {
      await deleteInvestigation(testListData?.id)
        .then(async (resp) => {
          if (resp?.message === 'Deleted Successfully') {
            showSuccessSnackBar('Investigation deleted successfully.');
            await getInvestigationList();
            setShowDialog(false);
          } else {
            // showSnackBar('Investigation deleted failed.');
          }
        })
        .catch((_err) => {
          // showSnackBar('Investigation deleted failed.');
        });
    }
    setShowLoader(false);
  };

  const TestRender = ({ item }: any) => {
    return (
      <>
        <Box style={styles.boxMainContainer}>
          <Box width={styles.commonStyle.width}>
            <Box style={[{ backgroundColor: '#EFF6FF' }, styles.labBkarBoxStyle]}>
              <IconButton
                style={styles.labBkarStyle}
                name="flask"
                size={styles.commonStyle.height}
                color={COLORS.background.primary}
              />
              {/* <Image style={styles.labBkarStyle} source={assets.LabBkar} /> */}
            </Box>
          </Box>
          <Box style={styles.secondWidth}>
            <Text style={styles.testNameStyle}>{item?.billing_item?.name}</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={item?.billing_item?.lab_tests?.length > 0 ? false : true}
              hitSlop={{ left: 30, right: 50, top: 25, bottom: 15 }}
              onPress={() => {
                setIsOptionsOpen(true);
                settTestListData(item);
              }}
            >
              <Box display="flex" flexDirection="row">
                <Text style={styles.testTypeStyle}>
                  {'Includes'} {item?.billing_item?.lab_tests?.length} {'tests'}
                </Text>

                {item?.lab_tests?.length > 0 ? (
                  <IconButton name="chevron-down" size={16} color={COLORS.background.primary} />
                ) : null}
              </Box>
            </TouchableOpacity>
          </Box>
          <Box style={styles.thirdWidth}>
            {UsePermission(permissionList.mobileInvestigationsDelete) && (
              <TouchableOpacity
                hitSlop={{ left: 30, right: 50, top: 25, bottom: 15 }}
                activeOpacity={0.8}
                onPress={() => {
                  openDialog();
                  settTestListData(item);
                  setDeleteType('Select');
                }}
              >
                <Image style={styles.deleteIcon} source={assets.deleteRed} />
              </TouchableOpacity>
            )}
          </Box>
        </Box>

        <Box style={styles.divider} />
      </>
    );
  };

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon={navigation.getState().type === 'drawer' ? 'menu' : 'arrow-left'}
        rightIcon="plus"
        permission={UsePermission(permissionList.mobileInvestigationsAdd)}
        title={strings.displayText.investigations}
        onRightIconPress={() => navigation.navigate('SelectTest', { item: appontmentList })}
        onLeftIconPress={() => {
          if (navigation.getState().type === 'drawer') {
            navigation.dispatch(DrawerActions.openDrawer());
          } else {
            navigation.goBack();
          }
        }}
      />
      {/* <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={() => {
              if (navigation.getState().type === 'drawer') {
                navigation.dispatch(DrawerActions.openDrawer());
              } else {
                navigation.goBack();
              }
            }}
          >
            <Image
              source={
                navigation.getState().type === 'drawer'
                  ? assets.HamburgerMenu
                  : assets.backArrowBlack
              }
              style={commonStyles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.investigations}</Text>
          {UsePermission(permissionList.mobileInvestigationsAdd) && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('SelectTest', { item: appontmentList });
              }}
            >
              <Image source={assets.AddPlusBlue} style={commonStyles.menuIcon} />
            </TouchableOpacity>
          )}
        </Box>
      </Box> */}
      <Box marginTop={10}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          paddingRight={20}
          backgroundColor={COLORS.grey_line}
        >
          <Box
            width={SIZES.screenWidth * 0.7}
            height={46}
            marginHorizontal={20}
            justifyContent="center"
          >
            {/* <TouchableOpacity
              onPress={() => {
                setIsSelectOpen(true);
              }}
            > */}
            <Box display="flex" flexDirection="row" alignItems="center">
              <IconButton
                style={styles.accountIconStyle}
                name="account"
                size={commonStyles.userIcon.height}
                color={COLORS.background.primary}
              />
              <Text style={styles.accNameStyle}>
                {selectedPatient?.name ? selectedPatient?.name : 'Select'}
              </Text>
            </Box>
            {/* </TouchableOpacity> */}
          </Box>
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIsOpen(true);
            }}
            style={styles.imageTouchStyle}
          >
            <Image source={assets.filterBlack} style={styles.filterIcon} />
          </TouchableOpacity> */}
        </Box>
        {isLoading && (
          <Box style={styles.noAppointment}>
            <InpatientLoader />
          </Box>
        )}
        {!isLoading && investigationList?.length === 0 && (
          <Box style={styles.noAppointment}>
            <Image
              source={assets.InvestigationsNoDataIcon}
              style={{ height: '20%', width: '25%' }}
            />
            <Text
              style={{
                fontFamily: FONTS.SFProDisplayMedium,
                fontSize: 14,
                lineHeight: 16,
                color: '#8A8A8A',
                marginVertical: 5,
              }}
            >
              No Investigations found
            </Text>
          </Box>
        )}
        {!isLoading && investigationList.length > 0 && (
          <Box height={SIZES.screenHeight / 1.2}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              marginTop={15}
              marginHorizontal={isWpTablet('3%')}
            >
              <Text style={styles.investigationText}>
                {investigationList?.[0]?.invoice_no ?? '-'}
              </Text>
              {UsePermission(permissionList.mobileInvestigationsDelete) && (
                <TouchableOpacity
                  hitSlop={{ left: 30, right: 50, top: 15, bottom: 10 }}
                  onPress={() => {
                    openDialog();
                    setDeleteType('All');
                  }}
                >
                  <Image style={styles.deleteIcon} source={assets.deleteRed} />
                </TouchableOpacity>
              )}
            </Box>
            <FlatList
              data={investigationList?.[0]?.investigation_products}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TestRender
                  item={item}
                  // handleOpen={handleOpen}
                  // setSelectItem={setInvestigationItem}
                  key={index?.toString()}
                />
              )}
            />
          </Box>
        )}
      </Box>
      <Box justifyContent="flex-end" position="absolute">
        <DeleteMedicine
          title="Investigation"
          visible={showDialog}
          onClose={closeDialog}
          callback={handleDelete}
          closeDialog={closeDialog}
          loader={showLoader}
        />
      </Box>

      {isOptionsOpen && (
        <CustomBottomSheet
          openBSheet={isOptionsOpen}
          snapPoints={['50%']}
          setSheetState={setIsOptionsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={
            <BottomsheetTitle
              title={testListData?.billing_item?.name}
              subtitle={'Inculdes ' + testListData?.billing_item?.lab_tests?.length + ' tests'}
            />
          }
          contentContainerStyle={styles.contentContainerStyle}
        >
          <TestListBottomSheet testData={testListData?.billing_item} />
        </CustomBottomSheet>
      )}
      {isSelectOpen && <PatientBottomSheet isOpen={isSelectOpen} setIsOpen={setIsSelectOpen} />}
    </AppContainer>
  );
};

export default InvestigationsList;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   header: {
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 7,
//   },

//   sectionContainer: {
//     paddingVertical: 5,
//     paddingHorizontal: 20,
//   },
//   section: {
//     ...FONTS.text,
//   },
//   messageText: {
//     ...FONTS.text,
//     fontSize: 8,
//     textAlign: 'center',
//   },
//   sectionBorderStyle: {
//     borderBottomColor: COLORS.black,
//     borderBottomWidth: 3,
//     width: '30%',
//   },
//   noAppointment: {
//     height: SIZES.screenHeight / 1.25,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   appointmentContainer: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   name: { fontFamily: FONTS.SFProDisplayRegular, color: COLORS.black_252525, fontSize: 16 },
//   nameArrow: { marginTop: 3, marginStart: SIZES.base },
//   filterIcon: { alignItems: 'center', height: 14, width: 14 },
//   line: {
//     borderBottomColor: COLORS.grey,
//     borderBottomWidth: 1,
//   },
//   filterText: {
//     marginStart: 20,
//     marginTop: 15,
//     fontSize: 10,
//     color: COLORS.text,
//     fontWeight: '500',
//   },
//   filterValue: {
//     marginTop: 15,
//     fontSize: 10,
//     color: COLORS.text,
//     fontWeight: '500',
//   },
//   patientLabel: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 6,
//     top: -8,
//     paddingStart: 5,
//     paddingEnd: 5,
//     paddingHorizontal: 1,
//     zIndex: 999,
//     fontSize: 12,
//     color: COLORS.text,
//   },
//   dropdown: {
//     borderColor: COLORS.grey_FAFAFA,
//     backgroundColor: 'white',
//     borderWidth: 1,
//     paddingHorizontal: 8,
//   },
//   placeholderStyle: {
//     fontSize: 15,
//   },
//   foodplaceholderStyle: {
//     fontSize: 8,
//   },
//   selectedTextStyle: {
//     fontSize: 15,
//   },
//   selectedFoodTextStyle: {
//     fontSize: 8,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   backgroundStyle: {
//     backgroundColor: COLORS.white,
//     borderColor: COLORS.gray,
//     borderWidth: 2,
//   },
//   accountIconStyle: {
//     marginTop: 5,
//     // marginHorizontal: 5,
//     marginRight: 5,
//     alignSelf: 'center',
//   },
//   accNameStyle: {
//     marginTop: 5,
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   imageTouchStyle: {
//     justifyContent: 'center',
//   },
//   viewStyle: {
//     marginTop: 15,
//   },
//   clearText: {
//     fontFamily: FONTS.Inter,
//     fontSize: 10,
//     fontWeight: '500',
//     marginTop: 15,
//     color: COLORS.text,
//     marginHorizontal: 10,
//   },
//   labBkarStyle: {
//     margin: 17,
//   },
//   testNameStyle: {
//     color: COLORS.black_121212,
//     fontSize: 13,
//     fontFamily: FONTS.SFProDisplaySemibold,
//     fontWeight: '600',
//     lineHeight: 25,
//     marginBottom: 10,
//   },
//   testTypeStyle: {
//     color: COLORS.background.primary,
//     fontSize: 10,
//     fontWeight: '400',
//     fontFamily: FONTS.SFProDisplayRegular,
//     lineHeight: 14,
//   },
//   deleteIcon: { width: 14, height: 17, marginHorizontal: 10 },
//   divider: {
//     borderBottomWidth: 1,
//     borderColor: COLORS.grey_E5E5E5,
//   },
//   labBkarBoxStyle: {
//     marginHorizontal: 10,
//     marginVertical: 20,
//     borderRadius: 5,
//     width: 56,
//     height: 56,
//   },
//   contentContainerStyle: {
//     width: '100%',
//     paddingHorizontal: 20,
//   },
// });
