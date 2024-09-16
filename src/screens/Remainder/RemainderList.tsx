import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppContainer, Box } from '../../components';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import FiltertDialog from '../../dialogs/FilterDialog';
import { RootStackParamList } from '../../navigation/types';
// import { getRemainderList } from '../../service/RemainderService';
import { RootState } from '../../state';
import { PatientItem } from '../../state/patients';
import { getCurrentDate } from '../../util/DateUtil';
import RemainderCard, { Remainder } from './RemainderCard';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const RemainderList = ({ navigation, route }: Props) => {
  const item = route?.params?.item;
  const [noRemainder, setNoRemainder] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isPatientsFocus, setIsPatientsFocus] = useState(false);
  const [patientsItem, setPatientsItem] = useState<PatientItem | undefined>(undefined);
  const { patientList } = useSelector((state: RootState) => state.patients);
  const [filterDate, setFilterDate] = useState({
    start_date: '',
    end_date: '',
  });
  const [RemainderList, setRemainderList] = useState<Remainder[]>();
  if (item !== null && item?.patient_sys_id !== null) {
    patientList.filter((patient: any) => {
      if (patient.id === item?.patient_sys_id) {
        setPatientsItem(patient);
      }
    });
  } else if (patientList) {
    setPatientsItem(patientList[0]);
  }

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    getRemainders();
  }, [patientsItem, filterDate]);

  const handlePatientSelect = (patient: PatientItem) => {
    setPatientsItem(patient);
    setIsPatientsFocus(false);
    getRemainders();
  };

  const handleFilterCallback = (data) => {
    if (data != null) {
      if (data?.option === 'option3') {
        setFilterDate({
          start_date: data.startDate,
          end_date: data.endDate,
        });
      } else if (data?.option === 'option2') {
        setFilterDate({
          start_date: '',
          end_date: '',
        });
      } else if (data?.option === 'option1') {
        const currentDate = getCurrentDate();
        setFilterDate({
          start_date: currentDate,
          end_date: currentDate,
        });
      }
      getRemainders();
    }
    closeDialog();
  };

  const getRemainders = () => {
    setTimeout(() => {}, 1000);
  };

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      {/* <Box style={styles.container}> */}
      {/* <StatusBar backgroundColor={COLORS.white} barStyle={'light-content'} /> */}
      <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ padding: 1 }}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={assets.backArrowBlack} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Remainders</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('CreateRemainder');
            }}
          >
            {/* <Image source={assets.plusBlack} style={styles.addIcon} /> */}
          </TouchableOpacity>
        </Box>
      </Box>
      <Box marginTop={10}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          paddingRight={20}
          backgroundColor={COLORS.grey_line}
        >
          <Box
            width={SIZES.screenWidth * 0.7}
            marginHorizontal={20}
            justifyContent="center"
            paddingBottom={15}
            paddingTop={14}
          ></Box>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              openDialog();
            }}
            style={{ justifyContent: 'center' }}
          >
            <Image source={assets.filterBlack} style={styles.filterIcon} />
          </TouchableOpacity>
        </Box>
        {(filterDate?.end_date || filterDate.start_date) && (
          <Box style={{}}>
            <Box flexDirection="row" style={styles.filterBoxStyles}>
              <Text style={styles.filterText}>*Filters are applied for </Text>
              <Text style={styles.filterText}>
                {filterDate?.start_date + ' - ' + filterDate?.end_date}
              </Text>
            </Box>
          </Box>
        )}
        <Box style={styles.medicineStyle}>
          <Text style={styles.medicineTitle}>Medication</Text>
        </Box>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
          <RemainderCard />
        </TouchableOpacity>
        <Box justifyContent="flex-end" position="absolute">
          <FiltertDialog
            visible={showDialog}
            onClose={closeDialog}
            callback={handleFilterCallback}
            closeDialog={closeDialog}
          />
        </Box>
      </Box>
      {/* </Box> */}
    </AppContainer>
  );
};

export default RemainderList;

const styles = StyleSheet.create({
  scrollViewStyle: { marginHorizontal: 20 },
  scrollViewContainer: { flexGrow: 1, paddingBottom: 150 },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    justifyContent: 'center',
    marginTop: 10,
  },
  filterBoxStyles: {
    width: '100%',
    padding: 10.463,
    paddingHorizontal: 17,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexShrink: 0,
  },
  medicineStyle: {
    width: '100%',
    display: 'flex',
    height: 41,
    padding: 0,
    paddingHorizontal: 17,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexShrink: 0,
    backgroundColor: COLORS.grey_line,
    borderTopColor: COLORS.white,
    borderTopWidth: 1,
  },
  medicineTitle: {
    color: '#222B45',
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  topBarTitle: {
    ...FONTS.h4,
    justifyContent: 'center',
  },
  icon: {
    height: 15,
    width: 20,
    justifyContent: 'center',
  },
  addIcon: {
    height: 25,
    width: 25,
    justifyContent: 'center',
  },
  sectionContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  section: {
    ...FONTS.text,
  },
  messageText: {
    ...FONTS.text,
    fontSize: 8,
    textAlign: 'center',
  },
  sectionBorderStyle: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 3,
    width: '30%',
  },
  noAppointment: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    marginTop: 150,
  },
  appointmentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: { fontFamily: FONTS.SFProDisplayRegular, color: COLORS.black_252525, fontSize: 16 },
  nameArrow: { marginTop: 3, marginStart: SIZES.base },
  filterIcon: { alignItems: 'center', height: 14, width: 14 },
  line: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },
  filterText: {
    color: '#207DFF',
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  patientLabel: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 6,
    top: -8,
    paddingStart: 5,
    paddingEnd: 5,
    paddingHorizontal: 1,
    zIndex: 999,
    fontSize: 12,
    color: COLORS.text,
  },
  dropdown: {
    borderColor: COLORS.grey_line,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  foodplaceholderStyle: {
    fontSize: 8,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  selectedFoodTextStyle: {
    fontSize: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
