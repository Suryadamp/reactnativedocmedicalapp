/* eslint-disable react-hooks/exhaustive-deps */
// InpatientInvestigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import { AppContainer, Box, PatientBottomSheet, CustomHeader } from '../../components';
import { showSnackBar, showSuccessSnackBar } from '../../util/AlertUtil';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import { strings } from '../../i18n';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  inpatientGetInvestigation,
  inpatientDeleteInvestigation,
} from '../../service/InpatientService';
import { BottomsheetTitle } from '../BookTest/SelectTest';
import DeleteMedicine from '../../dialogs/DeleteMedicineDialog';
import commonStyles from '../../styles/Common.styles';
import styles from '../../styles/Investigation.styles';
import InpatientLoader from '../../components/InpatientLoader';
import { useScrollEndDetection } from '../../hooks/useLogs';
interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const InpatientInvestigation = ({ navigation, route }: Props) => {
  const navigationFrom = route?.params?.from || '';
  const ipAdmission = route?.params?.ipAdmission;
  const ipAdmissionId = route?.params?.ipAdmission?.id;
  const ipAdmissionPatientName = route?.params?.ipAdmission?.name;
  const { handleScroll } = useScrollEndDetection();
  const [investigationList, setInvestigationList] = useState<any[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [deleteType, setDeleteType] = useState(''); // eslint-disable-line
  const [testListData, setTestListData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    getIpInvestigationList();
  }, [navigationFrom]);

  console.log('investigationList', investigationList);
  const getIpInvestigationList = async () => {
    await inpatientGetInvestigation(ipAdmissionId)
      .then((resp) => {
        console.log('resp', resp);
        if (resp.success) {
          setInvestigationList(resp?.data);
        }
        setIsLoading(false);
      })
      .catch((_err) => {
        setIsLoading(false);
      });
  };

  const handleDelete = async () => {
    setShowLoader(true);
    await inpatientDeleteInvestigation(testListData?.id)
      .then(async (resp) => {
        console.log('resp', resp);
        if (resp?.message === 'Deleted Successfully') {
          showSuccessSnackBar('Investigation deleted successfully.');
          await getIpInvestigationList();
          setShowDialog(false);
        } else {
          // showSnackBar('Investigation deleted failed.');
        }
      })
      .catch((_err) => {
        // showSnackBar('Investigation deleted failed.');
      });
    setShowLoader(false);
  };

  const TestRender = ({ item }: any) => {
    console.log('item', item);

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
            <Text style={styles.testNameStyle}>{item?.doctor_name}</Text>

            <TouchableOpacity
              disabled={item?.items?.length > 0 ? false : true}
              hitSlop={{ bottom: 50, top: 15, left: 30, right: 30 }}
              onPress={() => {
                setIsOptionsOpen(true);
                setTestListData(item);
              }}
            >
              <Box display="flex" flexDirection="row">
                <Text style={styles.testTypeStyle}>
                  {'Includes'} {item?.items.split(',').length} {'tests'}
                </Text>
                {item?.items?.length > 0 ? (
                  <IconButton name="chevron-down" size={12} color={COLORS.background.primary} />
                ) : null}
              </Box>
            </TouchableOpacity>
          </Box>
          <Box style={styles.thirdWidth}>
            <TouchableOpacity
              hitSlop={{ bottom: 50, top: 50, left: 50, right: 50 }}
              onPress={() => {
                openDialog();
                setTestListData(item);
                setDeleteType('Select');
              }}
            >
              <Image style={styles.deleteIcon} source={assets.deleteRed} />
            </TouchableOpacity>
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
        leftIcon={'arrow-left'}
        title={strings.displayText.investigations}
        permission
        rightIcon="plus"
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        onRightIconPress={() => {
          navigation.navigate('SelectTest', {
            item: ipAdmission,
            patientName: ipAdmission.name,
            ipAdmission,
          });
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('SelectTest', {
                item: ipAdmission,
                patientName: ipAdmission.name,
                ipAdmission,
              });
            }}
          >
            <Image source={assets.AddPlusBlue} style={commonStyles.menuIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
      <Box>
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
            <Box display="flex" flexDirection="row">
              <IconButton
                style={styles.accountIconStyle}
                name="account"
                size={commonStyles.userIcon.height}
                color={COLORS.background.primary}
              />
              <Text style={styles.accNameStyle}>{ipAdmissionPatientName}</Text>
            </Box>
          </Box>
        </Box>
        {isLoading && (
          <Box style={styles.noAppointment}>
            <InpatientLoader />
          </Box>
        )}
        {!isLoading && investigationList?.length === 0 ? (
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
        ) : (
          <Box height={SIZES.screenHeight / 1.2}>
            <FlatList
              data={investigationList}
              onScroll={handleScroll}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item, index }) => <TestRender item={item} key={index?.toString()} />}
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
          snapPoints={['42%']}
          setSheetState={setIsOptionsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={
            <BottomsheetTitle
              title={testListData?.doctor_name}
              subtitle={'Inculdes ' + testListData?.items.split(',').length + ' tests'}
            />
          }
          contentContainerStyle={styles.contentContainerStyle}
        >
          <>
            <Box style={styles.testListContainer}>
              <Box height={'100%'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <FlatList
                    data={testListData?.items.split(',')}
                    onScroll={handleScroll}
                    keyExtractor={(_item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          marginHorizontal={20}
                          marginVertical={10}
                        >
                          <Text style={styles.testNameStyle}>{item}</Text>
                        </Box>
                        <Box style={styles.testListDivider} />
                      </>
                    )}
                  />
                </ScrollView>
              </Box>
            </Box>
          </>
        </CustomBottomSheet>
      )}
      {isSelectOpen && <PatientBottomSheet isOpen={isSelectOpen} setIsOpen={setIsSelectOpen} />}
    </AppContainer>
  );
};

export default InpatientInvestigation;
