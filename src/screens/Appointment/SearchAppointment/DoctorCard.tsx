import { Image, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Box } from '../../../components';
import { assets, COLORS } from '../../../constants';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../../styles/Appointment.styles';
import { RootState } from '@/state';
import { useSelector } from 'react-redux';

const DoctorCard = ({
  item,
  navigationFrom,
  navigation,
}: {
  item: any;
  navigation: any;
  navigationFrom: string;
}) => {
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);

  const filteredData = (fees: string) => {
    try {
      const jsonData = JSON.parse(`[${item?.doctor_charge}]`);
      return Array.isArray(jsonData)
        ? jsonData.filter((data: any) => data?.group_name === fees)
        : [];
    } catch (error: any) {
      console.error('Error parsing JSON data:', error?.message);
      return [];
    }
  };

  return (
    <Box>
      <TouchableOpacity activeOpacity={0.8}>
        <Box style={styles.DoctorCardContainer}>
          <View style={styles.circleImageContainer}>
            <Image source={assets.Profile} style={styles.circularImage} />
          </View>
          <Box style={styles.DoctordetailsContainer}>
            <Box style={styles.docDetails2}>
              <Box style={styles.nameContainer}>
                <Box display="flex" flexDirection="row">
                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
                    {item?.name}{' '}
                  </Text>
                  {item?.name && <Image style={styles.tickIcon} source={assets.TickLightGreen} />}
                </Box>
                <Text style={styles.category1}>
                  {item.doctor?.department ? item.doctor?.department : 'Cardio Specialist - KMCH'}
                </Text>
              </Box>
            </Box>
            <Box style={styles.venueDetails}>
              <Box style={styles.nameContainer}>
                <Text style={styles.time}>15 Yrs Experience</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box style={styles.divider} marginTop={10} marginHorizontal={20} />
        <Text style={styles.hospitalDetails}>
          BMCH Hospital • EVN Road, Near Arena Layout, Chennai.
        </Text>
        <Box style={styles.divider} marginTop={10} marginHorizontal={20} />
        <Box style={styles.DoctorCardContainer}>
          <Box >
            <Text style={styles.nextAvailableText}>NEXT AVAILABLE AT</Text>
            <Box>
              <Text style={styles.drtimeText}>
                <Image source={assets.HousePlus} /> 04:00 PM, Tomorrow
              </Text>
            </Box>
          </Box>
          <Box>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('BookAppointment', {
                  item,
                  navigationFrom,
                  type: filteredData(commonVariable[0]?.teleconsultation_fee),
                });
              }}
            >
              <Box style={[styles.btn, { backgroundColor: COLORS.shade_greenish_blue }]}>
                <Text style={styles.btnText}>Book Tele Consult</Text>
              </Box>
            </TouchableOpacity>
          </Box>
          <Box>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('BookAppointment', {
                  item,
                  navigationFrom,
                  type: filteredData(commonVariable[0]?.consultation_fee),
                });
              }}
            >
              <Box style={styles.btn}>
                <Text style={styles.btnText}>Book Clinic Visit</Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
        <Box style={styles.divider} marginTop={5} />
      </TouchableOpacity>
    </Box>
  );
};

export default DoctorCard;
