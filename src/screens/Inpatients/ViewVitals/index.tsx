import { Platform, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppContainer, Box, CustomBottomSheet, CustomHeader } from '../../../components';
import { COLORS } from '../../../constants';
import styles from '../../../styles/AppointmentVitals.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import ChipTextInput from '../../../components/ChipTextInput';
import ListBottomSheet from '../../../sheets/Inpatients/ListBottomSheet';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state';
// import VitalHistoryCard from './VitalHistoryCard';
import VictoryLineChart from '../../../components/CustomVictoryChart';
import CustomIcon from '../../../components/CustomIcon';
import { isWpTablet } from '../../../hooks/useDeviceCheck';
import { getInpatientVitals } from '../../../service/InpatientService';
import InpatientLoader from '../../../components/InpatientLoader';

interface NavigateProps {
  navigation: any;
  route: any;
}

type selectType = { name: string; id: number };

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const filterDataList = [
  { id: 1, name: 'Today' },
  { id: 2, name: 'Last 1 Month' },
  { id: 3, name: 'Last 6 Month' },
];

const stableColors = [
  '#FF5733',
  '#33FFA8',
  '#3358FF',
  '#FF33D1',
  '#FFE333',
  '#FF3333',
  '#33FF33',
  '#3333FF',
  '#8D33FF',
  '#33FFEE',
  '#FF8833',
  '#33FFC8',
  '#3322FF',
  '#FF33C1',
  '#FFF333',
  '#FF33CC',
  '#33FF73',
  '#33CCFF',
  '#B333FF',
  '#33FFAA',
];

