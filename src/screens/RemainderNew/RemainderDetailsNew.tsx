import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppContainer, Box } from '../../components';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import { strings } from '../../i18n';
import { reminderUpdate } from '../../service/RemainderService';
import { RootState } from '../../state';
import { RemainderDBHandler } from '../../database/tables/Remainders';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Reminder.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import CustomHeader from '../../components/CustomHeader';
interface Props {
  navigation: any;
  route: {
    params: {
      onGoBack(reminder: any): unknown;
      item: any; // Consider specifying a more detailed type
      patient: any;
    };
  };
}

const RemainderDetailsNew = ({ navigation, route }: Props) => {
  const { item: reminder, patient } = route.params;
  const [isSwitchEnabled, setSwitchEnabled] = useState(reminder.is_remainder === 1);
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);
  const scheduleOptions = commonVariable[0]?.duration_type;

  const getTextForDurationType = (durationType: string) => {
    const matchingType = scheduleOptions?.find((type) => type.id === durationType);
    return matchingType ? matchingType.value : '';
  };

  const durationText = useMemo(() => getTextForDurationType(reminder?.duration_type), [reminder]);

  const handleSwitch = async () => {
    try {
      const data = !isSwitchEnabled ? 1 : 0;
      setSwitchEnabled(!isSwitchEnabled);
      await reminderUpdate(data, reminder?.prescription_id, reminder?.id);

      // Update the reminder in the SQLite database
      // Prepare the data
      if (data === 1) {
        const newRemainder: { [key: string]: any } = {
          ...reminder,
          reminder_set_at: new Date().toISOString(),
          last_updated_at: new Date().toISOString(),
        };
        await RemainderDBHandler.getInstance().addNewRemainder(newRemainder);
      } else {
        await RemainderDBHandler.getInstance().deleteRemainder(reminder?.id);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error setting remainder.');
    }
  };

  const getTextForDurationList = (durationType: any) => {
    const jsonObject = JSON.parse(durationType?.duration);
    if (jsonObject) {
      if (durationType?.duration_type === 'everyday') {
        const everydayValue = jsonObject?.duration_count
          ? jsonObject?.duration_count
          : '' + ' ' + jsonObject?.interval
            ? jsonObject?.interval
            : '';
        return everydayValue ? everydayValue : '';
      } else if (durationType?.duration_type === 'specific_days') {
        const specificdayValue =
          ' | ' +
          jsonObject?.specific_days?.join(',') +
          ' | ' +
          jsonObject?.duration_count +
          ' ' +
          jsonObject?.interval;
        return specificdayValue ? specificdayValue : '';
      } else if (durationType?.duration_type === 'interval_days') {
        const intervalDays =
          'Every ' +
          jsonObject?.interval_days +
          ' days' +
          ' | ' +
          jsonObject?.duration_count +
          ' ' +
          jsonObject?.interval;
        return intervalDays ? intervalDays : '';
      } else if (durationType?.duration_type === 'custom_date') {
        const customDate = jsonObject?.custom_date;
        const startDate = customDate?.startDate ? customDate.startDate : '';
        const endDate = customDate?.endDate ? customDate.endDate : '';
        return startDate + ' - ' + endDate;
      } else {
        return 'Mon, Tue | 10:00 AM, 12:00 AM, 01:00 PM';
      }
    }
  };

  const durationList = useMemo(() => getTextForDurationList(reminder), [reminder]);

  const handleTrackActivity = () => {
    navigation.navigate(
      'TrackActivity',
      { reminder: reminder, patient: patient },
      strings.displayText.track_activity,
    );
  };

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

  const handleBack = () => {
    route.params?.onGoBack?.(reminder);
    navigation.goBack();
  };

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        <CustomHeader
          leftIcon="arrow-left"
          rightIconType="image"
          rightIcon="EditBlue"
          onLeftIconPress={() => navigation.goBack()}
          onRightIconPress={() => {
            navigation.navigate(
              'CreateRemainder',
              {
                reminder: reminder,
                patient: patient,
                onGoBack: (data: any) => {
                  if (reminder.id === data?.id) {
                    reminder.is_remainder = data?.is_remainder;
                    setSwitchEnabled(data?.is_remainder);
                  }
                },
              },
              strings.displayText.edit_reminder,
            );
          }}
          title={strings.displayText.remainders}
          permission={reminder.access === 1 && UsePermission(permissionList.mobileReminderEdit)}
        />
        {/* <Box style={styles.header}>
          <Box style={styles.topBar}>
            <Box flexDirection="row" alignContent="center" alignItems="center">
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ padding: 1 }}
                hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
                onPress={() => {
                  handleBack();
                }}
              >
                <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
              </TouchableOpacity>
            </Box>
            <Text style={commonStyles.topTitleText}>
              {reminder?.symptom_name ?? strings.displayText.remainders}
            </Text>
            {reminder.access === 1 && UsePermission(permissionList.mobileReminderEdit) && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate(
                    'CreateRemainder',
                    {
                      reminder: reminder,
                      patient: patient,
                      onGoBack: (data: any) => {
                        if (reminder.id === data?.id) {
                          reminder.is_remainder = data?.is_remainder;
                          setSwitchEnabled(data?.is_remainder);
                        }
                      },
                    },
                    strings.displayText.edit_reminder,
                  );
                }}
              >
                <Image source={assets.EditBlue} style={commonStyles.menuIcon} />
              </TouchableOpacity>
            )}
            {reminder.access === 0 && <Box />}
          </Box>
        </Box> */}
        <Box style={styles.reminderBox}>
          <Text style={styles.reminderText}>{strings.displayText.reminder}</Text>
          {UsePermission(permissionList.mobileReminderAction) && (
            <TouchableOpacity
              activeOpacity={0.5}
              hitSlop={{ left: 70, right: 50, top: 10, bottom: 15 }}
              onPress={() => {
                handleSwitch();
              }}
            >
              {isSwitchEnabled === false ? (
                <Image source={assets.SwitchDisabled} style={styles.icon} />
              ) : (
                <Image source={assets.SwitchEnabled} style={styles.icon} />
              )}
            </TouchableOpacity>
          )}
        </Box>
        <Box marginTop={10} />
        <Box style={styles.titleDetailsContainer}>
          <Box style={styles.titleContainer}>
            <Text style={styles.name}>{strings.displayText.details}</Text>
          </Box>
        </Box>
        <Box marginTop={10} />
        <DetailItem
          label={strings.displayText.symptoms}
          value={reminder?.symptom_name}
          src={assets.NounSmell}
        />
        <DetailItem
          label={strings.displayText.medicineName}
          value={reminder?.productname}
          iconName="pill"
        />
        <DetailItem
          label={strings.displayText.dosage}
          value={reminder?.dosage ? reminder?.dosage : '-'}
          iconName="delete-clock-outline"
        />
        <DetailItem
          label={strings.displayText.startDate}
          value={reminder?.start_date ? reminder?.start_date : '-'}
          iconName="calendar-week-begin"
        />
        <DetailItem
          label={strings.displayText.frequency}
          value={reminder?.freq ? reminder?.freq : '-'}
          iconName="calendar-range-outline"
        />
        <DetailItem
          label={strings.displayText.schedule}
          value={durationList}
          type="Ionicons"
          iconName="calendar-outline"
        />
        <DetailItem
          label={strings.displayText.duration_for}
          value={durationText}
          iconName="calendar-clock-outline"
        />
        <DetailItem
          label={strings.displayText.end_date}
          value={reminder?.end_date ? reminder?.end_date : '-'}
          iconName="calendar-weekend"
        />
        <ImageBackground
          source={assets.BackGroundVaccine}
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              top: 140,
              left: -80,
            }}
          >
            <Image source={assets.TablesIcon} />
          </Box>
          <Box
            style={{
              position: 'absolute',
              bottom: -50,
              right: -20,
              // transform: [{ scaleX: -1 }]
              transform: [{ rotate: '300deg' }, { scaleX: -1 }],
            }}
          >
            <Image source={assets.TablesIcon} />
          </Box>
        </ImageBackground>
        {UsePermission(permissionList.mobileReminderTrackActivity) && (
          <Box style={styles.buttonBoxContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.bookSlotBtn}
              onPress={handleTrackActivity}
            >
              <Text style={styles.bookSlotBtnText}>{strings.displayText.track_activity}</Text>
            </TouchableOpacity>
          </Box>
        )}
      </AppContainer>
    </>
  );
};

export default RemainderDetailsNew;
