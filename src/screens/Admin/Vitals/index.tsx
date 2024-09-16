/* eslint-disable react-hooks/exhaustive-deps */
// VitalLists
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import crashlytics from '@react-native-firebase/crashlytics';
import { RootStackParamList } from '../../../navigation/types';
import { COLORS, FONTS, SIZES, assets } from '../../../constants';
import { AppContainer, Box } from '../../../components';
import { strings } from '../../../i18n';
import { getAppointmentVitals, getVitalsByDoctor } from '../../../service/VitalService';
import styles from '../../../styles/AppointmentVitals.styles';
import store, { RootState } from '../../../state';
import { setAppointmentVitals } from '../../../state/vitals';
import InpatientLoader from '../../../components/InpatientLoader';
import CustomHeader from '../../../components/CustomHeader';
import { useScrollEndDetection } from '../../../hooks/useLogs';
import CustomIcon from '../../../components/CustomIcon';
import LinearGradient from 'react-native-linear-gradient';
import { SvgIcon } from '../../../constants/SvgIcon';
import { dateFormatter } from '../../../hooks/useCommon';
import { TextInput } from 'react-native-paper';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;
export const IconRender = ({ item }: any): any => {
  let IconName;
  let type = '';
  let source;
  let svg;

  switch (item?.vital_name) {
    case 'Height':
      IconName = 'human-male-height-variant';
      type = 'materialCommunity';
      break;
    case 'Weight':
      IconName = 'scale-bathroom';
      type = 'materialCommunity';
      break;
    case 'BP':
      source = assets.BloodPressure;
      break;
    case 'RBS':
      source = assets.BloodSugar;
      break;
    case 'IBW':
    case 'BMI':
      source = assets.BodyMass;
      break;
    case 'Temprature':
      IconName = 'temperature-high';
      type = 'fa5';
      break;
    default:
      svg = 'vital';
      break;
  }
  return type === '' ? (
    svg === 'vital' ? (
      <SvgIcon name={'ActiveVitalIcon'} />
    ) : (
      <Image source={source} style={{ width: 22, height: 20 }} />
    )
  ) : (
    <CustomIcon name={IconName} size={18} color="#207DFF" type={type} />
  );
};
const VitalItem = ({ item }: any) => {
  return (
    <LinearGradient
      colors={['rgba(210, 229, 255, 0.32)', 'rgba(235, 243, 255, 0)']}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 0, y: 0.5 }}
      style={styles.boxMainContainer}
    >
      <Box width={'20%'}>
        <Box
          backgroundColor="#F0F6FF"
          height={50}
          width={50}
          borderRadius={30}
          marginHorizontal={10}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <IconRender item={item} />
        </Box>
      </Box>
      <Box style={styles.secondWidth}>
        <Text style={styles.testNameStyle}>{item.vital_name}</Text>
        <Box display="flex" flexDirection="row">
          {item?.vital_unit === 'kg/m<sup>2</sup>' ? (
            <Text style={styles.unit}>
              {item.vital_value} <Text style={styles.unitText}> kg/m² </Text>
            </Text>
          ) : (
            <Text
              style={[
                styles.unit,
                {
                  color:
                    item?.vital_name === 'Temprature' || item?.vital_name === 'Weight'
                      ? COLORS.danger
                      : COLORS.green,
                },
              ]}
            >
              {item?.vital_value} {item?.vital_name === 'Temprature' && '° '}
              <Text style={styles.unitText}>{item?.vital_unit}</Text>
            </Text>
          )}
        </Box>
        <Text style={styles.date}>{dateFormatter(item?.vital_date)}</Text>
      </Box>
      <Box width={'10%'}>
        <CustomIcon name="chevron-right" size={20} color="#000" type="materialCommunity" />
      </Box>
    </LinearGradient>
    // </Box>
  );
};

const VitalList = ({ navigation, route }: Props) => {
  const currentState = store.getState();
  const { handleScroll } = useScrollEndDetection();
  const appointmentId = route?.params?.appointmentId;
  const doctorId = route?.params?.doctorId;
  const dispatch = useDispatch();
  const { appointmentVitals } = useSelector((state: RootState) => state.vitals);
  const [vitals, setVitals] = useState<any[]>(appointmentVitals);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    if (appointmentId) {
      getVitals();
    }
  }, [appointmentId]);

  useEffect(() => {
    setVitals(appointmentVitals);
  }, [appointmentVitals]);

  useEffect(() => {
    if (currentState.network.isConnected) {
      getVitalsByDoctor(doctorId);
    }
  }, [doctorId]);

  const getVitals = async () => {
    try {
      await getAppointmentVitals(appointmentId).then((response) => {
        if (response.success || response.data) {
          setIsLoading(false);
        } else {
          dispatch(setAppointmentVitals([]));
          setIsLoading(false);
        }
      });
    } catch (err) {
      crashlytics().recordError(new Error(`${err}`));
      setIsLoading(false);
    }
  };

  const filteredVitals = vitals?.filter((vital) =>
    vital?.vital_name?.toLowerCase().includes(searchText?.toLowerCase()),
  );

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon={'arrow-left'}
        title={strings.displayText.appointmentVitals}
        permission
        hasDivider
        rightIcon="plus"
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        onRightIconPress={() => {
          navigation.navigate('AddVitals', { appointmentId, doctorId });
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
          <Text style={commonStyles.topTitleText}>{strings.displayText.appointmentVitals}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('AddVitals', { appointmentId, doctorId });
            }}
          >
            <Image source={assets.AddPlusBlue} style={styles.addIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
      {isLoading && <InpatientLoader />}

      {!isLoading && (
        <Box marginTop={10}>
          {vitals?.length === 0 ? (
            <Box style={styles.noAppointment}>
              <Text
                style={{
                  fontFamily: FONTS.SFProDisplayMedium,
                  fontSize: 14,
                  lineHeight: 16,
                  color: '#8A8A8A',
                  marginVertical: 5,
                }}
              >
                No vitals found
              </Text>
            </Box>
          ) : (
            <>
              <Box marginHorizontal={20} marginBottom={10}>
                <TextInput
                  label={strings.displayText.search}
                  mode="outlined"
                  style={styles.searchInput}
                  outlineColor={COLORS.gray}
                  activeOutlineColor={COLORS.background.primary}
                  theme={{
                    colors: {
                      primary: COLORS.gray,
                      underlineColor: 'transparent',
                      background: COLORS.background.secondary,
                      onSurfaceVariant: '#8A8A8A',
                    },
                  }}
                  right={
                    <TextInput.Icon
                      style={styles.searchIcon}
                      iconColor={'#A7A7A7'}
                      icon={searchText.length > 0 ? assets.CloseX : assets.SearchGrey}
                      onPress={() => setSearchText('')}
                      size={searchText.length > 0 ? 22 : 22}
                    />
                  }
                  value={searchText}
                  onChangeText={(text) => setSearchText(text)}
                />
              </Box>
              <Box height={SIZES.screenHeight / 1.2}>
                <Text style={styles.observationText}>Observations</Text>
                <FlatList
                  data={filteredVitals || []}
                  onScroll={handleScroll}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(_item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <VitalItem item={item} key={index?.toString()} />
                  )}
                />
              </Box>
            </>
          )}
        </Box>
      )}
    </AppContainer>
  );
};

export default VitalList;
