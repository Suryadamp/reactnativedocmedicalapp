import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { AppContainer, Box, CustomDataNotFound, PatientBottomSheet } from '../../components';
import { COLORS, assets, FONTS, SIZES } from '../../constants';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import LabReportListItem from './LabReportListItem';
import LabFilterBottomSheet from './LabFilterBottomSheet';
import { strings } from '../../i18n';
import LabReportBottomSheet from './LabReportBottomSheet';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import { DrawerActions } from '@react-navigation/native';
import { showErrorSnackBar, Snackbar } from '../../util/AlertUtil';
import { LabItems, LabReportResult, getLabReports } from '../../service/LaboratoryService';
import {
  getCurrentYear,
  getFormattedDate,
  getBeforeMonthOf1stDate,
  getCurrentDate,
} from '../../util/DateUtil';
import { BillingLabData, getBillItemsList } from '../../service/BillAndPaymentService';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/Laboratory.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import { formatDateBType } from '../../util/DateUtil';
import InpatientLoader from '../../components/InpatientLoader';
import CustomHeader from '../../components/CustomHeader';
import { isHpBottomTablet, isHpTablet } from '../../hooks/useDeviceCheck';
import { useScrollEndDetection } from '../../hooks/useLogs';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

interface BottomsheetTitleProps {
  title: string | null;
  subtitle: string | null;
}

export const BottomsheetTitle: React.FC<BottomsheetTitleProps> = ({ title, subtitle }) => {
  return (
    <Box flex={1}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Box>
  );
};

