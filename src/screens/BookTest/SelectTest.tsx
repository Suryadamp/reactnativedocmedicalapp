import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { COLORS, assets } from '../../constants';
import {
  AbstractButton,
  AppContainer,
  Box,
  CustomDataNotFound,
  PatientBottomSheet,
  CustomHeader,
} from '../../components';
import { strings } from '../../i18n';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { commanConstants } from '../../constants/TextConstants';
import TestListBottomSheet from './TestListBottomSheet';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import { getBillItemsList } from '../../service/BillAndPaymentService';
import { createInvestigation } from '../../service/InvestigationService';
import LinearGradient from 'react-native-linear-gradient';
import TestSelectBottomSheet from './TestSelectBottomSheet';
import styles from '../../styles/BookTest.styles';
import commonStyles from '../../styles/Common.styles';
import { formatDateBType } from '../../util/DateUtil';
import { inpatientInvestigationCreate } from '../../service/InpatientService';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import InpatientLoader from '../../components/InpatientLoader';
import { isHpBottomTablet } from '../../hooks/useDeviceCheck';
import { useScrollEndDetection } from '../../hooks/useLogs';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;
interface BottomsheetTitleProps {
  title: string;
  subtitle: string;
}

export const BottomsheetTitle: React.FC<BottomsheetTitleProps> = ({ title, subtitle }) => {
  return (
    <Box flex={1}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Box>
  );
};

