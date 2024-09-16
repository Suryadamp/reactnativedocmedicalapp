import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Text } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { COLORS, assets } from '../../constants';
import { AppContainer, Box, CustomHeader } from '../../components';
import moment from 'moment';
import styles from '../../styles/BillAndPayments.styles';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const TransactionSuccess = ({ navigation, route }: Props) => {
  const response = route?.params?.item;
  const header = route?.params?.header;
  const paymentItems = route?.params?.paymentItems;
  const formattedDate = moment(response?.date_created ?? new Date()).format('DD MMM YY, h:mm a');

  const TransactionDetails = ({ title, subtitle }: any) => {
    return (
      <Box>
        <Box marginHorizontal={15}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subTitleText}>{subtitle ? subtitle : '-'}</Text>
        </Box>
        <Box style={styles.divider} />
      </Box>
    );
  };

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        <CustomHeader
          leftIcon={'arrow-left'}
          hasDivider
          title={`Transaction ${header}`}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
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
            <Text style={commonStyles.topTitleText}> {`Transaction ${header}`}</Text>
            <Box />
          </Box>
        </Box>
        <Box marginTop={10} /> */}

        <Box height={'70%'}>
          <Box backgroundColor="#059650">
            <Box style={styles.transHospitalBox}>
              <Text style={styles.moneyText}>Money sent to</Text>
              <Text style={styles.hospitalNameText}>{`₹ ${paymentItems?.amount} `}</Text>
            </Box>
            <Box display="flex" flexDirection="row" margin={15} justifyContent="space-between">
              <Text style={styles.hospitalNameText}>KMCH Multispecialty Hospital</Text>
              <Text style={styles.moneyText}>{formattedDate}</Text>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            marginHorizontal={8}
            marginVertical={25}
            justifyContent="space-between"
          >
            <Box width={'15%'} display="flex">
              <Image source={assets.TickCircleDGreen} style={styles.successIcon} />
              <Text style={styles.paymentStatusText}>Payment Started</Text>
            </Box>

            <Box width={'25%'}>
              <Image source={assets.SuccessArrow} style={styles.SuccessArrowIcon} />
            </Box>
            <Box width={'20%'}>
              <Image source={assets.TickCircleDGreen} style={styles.successIcon} />
              <Text style={styles.paymentStatusText}>Payment Processing</Text>
            </Box>
            <Box width={'25%'}>
              <Image
                source={assets.SuccessArrow}
                style={[
                  styles.SuccessArrowIcon,
                  { tintColor: header !== 'Success' ? COLORS.danger : '' },
                ]}
              />
            </Box>

            <Box width={'15%'}>
              <Image
                source={header === 'Success' ? assets.TickCircleDGreen : assets.CircleError}
                style={styles.successIcon}
              />
              <Text style={styles.paymentStatusText}>
                {header === 'Success' ? 'Payment Successful' : 'Payment Failed'}
              </Text>
            </Box>
          </Box>
          <TransactionDetails title="Credited to" subtitle="KMCH Multispecialty Hospital" />
          <TransactionDetails title="Debited from" subtitle="ICICI Bank Ltd - XXXXXXX8524" />
          <TransactionDetails
            title="Amount"
            subtitle={response?.cash_received ? `₹ ${response?.cash_received}` : '-'}
          />
          <TransactionDetails title="Transaction ID" subtitle={response?.urn_number} />
          <TransactionDetails title="Reference ID" subtitle={response?.ref_no} />
          <TransactionDetails title="Remarks" subtitle={paymentItems?.description} />
        </Box>
      </AppContainer>
    </>
  );
};

export default TransactionSuccess;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   header: {
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 7,
//   },
//   topBarTitle: {
//     ...FONTS.h5,
//     justifyContent: 'center',
//     fontWeight: '700',
//   },
//   icon: {
//     height: 15,
//     width: 20,
//     justifyContent: 'center',
//   },
//   successIcon: {
//     height: 30,
//     width: 30,
//     alignSelf: 'center',
//   },
//   SuccessArrowIcon: {
//     height: 18,
//     width: 68,
//     alignSelf: 'center',
//   },
//   divider: {
//     borderBottomWidth: 1,
//     borderColor: COLORS.grey_E5E5E5,
//   },
//   moneyText: {
//     color: COLORS.background.white,
//     fontSize: 12,
//     fontFamily: FONTS.SFProDisplayRegular,
//   },
//   hospitalNameText: {
//     color: COLORS.background.white,
//     fontSize: 14,
//     fontFamily: FONTS.SFProDisplayBold,
//   },
//   paymentStatusText: { textAlign: 'center', fontSize: 11, fontFamily: FONTS.SFProDisplayMedium },
//   titleText: {
//     marginVertical: 10,
//     fontSize: 12,
//     fontFamily: FONTS.SFProDisplayRegular,
//     color: COLORS.black,
//   },
//   subTitleText: {
//     marginBottom: 15,
//     fontSize: 12,
//     fontFamily: FONTS.SFProDisplayMedium,
//     color: COLORS.black,
//   },
// });
