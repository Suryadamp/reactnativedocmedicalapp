/* eslint-disable react/react-in-jsx-scope */
import { Image, Text, TouchableOpacity } from 'react-native';
import { Box } from '../../components';
import { COLORS, assets } from '../../constants';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import { FlatList } from 'native-base';
import styles from '../../styles/Prescription.styles';
import commonStyles from '../../styles/Common.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import IconButton from '../../components/IconButton';
import { useScrollEndDetection } from '../../hooks/useLogs';

interface Dosage {
  created_at: string | null;
  created_by: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
  dosage_time: string;
  id: number;
  prescription_product_id: string;
  updated_at: string | null;
  updated_by: string | null;
}

interface Product {
  id: number;
  name: string;
}

interface Symptom {
  id: number;
  symptom_name: string;
}

interface PrescriptionProduct {
  created_at: string | null;
  created_by: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
  dosages: Dosage[];
  dosage: string;
  duration_type: string;
  prescription_id: string;
  product: Product;
  product_id: string;
  remarks: string | null;
  start_date: string;
  symptom: Symptom;
  symptom_id: string;
  units: string;
  updated_at: string;
  updated_by: string | null;
}

interface PrescriptionCardProps {
  item: PrescriptionProduct;
  openBSheet(item: any): Function;
  openDialog: Function;
  handleNavigation: Function;
}

const MedicineCard = ({
  item,
  openBSheet,
  openDialog,
  handleNavigation,
}: PrescriptionCardProps) => {
  const { handleScroll } = useScrollEndDetection();
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);
  const scheduleOptions = commonVariable[0]?.duration_type;
  const getTextForDurationType = (durationType: any) => {
    const matchingType = scheduleOptions.find((type) => type?.id === durationType);
    return matchingType ? matchingType?.value : '';
  };

  const getTextForDurationList = (durationType: any) => {
    const timeList = durationType?.dosage_time?.map((duration: any) =>
      convertTo12HourFormat(duration),
    );
    if (durationType?.duration_type === 'everyday') {
      const everydayValue =
        durationType?.duration?.duration_count + ' ' + durationType?.duration?.interval;
      const time = timeList ? timeList?.join(', ') : '-';
      return everydayValue ? everydayValue + ' | ' + time : '';
    } else if (durationType?.duration_type === 'specific_days') {
      const specificdayValue =
        ' | ' +
        durationType?.duration?.specific_days?.join(',') +
        ' | ' +
        durationType?.duration?.duration_count +
        ' ' +
        durationType?.duration?.interval;
      return specificdayValue ? specificdayValue + ' | ' + timeList?.join(', ') : '';
    } else if (durationType?.duration_type === 'interval_days') {
      const intervalDays =
        'Every ' +
        ' ' +
        durationType?.duration?.interval_days +
        ' days' +
        ' | ' +
        durationType?.duration?.duration_count +
        ' ' +
        durationType?.duration?.interval;
      return intervalDays ? intervalDays + ' | ' + timeList?.join(', ') : '';
    } else if (durationType?.duration_type === 'custom_date') {
      const customDate = durationType?.duration?.custom_date;
      return typeof customDate === 'string' ? customDate + ' | ' + timeList?.join(',') : '';
    } else {
      return 'Mon, Tue | 9:00 AM, 10:00 AM, 12:00 AM, 01:00 PM';
    }
  };

  const convertTo12HourFormat = (time: string): string => {
    // Check if the time is already in "12:00 AM/PM" format
    if (time) {
      if (time?.includes('AM') || time?.includes('PM')) {
        return time;
      }

      // Convert 24-hour format to 12-hour format
      const [hours, minutes] = time?.split(':');
      const hour = parseInt(hours, 10);
      const period = hour >= 12 ? 'PM' : 'AM';
      const adjustedHour = hour % 12 || 12; // 0 should be converted to 12
      return `${adjustedHour}:${minutes} ${period}`;
    }
    return '';
  };

  const MedicineList = ({ items, index }: any) => {
    const getBackgroundColor = (indexs: number): string => {
      return indexs % 2 !== 0 ? '#F0F0F0' : '#FFFFFF'; // Adjust colors as needed
    };
    const durationList = getTextForDurationList(items);
    const durationText = getTextForDurationType(items?.duration_type);
    return (
      <Box
        style={[styles.cardMediContainer, { backgroundColor: getBackgroundColor(index) }]}
        key={index?.toString()}
      >
        <Box marginVertical={10} marginHorizontal={20}>
          <Box flexDirection="row" justifyContent="space-between">
            <Text style={styles.medicineText}>
              {items?.product?.name} {items?.units}
            </Text>
            {item.access && (
              <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{ left: 50, right: 50, top: 10, bottom: 30 }}
                onPress={() => openBSheet({ items: items, access: item?.access })}
              >
                <Image source={assets.More} style={styles.mediImageStyle} />
              </TouchableOpacity>
            )}
          </Box>
          <Text style={styles.doseText}>
            {items?.dosage ? items.dosage.substring(0, 7) : ''} {'doose'}
          </Text>
          <Text style={styles.doseText}>
            {durationText} {durationList}
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      {Object.keys(item?.prescription_product).map((key) => (
        <>
          {item?.prescription_product?.[key]?.[0] ? (
            <>
              <Box
                key={key?.toString()}
                justifyContent="space-between"
                flexDirection="row"
                style={styles.sectionHeader}
              >
                <Text style={styles.sectionTitle}>{key}</Text>
                <Box flexDirection="row">
                  {item?.access && UsePermission(permissionList.mobilePrescriptionAdd) && (
                    <IconButton
                      size={commonStyles.filterIcon.height}
                      name="plus"
                      iconColor={COLORS.shade_grey}
                      hitSlop={{ left: 50, right: 50, top: 30, bottom: 15}}
                      onClick={() => {
                        handleNavigation(item?.prescription_product[key][0]);
                      }}
                    />
                  )}
                  {/* <TouchableOpacity
            activeOpacity={0.8}
            style={styles.marginStartStyle}
            onPress={() => {
              openDialog();
            }}
          >
            <Image source={assets.deleteRed} />
          </TouchableOpacity> */}
                </Box>
              </Box>

              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(_item, index) => index.toString()}
                data={item?.prescription_product[key]}
                onScroll={handleScroll}
                renderItem={({ item, index }) => (
                  <MedicineList
                    items={item}
                    key={item?.id.toString()}
                    index={index}
                    access={item?.access}
                  />
                )}
              />
            </>
          ) : null}
        </>
      ))}
    </Box>
  );
};

export default MedicineCard;