const ViewVitals = ({ navigation, route }: Props) => {
  const today = new Date();
  const dateOnly = today.toISOString().slice(0, 10);
  const { item } = route?.params;
  const { vitals } = useSelector((state: RootState) => state.inpatients);
  const [chips, setChips] = useState<any>([]);
  const [isOpenVitals, setOpenVitalsSheet] = useState<boolean>(false);
  const [sheetVitals, setSheetVitals] = useState<any>(vitals);
  const [vitalsList, setVitalsList] = useState<any>([]);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [selectText, setSelectText] = useState<string>('Today');
  const [selectItem, setSelectItem] = useState<any>([item?.vital_id]);
  const [selectDate, setSelectDate] = useState<any>(dateOnly);
  const [isLoading, setLoading] = useState<boolean>(true);

  const data = { vital_ids: selectItem, from_date: selectDate };

  const handleOpen = () => {
    setOpenVitalsSheet(true);
  };

  const handleAddVitals = (vital: any) => {
    setChips([...chips, vital]);
    setSelectItem([...selectItem, vital?.id]);
    setSheetVitals(sheetVitals.filter((shItm: any) => shItm.id !== vital.id));
    setOpenVitalsSheet(false);
  };

  const removeValue = (itemToRemove: any) => {
    setChips(chips.filter((chip: any) => chip.id !== itemToRemove.id));
    setSelectItem(selectItem.filter((id: any) => id !== itemToRemove.id));
    setSheetVitals([...sheetVitals, itemToRemove]);
  };

  const handleMonthSelect = (select: selectType) => {
    const firstDate = calculateFirstDate(select);
    setSelectText(select?.name);
    setSelectDate(firstDate);
    setIsOpenFilter(false);
  };

  const calculateFirstDate = (select: selectType) => {
    const firstDate = new Date();
    let monthsToSubtract = 0;

    switch (select?.name) {
      case 'Last 6 Month':
        monthsToSubtract = 6;
        break;
      case 'Last 1 Month':
        monthsToSubtract = 1;
        break;
      default:
        break;
    }

    firstDate.setMonth(firstDate.getMonth() - monthsToSubtract);
    firstDate.setDate(1);

    return select?.name === 'Today' ? dateOnly : firstDate?.toISOString().slice(0, 10);
  };

  const groupedData = vitalsList?.reduce(
    (acc: { [x: string]: any[] }, curr: { vital_id: string | number }) => {
      if (!acc[curr.vital_id]) {
        acc[curr.vital_id] = [];
      }
      acc[curr.vital_id].push(curr);
      return acc;
    },
    {},
  );

  const modifiedData = Object.values(groupedData).map((group, index) => {
    const firstItem = group[0];
    const dataPoints = group?.map((item) => {
      return {
        x: parseDate(item.vital_date) ? new Date(parseDate(item.vital_date)) : null,
        y: parseInt(item.vital_value),
      };
    });
    return {
      id: firstItem.vital_id,
      name: firstItem.vital_name,
      item: dataPoints,
      color: stableColors[index % stableColors.length]
        ? stableColors[index % stableColors.length]
        : COLORS.background.primary,
    };
  });

  function parseDate(dateString: any) {
    const [date, time] = dateString?.split(' ');
    const [year, month, day] = date?.split('-');
    const [hour, minute, second] = time?.slice(0, -3).split(':');
    return `${year}-${month}-${day}T${hour}:${minute}:${second || '00'}`;
  }

  useEffect(() => {
    setLoading(true);
    getInpatientVitals(item.ip_admission_id, data).then((res) => {
      if (res?.success || res?.data) {
        setVitalsList(res?.data);
      }
      setLoading(false);
    });
  }, [selectItem, selectDate]);

  useEffect(() => {
    if (item?.vital_id) {
      setSheetVitals(sheetVitals.filter((shItm: any) => shItm.id !== item.vital_id));
    }
  }, []);

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon={'arrow-left'}
        title={item?.vital_name ?? 'Vitals Details'}
        hasDivider
        permission
        // rightIcon="plus"
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        // onRightIconPress={() => {
        //   navigation.navigate('AddVitals');
        // }}
      />
      <ChipTextInput handleOpen={handleOpen} handleRemove={removeValue} value={chips} />

      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        marginHorizontal={20}
        marginVertical={10}
      >
        <Text style={styles.comparsionTrend}>Comparison Trend</Text>
        <TouchableOpacity onPress={() => setIsOpenFilter(true)} style={styles.selectTextTouch}>
          <Text style={styles.selectText}>{selectText}</Text>
          <CustomIcon name={'chevron-down'} size={18} type={'materialCommunity'} />
        </TouchableOpacity>
      </Box>
      {isLoading ? (
        <InpatientLoader />
      ) : (
        <>
          {modifiedData.length > 0 ? (
            <Box height={isWpTablet('110%')}>
              <VictoryLineChart dateRangeType={selectText} lineData={modifiedData} />
            </Box>
          ) : (
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              height={'60%'}
            >
              <Text>No data found.</Text>
            </Box>
          )}
        </>
      )}
      {/* Featue purpose */}
      {/* <Text style={{ fontSize: 15, fontFamily: FONTS.SFProDisplaySemibold, marginHorizontal: 20 }}>
        History
      </Text>

      <FlatList
        data={dataList || []}
        keyExtractor={(item: any) => item.id.toString()} // Assuming id is a unique identifier
        renderItem={({ item }) => <VitalHistoryCard item={item} />}
      /> */}

      {isOpenVitals && (
        <CustomBottomSheet
          openBSheet={isOpenVitals}
          snapPoints={['45%']}
          setSheetState={(data) => setOpenVitalsSheet(data)}
          backgroundStyle={styles.backgroundStyle}
          title="Options"
        >
          <ListBottomSheet
            items={sheetVitals}
            item={'test'}
            type="name"
            onChange={handleAddVitals}
          />
        </CustomBottomSheet>
      )}
      {isOpenFilter && (
        <CustomBottomSheet
          openBSheet={isOpenFilter}
          snapPoints={['45%']}
          setSheetState={(data) => setIsOpenFilter(data)}
          backgroundStyle={styles.backgroundStyle}
          title="Options"
        >
          <ListBottomSheet
            items={filterDataList}
            item={'test'}
            type="name"
            onChange={handleMonthSelect}
          />
        </CustomBottomSheet>
      )}
    </AppContainer>
  );
};

export default ViewVitals;
