// VitalLists
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { RootStackParamList } from '../../navigation/types';
import { COLORS, assets } from '../../constants';
import { AppContainer, Box, CustomDataNotFound, CustomHeader } from '../../components';
import { strings } from '../../i18n';
import { getVitalsByDoctor } from '../../service/VitalService';
import styles from '../../styles/AppointmentVitals.styles';
import store, { RootState } from '../../state';
import { getInpatientVitals } from '../../service/InpatientService';
import InpatientLoader from '../../components/InpatientLoader';
import { useScrollEndDetection } from '../../hooks/useLogs';
import CustomIcon from '../../components/CustomIcon';
import { TextInput } from 'react-native-paper';
import { dateFormatter } from '../../hooks/useCommon';
import { IconRender } from '../Admin/Vitals';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

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
              {item.vital_value} <Text style={styles.unitText}> kg/m²</Text>
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
  );
};

const VitalList = ({ navigation, route }: Props) => {
  const currentState = store.getState();
  const { handleScroll } = useScrollEndDetection();
  const ipAdmissionId = route?.params?.ipAdmissionId;
  const doctorId = route?.params?.doctorId;
  const { inpatientVitals } = useSelector((state: RootState) => state.inpatients);
  const [vitals, setVitals] = useState<any[]>(inpatientVitals || []);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getInpatientVitals(ipAdmissionId, {
      type: 'latest',
    }).then(() => setLoading(false));
  }, [ipAdmissionId]);

  useEffect(() => {
    setVitals(inpatientVitals || []);
  }, [inpatientVitals]);

  useEffect(() => {
    if (currentState.network.isConnected) {
      getVitalsByDoctor(doctorId);
    }
  }, [doctorId]);

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
        leftIcon={navigation.getState().type === 'drawer' ? 'menu' : 'arrow-left'}
        title={strings.displayText.inpatientVitals}
        hasDivider
        permission
        rightIcon="plus"
        onLeftIconPress={() => {
          if (navigation.getState().type === 'drawer') {
            navigation.dispatch(DrawerActions.openDrawer());
          } else {
            navigation.goBack();
          }
        }}
        onRightIconPress={() => {
          navigation.navigate('InpatientAddVitals', { ipAdmissionId, doctorId });
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
          <Text style={[commonStyles.topTitleText]}>{strings.displayText.inpatientVitals}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('InpatientAddVitals', { ipAdmissionId, doctorId });
            }}
          >
            <Image source={assets.AddPlusBlue} style={styles.addIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
      {isLoading && <InpatientLoader />}

      {!isLoading && (
        <Box marginTop={10}>
          {filteredVitals?.length === 0 ? (
            <Box style={styles.noAppointment}>
              <CustomDataNotFound type="bills" />
              {/* <Text
                style={{
                  fontFamily: FONTS.SFProDisplayMedium,
                  fontSize: 14,
                  lineHeight: 16,
                  color: '#8A8A8A',
                  marginVertical: 5,
                }}
              >
                No vitals found
              </Text> */}
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
              <Box marginBottom={70}>
                <Text style={styles.observationText}>Observations</Text>
                <FlatList
                  data={filteredVitals || []}
                  onScroll={handleScroll}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(_item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ViewVitals', { item, vitalsList: filteredVitals });
                      }}
                    >
                      <VitalItem item={item} key={index?.toString()} />
                    </TouchableOpacity>
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
