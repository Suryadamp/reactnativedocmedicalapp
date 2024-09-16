import React from 'react';
import { Text } from 'react-native-paper';
import { AppContainer, Box } from '../../components';
import { Image, ImageBackground } from 'react-native';
import { COLORS, assets } from '../../constants';
import { strings } from '../../i18n';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Vaccine.styles';
import CustomHeader from '../../components/CustomHeader';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const VaccineDetails = ({ navigation, route }: Props) => {
  const vaccine = route?.params?.item;

  const DetailItem = ({
    label,
    value,
    iconName,
    type,
    src,
  }: {
    label: string;
    value: string;
    iconName?: string;
    type?: string;
    src?: any;
  }) => (
    <Box style={styles.contentContainer}>
      <Box style={styles.contentContainerBox}>
        {iconName ? (
          type === 'Ionicons' ? (
            <Ionicons
              name={iconName}
              size={styles.commonStyle.iconSize}
              color={COLORS.background.primary}
            />
          ) : (
            <MaterialCommunityIcons
              name={iconName}
              size={styles.commonStyle.iconSize}
              color={COLORS.background.primary}
            />
          )
        ) : (
          <Image source={src} style={styles.detailImageStyle} />
        )}
      </Box>
      <Box style={styles.subContainer}>
        <Text style={styles.lightText}>{label}</Text>
        <Box style={styles.titleContainer}>
          <Text style={styles.contentText}>{value}</Text>
        </Box>
      </Box>
    </Box>
  );

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      {/* <Box backgroundColor={COLORS.background.white} flex={1}> */}
      {/* <StatusBar backgroundColor={COLORS.background.white} barStyle={'dark-content'} /> */}
      <CustomHeader
        leftIcon="arrow-left"
        onLeftIconPress={() => navigation.goBack()}
        title={strings.displayText.vaccinesDetails}
        hasDivider
      />
      {/* <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            style={{ padding: 1 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.vaccinesDetails}</Text>
          <TouchableOpacity activeOpacity={0.8} />
        </Box>
        <Box marginTop={styles.commonStyle.marginTop} style={styles.divider} />
      </Box> */}
      <Box style={styles.titleDetailsContainer}>
        <Box style={styles.titleContainer}>
          <Text style={styles.name}>{strings.displayText.immunizationInsights}</Text>
        </Box>
      </Box>
      <Box marginTop={styles.commonStyle.marginTop} />
      <DetailItem
        label={strings.displayText.duration}
        value={`${vaccine?.vaccine_master?.period_count} ${vaccine?.vaccine_master?.period_type} ${vaccine?.vaccine_master?.addon_period_count} ${vaccine?.vaccine_master?.addon_period_type}`}
        iconName="clock-time-four-outline"
      />
      <DetailItem
        label={strings.displayText.vaccineName}
        value={vaccine?.vaccine_master?.name}
        src={assets.SyrinceIcon}
      />
      <DetailItem
        label={strings.displayText.dueDate}
        value={vaccine?.due_date}
        iconName="alarm-outline"
        type="Ionicons"
      />
      <DetailItem
        label={strings.displayText.givenDate}
        value={vaccine?.given_date ? vaccine?.given_date : '-'}
        iconName="calendar-minus"
      />

      <DetailItem
        label={strings.displayText.weight}
        value={`${vaccine?.weight} kg`}
        iconName="scale-bathroom"
      />

      <DetailItem
        label={strings.displayText.height}
        value={`${vaccine?.height} cm`}
        iconName="human-male-height"
      />
      <DetailItem
        label={strings.displayText.headCir}
        value={`${vaccine?.head_cr} cm`}
        src={assets.HeadCircle}
      />
      <ImageBackground source={assets.BackGroundVaccine} style={styles.backGroundImage}>
        <Box style={styles.backGroundImageBox}>
          <Image source={assets.TablesIcon} />
        </Box>
        <Box style={styles.backGroundImageBoxTab}>
          <Image source={assets.TablesIcon} />
        </Box>
      </ImageBackground>
    </AppContainer>
  );
};

export default VaccineDetails;
