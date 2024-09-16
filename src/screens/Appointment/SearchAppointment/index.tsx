import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, Image, ListRenderItemInfo, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { AppContainer, Box } from '../../../components';
import { COLORS, SIZES, assets } from '../../../constants';
import { strings } from '../../../i18n';
import { RootStackParamList } from '../../../navigation/types';
import { RootState } from '../../../state';
import styles from '../../../styles/Appointment.styles';
import DoctorCard from './DoctorCard';
import CustomHeader from '../../../components/CustomHeader';
import { useScrollEndDetection } from '../../../hooks/useLogs';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

interface IdoctorDataTypes {
  id: number;
  doctor: string;
  doctorImage: string;
  category: string;
  venue: string;
}

const SearchAppointment = ({ route, navigation }: Props) => {
  const { handleScroll } = useScrollEndDetection();
  const navigationFrom = route?.params?.from || '';
  const [searchData, setSearchData] = useState<string>('');
  const { doctorsList } = useSelector((state: RootState) => state.doctors);
  const [filteredList, setFilteredList] = useState([]);

  const handleSearch = (searchTerm: string) => {
    setSearchData(searchTerm);
    const filtered = doctorsList[0]?.data.filter((item) => {
      return item?.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredList(filtered);
  };

  const handleRemoveSearchData = () => {
    setSearchData('');
  };

  const RenderDoc = ({ item, index }: ListRenderItemInfo<IdoctorDataTypes>) => {
    return (
      <DoctorCard
        item={item}
        key={index?.toString()}
        navigation={navigation}
        navigationFrom={navigationFrom}
      />
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
        title={strings.displayText.doctors_list}
        hasDivider
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      {/* <Box style={styles.header1}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ padding: 1 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.doctors_list}</Text>
          <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: 'center' }}>
            {/* <Image source={assets.filterGrey} style={styles.filterIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
      {/* <Box style={styles.divider} marginTop={10} /> */}
      <TextInput
        mode="outlined"
        value={searchData}
        style={styles.searchTextInput}
        placeholder={'Search doctor'}
        outlineStyle={{ borderWidth: 1 }}
        placeholderTextColor={COLORS.ligth_sliver}
        outlineColor={COLORS.light_grayish}
        activeOutlineColor={COLORS.background.primary}
        onChangeText={(val) => handleSearch(val)}
        right={
          <TextInput.Icon
            style={styles.searchDoctorInput}
            iconColor={searchData.length > 0 ? COLORS.black : COLORS.ligth_sliver}
            icon={searchData.length > 0 ? assets.CloseX : assets.SearchGrey}
            onPress={handleRemoveSearchData}
            size={searchData.length > 0 ? 20 : 25}
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
      {searchData.length > 0 && (
        <Box style={styles.searchForContainer}>
          <Text style={styles.textSearchResultFor}>{strings.displayText.search_results_for} </Text>
          <Text style={styles.textSearchResult}>{searchData}</Text>
        </Box>
      )}
      <Box style={styles.appointmentContainer}>
        <Box style={{ width: SIZES.screenWidth }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            data={
              // searchData?.length > 0 && filteredList?.length > 0 && filteredList !== null
              //   ? filteredList
              //   : doctorsList[0].data
              searchData?.length > 0 ? filteredList : doctorsList[0].data
            }
            keyExtractor={(_item, index) => index.toString()}
            renderItem={RenderDoc}
          />
        </Box>
      </Box>
    </AppContainer>
  );
};

export default SearchAppointment;
