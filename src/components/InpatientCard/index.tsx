// InpatientCard
import * as React from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Box from '../Box';

import { COLORS, assets, FONTS, strings } from '../../constants';
import { SvgIcon } from '../../constants/SvgIcon';
import IconButton from '../IconButton';

const InpatientCard = ({
  ipAdmission,
  onVitals,
  onPrescription,
  onInvestigation,
  onInvoice,
  // onDischargeSummary,
  onMenu,
}: any) => {
  return (
    <Card style={styles.cardContainer} mode="contained">
      <LinearGradient
        colors={['rgba(210, 229, 255, 0.50)', 'rgba(235, 243, 255, 0.00)']}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.container}
      >
        <ImageBackground
          source={assets.OpBookedBg}
          style={styles.backgroundImage}
          imageStyle={styles.bgImage}
        >
          <Card.Content style={styles.cardContent}>
            <Box style={styles.leftContainer}>
              <SvgIcon name={'IpBookedIcon'} />
            </Box>
            <Box style={styles.middleContainer}>
              <Text style={styles.title}>{ipAdmission.name}</Text>
              <Text
                style={styles.info}
              >{`${strings.displayText.admissionFor} ${ipAdmission.ip_type || 'Test'}`}</Text>
              <Text style={styles.description}>{ipAdmission.doctor_name}</Text>
              <Box style={styles.iconsContainer}>
                <TouchableOpacity
                  style={styles.iconItem}
                  hitSlop={{ left: 20, right: 20, top: 15, bottom: 15 }}
                  onPress={() => onVitals(ipAdmission)}
                >
                  <SvgIcon
                    name={ipAdmission.vitals_count > 0 ? 'ActiveVitalIcon' : 'ActiveVitalIcon'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconItem}
                  hitSlop={{ left: 20, right: 20, top: 15, bottom: 15 }}
                  onPress={() => onPrescription(ipAdmission)}
                >
                  <SvgIcon
                    name={
                      ipAdmission.prescription_count > 0
                        ? 'ActivePrescriptionIcon'
                        : 'ActivePrescriptionIcon'
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconItem}
                  hitSlop={{ left: 20, right: 20, top: 15, bottom: 15 }}
                  onPress={() => onInvestigation(ipAdmission)}
                >
                  <SvgIcon
                    name={
                      ipAdmission.investigations_count > 0
                        ? 'ActiveInvestigationIcon'
                        : 'ActiveInvestigationIcon'
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconItem}
                  hitSlop={{ left: 20, right: 20, top: 15, bottom: 15 }}
                  onPress={() => onInvoice(ipAdmission)}
                >
                  <SvgIcon
                    name={
                      ipAdmission.salesbills_count > 0 || ipAdmission.patient_bills_count > 0
                        ? 'ActiveInvoiceIcon'
                        : 'ActiveInvoiceIcon'
                    }
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.iconItem} onPress={onDischargeSummary}>
                  <SvgIcon
                    name={
                      ipAdmission.discharge_summary_count > 0
                        ? 'ActiveDischargeIcon'
                        : 'ActiveDischargeIcon'
                    }
                  />
                </TouchableOpacity> */}
              </Box>
            </Box>
            <Box style={styles.rightContainer}>
              {/* <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{ left: 50, right: 50, top: 15, bottom: 50 }}
                style={styles.iconItem}
                onPress={() => onMenu(ipAdmission)}
              >
                <SvgIcon name="MenuIcon" />
              </TouchableOpacity> */}
              <IconButton
                name="dots-vertical"
                size={hp('2.2%')}
                onClick={() => onMenu(ipAdmission)}
              />
            </Box>
          </Card.Content>
        </ImageBackground>
      </LinearGradient>
    </Card>
  );
};

export default InpatientCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.background.white,
    marginVertical: '2%',
    marginHorizontal: '5%',
    height: hp('16%'),
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: COLORS.white_smoke,
    width: wp('90%'),
    justifyContent: 'center',
  },
  container: {
    borderRadius: 7,
    height: '100%',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
  },
  bgImage: {
    resizeMode: 'contain',
    marginLeft: '35%',
  },
  leftContainer: {
    width: '10%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    marginHorizontal: '6%',
    marginVertical: '6%',
    width: '75%',
  },
  iconsContainer: {
    marginTop: '7%',
    flexDirection: 'row',
    width: '100%',
  },
  iconItem: {
    marginRight: '10%',
  },
  title: {
    fontFamily: FONTS.SFProDisplayBold,
    fontWeight: '700',
    fontSize: 14,
  },
  info: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontWeight: '500',
    fontSize: 12,
    paddingTop: '2%',
    color: '#A5A5A5',
  },
  description: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontWeight: '500',
    fontSize: 11,
    paddingTop: '2%',
    color: '#232323',
  },
  rightContainer: {
    // width: '50%',
    height: '100%',
    display: 'flex',
    paddingVertical: '5%',
  },
});