const LabReports = ({ navigation }: Props) => {
  const { handleScroll } = useScrollEndDetection();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReportBs, setIsOpenReportBs] = useState(false);
  const [selectedLabItem, setSelectedLabItem] = useState<LabItems>();
  const [isOpenPatient, setIsOpenPatient] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedFilterType, setSelectedFilterType] = useState({
    testId: '',
    fromDate: '',
    toDate: '',
  });
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const [labReportList, setLabReportList] = useState<LabReportResult[]>([]);
  const [testData, setTestData] = useState<any>();
  const snapPoints = ['50%'];

  useEffect(() => {
    getLabReportList();
    getLabTestItems();
  }, [selectedFilterType, selectedPatient]);

  const getLabReportList = async () => {
    await getLabReports(
      selectedPatient?.id,
      selectedFilterType.testId,
      selectedFilterType.fromDate,
      selectedFilterType.toDate,
    )
      .then((resp) => {
        if (resp) {
          if (resp?.data?.length > 0) {
            setLabReportList(resp?.data);
          } else {
            setLabReportList([]);
          }
        } else {
          showErrorSnackBar(strings.displayText.service_error, {
            duration: Snackbar.LENGTH_LONG,
          });
        }
        setIsLoading(false);
      })
      .catch((_err) => {
        setIsLoading(false);
        showErrorSnackBar(strings.displayText.service_error, {
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

  // BottomSheet Hooks
  const sheetRef = useRef<BottomSheet>(null);

  // BottomSheet Callbacks
  const handleClosePress = useCallback(() => {
    setIsOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleSelectedFilterType = (filterType: {
    testData: string;
    date: string;
    dateRange: string;
  }) => {
    var testId = '';
    var fromDate = '';
    var toDate = getCurrentDate();
    if (typeof filterType === 'string' && filterType == strings.displayText.all) {
      setSelectedFilterType({
        ...selectedFilterType,
        testId: '',
        fromDate: '',
        toDate: '',
      });
    } else {
      if (filterType.testData.length > 0) {
        testId = getTestId(filterType.testData);
      }
      if (filterType.date.length > 0) {
        fromDate = getCurrentDate();
      }
      if (filterType.dateRange.length > 0) {
        if (filterType.dateRange === strings.displayText.today) {
          fromDate = getCurrentDate();
        } else if (filterType.dateRange === strings.displayText.last1Month) {
          fromDate = getBeforeMonthOf1stDate(1);
        } else if (filterType.dateRange === strings.displayText.last6Month) {
          fromDate = getBeforeMonthOf1stDate(6);
        } else if (filterType.dateRange === strings.displayText.last1Year) {
          fromDate = getBeforeMonthOf1stDate(12);
        }
      }

      setSelectedFilterType({
        ...selectedFilterType,
        testId: testId,
        fromDate: fromDate ? formatDateBType(fromDate, 'yyyy-MM-DD') : '',
        toDate: formatDateBType(toDate, 'yyyy-MM-DD'),
      });
    }

    // getLabReportList();
  };

  const getTestId = (searchText: string): string => {
    let foundObject = null;
    testData.forEach((obj: BillingLabData) => {
      if (obj.name === searchText) {
        foundObject = obj;
        return false;
      }
    });
    return '' + foundObject?.id;
  };

  const getLabTestItems = async () => {
    try {
      const result = await getBillItemsList();
      if (result) {
        setTestData(result?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = (props) => (
    <Box>
      <TouchableOpacity
        onPress={async () => {
          navigation.navigate('LabReportDetails', { item: props.item });
        }}
        disabled={!UsePermission(permissionList.mobileLabReportPrint)}
      >
        <Box flexDirection="row" marginTop={styles.labCommonStyles.marginTop}>
          <Text style={styles.sectionTitle}>{props.item?.bill_no}</Text>
          <MaterialCommunityIcons
            name="file-document-outline"
            style={{ marginHorizontal: 4, alignSelf: 'center' }}
            size={styles.userIcon.height}
            color={'#232323'}
          />

          {/* <Image source={assets.fileEarMark} style={{ alignSelf: 'center', marginLeft: 5 }} /> */}
        </Box>
      </TouchableOpacity>

      <FlatList
        data={props.item?.items}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <LabReportRenderItem item={item} bill_date={props.item.bill_date} />
        )}
        extraData={props.item}
      />
    </Box>
  );

  /* const openURL = (url) => {
    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          console.error('Opening URL is not supported');
        } else {
          console.log('URL opened successfully');
        }
      })
      .catch((err) => console.error('Error opening URL:', err));
  }; */

  const LabReportRenderItem = ({ bill_date, item }) => (
    <LabReportListItem
      setIsOpenReportBs={setIsOpenReportBs}
      item={item}
      bill_date={bill_date}
      navigation={navigation}
      setSelectedLabItem={setSelectedLabItem}
    />
  );

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon="menu"
        rightIcon="tune-variant"
        rightIconType="icon"
        permission={false}
        hasDivider
        title={strings.displayText.lab_reports}
        iconColor={'#232323'}
        iconSize={isHpTablet('2%')}
        onLeftIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        onRightIconPress={() => setIsOpen(true)}
      />
      {/* <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Image source={assets.HamburgerMenu} style={commonStyles.menuIcon} />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.lab_reports}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsOpen(true)}
            style={{ justifyContent: 'center' }}
          >
            <Image source={assets.filterBlack} style={commonStyles.menuIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
      {/* <Box style={styles.divider} marginTop={styles.labCommonStyles.marginTop} /> */}
      <Box style={[styles.pateintContainer, { marginEnd: styles.pateintContainer.marginTop }]}>
        <Text style={styles.yearText}>{getCurrentYear()}</Text>
        <TouchableOpacity
          hitSlop={{ top: 25, bottom: 10, left: 50, right: 50 }}
          onPress={() => {
            setIsOpenPatient(true);
          }}
        >
          <Box flexDirection="row" paddingVertical={styles.nameText.marginLeft}>
            <FontIcon
              name="user-alt"
              style={styles.userFontIcon}
              size={styles.userIcon.height}
              color={COLORS.background.primary}
            />

            <Text style={styles.nameText}>{selectedPatient?.name}</Text>
          </Box>
        </TouchableOpacity>
      </Box>
      {isLoading && <InpatientLoader />}
      {!isLoading && labReportList?.length == 0 && <CustomDataNotFound />}
      {!isLoading && labReportList?.length > 0 && (
        <Box style={styles.pateintDetailsContainer}>
          <FlatList
            data={labReportList}
            onScroll={handleScroll}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={renderItem}
          />
        </Box>
      )}

      {isOpen && (
        <CustomBottomSheet
          openBSheet={isOpen}
          snapPoints={['70%']}
          enableDynamicSizing
          setSheetState={setIsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.filters}
        >
          <LabFilterBottomSheet
            handleSelectedFilterType={handleSelectedFilterType}
            handleClosePress={handleClosePress}
            data={testData}
          />
        </CustomBottomSheet>
      )}

      {/* List of report bottomsheet */}
      {isOpenReportBs && (
        <CustomBottomSheet
          openBSheet={isOpenReportBs}
          snapPoints={['40%']}
          setSheetState={setIsOpenReportBs}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={
            <BottomsheetTitle
              title={selectedLabItem?.item_name}
              subtitle={
                selectedLabItem?.sub_tests[0]?.sample_date
                  ? getFormattedDate(selectedLabItem?.sub_tests[0]?.sample_date)
                  : ''
              }
            />
          }
        >
          <LabReportBottomSheet sub_tests={selectedLabItem?.sub_tests} />
        </CustomBottomSheet>
      )}
      {isOpenPatient && <PatientBottomSheet isOpen={isOpenPatient} setIsOpen={setIsOpenPatient} />}
    </AppContainer>
  );
};

export default LabReports;