const AdvancePayment = ({ navigation, route }: Props) => {
  const { handleScroll } = useScrollEndDetection();
  const item = route?.params?.item;
  const ipAdmission = route?.params?.ipAdmission || null;
  const patientName = route?.params?.patientName;
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [testData, setTestData] = useState<Array<any>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [isSelectTestOpen, setIsSelectTestOpen] = useState(false);
  const [isInvestigation, setIsInvestigation] = useState(false);
  const [selectedItemIndexes, setSelectedItemIndexes] = useState([]);
  const [selectedInvestigation, setSelectedInvestigation] = useState<any>([]);
  const [testListData, settTestListData] = useState(null);
  const [selectedTestsDetails, setSelectedTestsDetails] = useState({
    totalAmount: 0,
    count: 0,
    selectedTests: {},
  });

  // BottomSheet Hooks
  const sheetRef = useRef<BottomSheet>(null);

  // BottomSheet Callbacks

  const handleTestClosePress = useCallback(() => {
    setIsTestOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleItemClick = (index: number) => {
    setSelectedItemIndexes((prevIndexes: any) => {
      const isSelected = prevIndexes.includes(index);
      if (isSelected) {
        return prevIndexes.filter((i: number) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };

  const handleRemoveSearchData = () => {
    setSearch('');
  };

  useEffect(() => {
    getLabTestItems();
  }, [selectedPatient]);

  useEffect(() => {
    const selectedTests = testData?.filter((test) => selectedItemIndexes.includes(test.id));
    if (selectedTests) {
      if (navigation.getState().type !== 'drawer') {
        // const convertedArray = selectedTests?.map((item) => item.id);
        //upcoming method production
        const convertedArray = selectedTests?.map((item) => ({ id: item.id, test_id: item.id }));
        setSelectedInvestigation(convertedArray);
      }
      const totalAmount = selectedTests?.reduce((sum, test) => sum + Number(test?.price), 0);
      setSelectedTestsDetails({
        totalAmount,
        count: selectedTests?.length,
        selectedTests: selectedTests,
      });
    }
  }, [selectedItemIndexes, testData]);

  const filteredData = testData?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const getLabTestItems = async () => {
    try {
      const result = await getBillItemsList(selectedPatient?.id);
      if (result) {
        setTestData(result?.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCreateInvestigation = async () => {
    try {
      if (ipAdmission) {
        const items = {};
        selectedInvestigation.forEach((investigation: any) => {
          items[investigation.id] = investigation.test_id;
        });
        const data = {
          ip_admission_id: ipAdmission.id,
          consultant_id: ipAdmission.doctor_id,
          date_created: formatDateBType(new Date(), 'DD/MM/Y hh:mm:ss A'),
          items,
        };
        console.log('data', data);
        setIsInvestigation(true);
        const response = await inpatientInvestigationCreate(data);
        console.log('response', response);
        if (response.success) {
          setIsInvestigation(false);
          navigation.navigate('InpatientInvestigation', { ipAdmission, from: 'SelectTest' });
          setSelectedInvestigation([]);
          setSelectedTestsDetails({ totalAmount: 0, count: 0, selectedTests: {} });
          setSelectedItemIndexes([]);
        }
        setIsInvestigation(false);
      } else {
        const data = {
          appoint_id: item?.id,
          // inves: selectedInvestigation,
          //upcoming method production
          investigation_product: selectedInvestigation,
        };
        setIsInvestigation(true);

        if (data) {
          const res = await createInvestigation(data);
          const randomFraction = Math.random();
          if (res?.message === 'Success') {
            setIsInvestigation(false);
            navigation.navigate('InvestigationsList', { render: randomFraction });
            setSelectedInvestigation([]);
            setSelectedTestsDetails({ totalAmount: 0, count: 0, selectedTests: {} });
            setSelectedItemIndexes([]);
          }
          setIsInvestigation(false);
        }
      }
    } catch (error) {
      setIsInvestigation(false);
      console.log(error);
    }
  };

  const TestRender = ({ item, index }: any) => {
    const isSelected = selectedItemIndexes.includes(item?.id);

    return (
      <>
        {/* <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          style={{ backgroundColor: isSelected ? COLORS.grey_F6F6F6 : COLORS.background.white }}
        > */}
        <LinearGradient
          colors={
            isSelected
              ? ['#EFF5FF', 'rgba(227, 239, 255, 0)']
              : [COLORS.background.white, COLORS.background.white]
          }
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
        >
          <Box
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '4%',
            }}
          >
            <Box width={styles.commonStyle.width}>
              <Box
                style={[
                  { backgroundColor: isSelected ? COLORS.background.white : '#EFF6FF' },
                  styles.labBkarBoxStyle,
                ]}
              >
                <IconButton
                  style={styles.labBkarStyle}
                  name="flask"
                  size={styles.commonStyle.height}
                  color={COLORS.background.primary}
                />
                {/* <Image style={styles.labBkarStyle} source={assets.LabBkar} /> */}
              </Box>
            </Box>
            <Box width={styles.secondWidth.width}>
              <Text
                style={[
                  styles.testNameStyle,
                  navigation.getState().type !== 'drawer' && {
                    marginBottom: 10,
                  },
                ]}
              >
                {item?.name}
              </Text>

              <TouchableOpacity
                disabled={item?.lab_tests?.length > 0 ? false : true}
                hitSlop={{ bottom: 50, top: 50, left: 50, right: 50 }}
                onPress={() => {
                  setIsTestOpen(true);
                  settTestListData(item);
                }}
              >
                <Box display="flex" flexDirection="row">
                  <Text style={styles.testTypeStyle}>
                    {'Includes'} {item?.lab_tests?.length} {'tests'}
                  </Text>

                  {item?.lab_tests?.length > 0 ? (
                    <IconButton name="chevron-down" size={16} color={COLORS.background.primary} />
                  ) : null}
                </Box>
              </TouchableOpacity>
              {navigation.getState().type === 'drawer' && (
                <Text style={styles.testAmountStyle}>
                  {commanConstants.rupeeSymbol} {item?.price}
                </Text>
              )}
            </Box>
            <Box width={styles.thirdWidth.width} justifyContent="flex-end" alignItems="flex-end">
              <TouchableOpacity
                onPress={() => handleItemClick(item?.id)}
                hitSlop={{ bottom: 50, top: 50, left: 50, right: 50 }}
                style={
                  {
                    // justifyContent: 'center',
                    // alignContent: 'center',
                    // alignItems: 'center',
                  }
                }
              >
                {isSelected ? (
                  <Image style={styles.deleteIcon} source={assets.deleteRed} />
                ) : (
                  <Box style={styles.plusBoxStyle}>
                    <IconButton name="plus" />
                  </Box>
                )}
              </TouchableOpacity>
            </Box>
          </Box>
          {/* </Box> */}
        </LinearGradient>
        <Box style={styles.divider} />
      </>
    );
  };

  const ButtonContent = (
    <Box style={styles.bottomFlexBox}>
      <Box width={'40%'} style={styles.amountBoxStyle}>
        <Text
          style={[
            styles.amountTxtStyle,
            {
              color: selectedTestsDetails?.totalAmount === 0 ? COLORS.lightGray : COLORS.black,
            },
          ]}
        >
          {navigation.getState().type === 'drawer'
            ? `${commanConstants.rupeeSymbol} ${selectedTestsDetails?.totalAmount}`
            : selectedTestsDetails.count}
        </Text>
        <TouchableOpacity
          disabled={navigation.getState().type === 'drawer' ? true : false}
          onPress={() => {
            if (selectedTestsDetails?.selectedTests?.length > 0) {
              setIsSelectTestOpen(true);
            }
          }}
        >
          <Text
            style={[
              styles.testAddTxtStyle,
              {
                color:
                  selectedTestsDetails?.count === 0 ? COLORS.lightGray : COLORS.background.primary,
              },
            ]}
          >
            {navigation.getState().type === 'drawer'
              ? `${selectedTestsDetails.count} ${strings.displayText.testAdded}`
              : 'View test details'}
          </Text>
        </TouchableOpacity>
      </Box>

      <Box width={'60%'}>
        <AbstractButton
          buttonStyle={styles.payBtn}
          textStyle={styles.btnTextStyle}
          loader={isInvestigation}
          disabled={selectedTestsDetails?.count === 0 ? true : false}
          onPress={() => {
            if (navigation.getState().type === 'drawer') {
              navigation.navigate('OrderSummary', {
                items: selectedTestsDetails?.selectedTests,
              });
              setSelectedTestsDetails({ totalAmount: 0, count: 0, selectedTests: {} });
              setSelectedItemIndexes([]);
            } else {
              handleCreateInvestigation();
            }
          }}
        >
          {navigation.getState().type === 'drawer'
            ? strings.displayText.proceed
            : strings.displayText.save}
        </AbstractButton>
      </Box>
    </Box>
  );

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        <CustomHeader
          leftIcon={navigation.getState().type === 'drawer' ? 'menu' : 'arrow-left'}
          hasDivider
          title={strings.displayText.addInvestigation}
          onLeftIconPress={() => {
            if (navigation.getState().type === 'drawer') {
              navigation.dispatch(DrawerActions.openDrawer());
            } else {
              navigation.goBack();
            }
          }}
        />
        {/* <StatusBar backgroundColor={COLORS.background.white} barStyle={'dark-content'} /> */}
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
            <Text style={commonStyles.topTitleText}>
              {navigation.getState().type === 'drawer'
                ? strings.displayText.selectTest
                : strings.displayText.addInvestigation}
            </Text>
            <Box />
          </Box>
        </Box> */}
        {/* <Box marginTop={10} />
        <Box style={styles.divider} /> */}
        <Box marginHorizontal="4%">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              ipAdmission ? null : setIsOpen(true);
            }}
          >
            <Box style={styles.accountBoxIconStyle}>
              <IconButton
                style={styles.accountIconStyle}
                name="account"
                size={styles.userIcon.height}
                color={COLORS.background.primary}
              />
              <Text style={styles.accNameStyle}>{patientName || selectedPatient?.name}</Text>
            </Box>
          </TouchableOpacity>
          <TextInput
            // label={strings.displayText.searchTest}
            mode="outlined"
            style={styles.inputTxtStyle}
            value={search}
            placeholder={strings.displayText.searchTest}
            placeholderTextColor={COLORS.light_grayish}
            outlineColor={COLORS.light_grayish}
            activeOutlineColor={COLORS.background.primary}
            outlineStyle={{ borderWidth: 1 }}
            onChangeText={(text) => {
              setSearch(text);
            }}
            // Add an icon at the end of the TextInput
            right={
              <TextInput.Icon
                // style={styles.searchDoctorInput}
                style={{ marginTop: 15 }}
                iconColor={search.length > 0 ? COLORS.black : COLORS.ligth_sliver}
                icon={search.length > 0 ? assets.CloseX : assets.SearchGrey}
                onPress={handleRemoveSearchData}
                size={search.length > 0 ? 20 : 25}
              />
            }
            theme={{
              colors: {
                primary: COLORS.grey,
                underlineColor: 'transparent',
                background: COLORS.white,
              },
              roundness: 8,
            }}
          />
        </Box>
        {isLoading && <InpatientLoader />}
        {!isLoading && (
          <Box style={styles.flatBoxStyle}>
            {filteredData && filteredData.length === 0 && <CustomDataNotFound type="medicalRecords" />}
            {filteredData && filteredData.length > 0 && (
              <FlatList
                data={filteredData}
                onScroll={handleScroll}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TestRender item={item} index={index} key={index?.toString()} />
                )}
              />
            )}
          </Box>
        )}
        <Box marginTop={10} />
        {navigation.getState().type === 'drawer'
          ? UsePermission(permissionList.mobileBookTestAdd) && ButtonContent
          : ButtonContent}
      </AppContainer>
      {isOpen && <PatientBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isTestOpen && (
        <CustomBottomSheet
          openBSheet={isTestOpen}
          // snapPoints={[`${isHpBottomTablet(4.5)}`]}
          snapPoints={['70%']}
          setSheetState={setIsTestOpen}
          enableDynamicSizing
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={
            <BottomsheetTitle
              title={testListData?.name}
              subtitle={'Inculdes ' + testListData?.lab_tests?.length + ' tests'}
            />
          }
          contentContainerStyle={styles.contentContainerStyle}
        >
          <TestListBottomSheet testData={testListData} handleClosePress={handleTestClosePress} />
        </CustomBottomSheet>
      )}
      {isSelectTestOpen && (
        <CustomBottomSheet
          openBSheet={isSelectTestOpen}
          snapPoints={['50%']}
          setSheetState={setIsSelectTestOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={'Selected Test'}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <TestSelectBottomSheet
            testData={selectedTestsDetails?.selectedTests}
            handleDelete={handleItemClick}
          />
        </CustomBottomSheet>
      )}
    </>
  );
};

export default AdvancePayment;
