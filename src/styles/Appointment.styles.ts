// import { Platform, StyleSheet } from 'react-native';
// import { SIZES, COLORS, FONTS } from '../constants';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// export default StyleSheet.create({
//   // BookAppointment styles
//   scrollViewContainer: { flexGrow: 1 },
//   BookAptcontainer: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     backgroundColor: COLORS.background.white,
//   },
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//   },
//   //   titleContainer: {
//   //     flexDirection: 'row',
//   //     alignItems: 'center',
//   //     justifyContent: 'space-between',
//   //     marginLeft: 20,
//   //     ...FONTS.h4,
//   //   },
//   title: {
//     ...FONTS.h4,
//     fontFamily: FONTS.PoppinsBold,
//     fontSize: SIZES.large,
//     fontWeight: '600',
//     color: COLORS.black,
//   },
//   options: {
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   optionsIcons: {
//     marginVertical: 5,
//     marginRight: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardContainer: {
//     padding: 20,
//     paddingVertical: 6,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignContent: 'center',
//     borderColor: COLORS.gray,
//     borderBottomWidth: 2,
//     borderTopWidth: 2,
//   },
//   doctorImage: {
//     width: 68,
//     height: 68,
//   },
//   imageContainer: {
//     borderRadius: 50,
//     overflow: 'hidden',
//   },
//   detailsContainer: {
//     flex: 1,
//     borderColor: COLORS.gray,
//     paddingLeft: 10,
//     paddingBottom: 20,
//     justifyContent: 'center',
//     alignContent: 'center',
//   },
//   dateContainer: {
//     marginVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
//   selectedDate: {
//     padding: 5,
//     backgroundColor: COLORS.background.primary,
//     borderRadius: 4,
//   },
//   docDetails: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   addPatient: {
//     fontFamily: FONTS.PoppinsBold,
//     fontSize: SIZES.small,
//     fontWeight: '600',
//     color: COLORS.background.primary,
//   },
//   slotsContainer: {
//     flexDirection: 'row',
//     marginVertical: 15,
//     flexWrap: 'wrap',
//     marginHorizontal: 20,
//   },
//   slotTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   slotName: {
//     fontFamily: FONTS.SFProDisplayMedium,
//     fontSize: SIZES.small,
//     color: COLORS.black,
//     marginHorizontal: SIZES.screenWidth / 40,
//     marginEnd: SIZES.screenWidth / 12,
//   },
//   selectedSlotName: {
//     fontFamily: FONTS.SFProDisplayMedium,
//     fontSize: SIZES.small,
//     color: COLORS.background.primary,
//     marginHorizontal: SIZES.screenWidth / 40,
//     marginEnd: SIZES.screenWidth / 12,
//   },
//   AvailableSlotsText: {
//     fontFamily: FONTS.Poppins,
//     fontSize: SIZES.small,
//     fontWeight: '600',
//     color: COLORS.green,
//     marginTop: 5,
//   },
//   slotBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 28,
//     width: 66,
//     padding: 2,
//     marginHorizontal: 4,
//     borderRadius: 5,
//     borderWidth: 1,
//     marginVertical: 7,
//     paddingHorizontal: 2,
//     borderColor: COLORS.lightGray,
//   },
//   selectedBookedSlotBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 28,
//     width: 66,
//     padding: 2,
//     marginHorizontal: 4,
//     borderRadius: 5,
//     marginVertical: 7,
//     paddingHorizontal: 2,
//     backgroundColor: COLORS.green,
//   },
//   selectedSlotBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 28,
//     width: 66,
//     padding: 2,
//     marginHorizontal: 4,
//     borderRadius: 5,
//     marginVertical: 7,
//     paddingHorizontal: 2,
//     backgroundColor: COLORS.background.primary,
//   },
//   slotBoxText: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: SIZES.extraSmall,
//     color: COLORS.placeHolder,
//     padding: 1,
//   },
//   selectedSlotText: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: SIZES.extraSmall,
//     color: COLORS.background.white,
//     padding: 1,
//   },
//   unCheckIcon: {
//     width: 10,
//     height: 10,
//   },
//   dayText: {
//     fontFamily: FONTS.Poppins,
//     fontSize: SIZES.small,
//     fontWeight: '700',
//     textAlign: 'center',
//     padding: 2,
//     color: COLORS.black,
//   },
//   dateText: {
//     fontFamily: FONTS.Poppins,
//     fontWeight: '700',
//     textAlign: 'center',
//     padding: 2,
//     color: COLORS.black,
//     fontSize: SIZES.large,
//   },
//   category: {
//     fontFamily: FONTS.Poppins,
//     fontSize: SIZES.small,
//     fontWeight: '400',
//     color: COLORS.lightGrey,
//   },
//   slotIcon: {
//     width: 12,
//     height: 12,
//   },
//   aboutContainer: {
//     marginTop: 20,
//     marginHorizontal: 20,
//   },
//   pateintDetailsContainer: {
//     margin: 25,
//     marginHorizontal: 20,
//   },
//   pateintContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   monthText: {
//     fontFamily: FONTS.Poppins,
//     fontSize: SIZES.medium,
//     fontWeight: '400',
//     color: COLORS.text,
//     lineHeight: SIZES.large,
//     textAlign: 'center',
//     margin: 10,
//   },
//   btnContainer: {
//     position: 'absolute',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     alignSelf: 'center',
//     bottom: Platform.OS === 'ios' ? SIZES.screenHeight / 23 : SIZES.screenHeight / 50,
//   },
//   bookSlotBtn: {
//     width: '100%',
//     height: 50,
//     borderRadius: 10,
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.background.primary,
//   },
//   bookSlotBtnText: {
//     fontFamily: FONTS.Poppins,
//     fontSize: SIZES.medium,
//     fontWeight: '700',
//     color: COLORS.background.white,
//     textAlign: 'center',
//   },
//   timeContainer: {
//     position: 'absolute',
//     backgroundColor: COLORS.lightBlue,
//     borderRadius: 4,
//     marginTop: 5,
//   },
//   timeText: {
//     fontFamily: FONTS.Poppins,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontSize: 9,
//     letterSpacing: -0.24,
//     paddingTop: 3,
//     paddingBottom: 3,
//     paddingStart: 5,
//     paddingEnd: 5,
//     color: COLORS.background.primary,
//   },
//   dropdown: {
//     height: 56,
//     borderColor: COLORS.lightGray,
//     borderWidth: 1,
//     borderRadius: 6,
//     paddingHorizontal: 8,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   consultationForLabel: {
//     position: 'absolute',
//     backgroundColor: COLORS.background.white,
//     left: 10,
//     top: -5,
//     paddingHorizontal: 1,
//     zIndex: 999,
//     paddingStart: 5,
//     paddingEnd: 5,
//     fontSize: 12,
//     color: COLORS.text,
//   },
//   patinetNameLabel: {
//     position: 'absolute',
//     backgroundColor: COLORS.background.white,
//     left: 10,
//     top: -8,
//     paddingHorizontal: 1,
//     zIndex: 999,
//     paddingStart: 5,
//     paddingEnd: 5,
//     fontSize: 12,
//     color: COLORS.text,
//   },
//   dateInputTxt: {
//     backgroundColor: COLORS.background.white,
//     width: SIZES.screenWidth - 36,
//     height: 56,
//     marginVertical: 5,
//     marginTop: 15,
//   },
//   dateInputIcon: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     paddingTop: 4,
//   },
//   calendar: { marginTop: -5, marginHorizontal: 20 },
//   CalendarStripHeaderStyle: {
//     color: COLORS.background.primary,
//     position: 'absolute',
//     marginTop: -25,
//   },
//   calenderDateNumberStyle: { color: COLORS.background.primary, fontSize: 16, marginRight: 5 },
//   calenderHighlightDateNumberStyle: {
//     color: COLORS.background.white,
//     fontSize: 16,
//     marginRight: 5,
//   },
//   calenderHighlightDateContainerStyle: {
//     borderRadius: 4,
//     backgroundColor: COLORS.background.primary,
//     height: 60,
//     width: 40,
//   },
//   inputTxtStyle: {
//     width: SIZES.screenWidth * 0.9,
//     height: 45,
//     backgroundColor: COLORS.white,
//   },
//   backgroundStyle: {
//     backgroundColor: COLORS.white,
//     borderColor: COLORS.gray,
//     borderWidth: 2,
//   },
//   subtitle: {
//     color: COLORS.black,
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 11,
//     textAlign: 'center',
//   },
//   contentContainerStyle: { paddingBottom: 20, width: '100%' },
//   boxContainerStyle: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     paddingHorizontal: 20,
//     borderColor: '#f1f1f1',
//   },
//   appointmentPrice: {
//     fontFamily: FONTS.SFProDisplayBold,
//     fontSize: 16,
//     color: COLORS.black,
//   },
//   viewBill: {
//     fontSize: 12,
//     fontFamily: FONTS.SFProDisplayMedium,
//     color: COLORS.background.primary,
//   },
//   noSlots: {
//     color: COLORS.danger,
//     paddingBottom: 20,
//   },

//   // PaymentSummaryBottomSheet styles
//   appointTimeText: {
//     fontSize: 12,
//     fontFamily: FONTS.SFProDisplayBold,
//     color: COLORS.background.primary,
//     marginVertical: 5,
//   },
//   resText: {
//     fontSize: 10,
//     fontFamily: FONTS.SFProDisplayRegular,
//     color: '#2E2E2E',
//     marginVertical: 2,
//   },
//   hosptailNameText: {
//     fontSize: 10,
//     fontFamily: FONTS.SFProDisplayRegular,
//     color: '#2E2E2E',
//     marginVertical: 2,
//   },
//   locationText: {
//     fontSize: 10,
//     fontFamily: FONTS.SFProDisplaySemibold,
//     color: '#2E2E2E',
//     marginVertical: 2,
//   },
//   payBtn: {
//     backgroundColor: COLORS.background.primary,
//     borderRadius: SIZES.padding * 0.8,
//     height: 50,
//   },
//   payBtnText: {
//     fontFamily: FONTS.Inter,
//     fontSize: 15,
//     color: COLORS.background.white,
//   },
//   bottomFlexBox: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     width: '100%',
//   },
//   appointFeeText: {
//     fontSize: 12,
//     fontFamily: FONTS.SFProDisplayRegular,
//     color: COLORS.black,
//   },
//   appointFee: {
//     fontSize: 12,
//     fontFamily: FONTS.SFProDisplaySemibold,
//     color: COLORS.black,
//   },
//   termsText: {
//     fontSize: 10,
//     fontFamily: FONTS.SFProDisplaySemibold,
//     color: COLORS.background.primary,
//   },
//   agreeText: {
//     fontSize: 10,
//     fontFamily: FONTS.SFProDisplayRegular,
//     color: '#969696',
//   },

//   // SuccessCard styles
//   icon: {
//     height: 15,
//     width: 15,
//   },
//   //   title: {
//   //     fontFamily: FONTS.SFProDisplayBold,
//   //     fontSize: SIZES.semiLarge,
//   //     fontWeight: '600',
//   //     color: COLORS.black,
//   //   },
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginLeft: 20,
//     fontFamily: FONTS.SFProDisplay_w700,
//     fontSize: 18,
//   },
//   info: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: SIZES.small,
//     fontWeight: '400',
//     color: COLORS.black,
//     textAlign: 'center',
//   },
//   subHeading: {
//     fontFamily: FONTS.SFProDisplayBold,
//     fontSize: SIZES.font,
//     fontWeight: '700',
//     color: COLORS.black,
//     marginTop: 10,
//   },
//   paymentItem: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: SIZES.small,
//     color: COLORS.black_121212,
//     marginTop: 15,
//     fontWeight: '400',
//   },
//   textStrikeOut: {
//     fontFamily: FONTS.Poppins,
//     fontSize: SIZES.small,
//     color: COLORS.grey_969696,
//     marginTop: 15,
//     marginEnd: 5,
//     fontWeight: '400',
//     textDecorationLine: 'line-through',
//   },
//   textFree: {
//     fontFamily: FONTS.Poppins,
//     fontSize: SIZES.small,
//     color: COLORS.background.primary,
//     marginTop: 15,
//     fontWeight: '400',
//   },
//   txtDesc: {
//     fontFamily: FONTS.Poppins,
//     fontSize: 9,
//     color: COLORS.background.primary,
//     fontWeight: '400',
//   },
//   txtTerms: {
//     fontFamily: FONTS.Poppins,
//     fontSize: 10,
//     color: COLORS.background.primary,
//     fontWeight: '400',
//   },
//   txtByClicking: {
//     fontFamily: FONTS.Poppins,
//     fontSize: 10,
//     color: COLORS.grey_969696,
//     fontWeight: '400',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   paymentPrice: {
//     fontFamily: FONTS.SFProDisplayBold,
//     fontSize: SIZES.small,
//     color: COLORS.text,
//     marginTop: 10,
//     fontWeight: '600',
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center',
//   },
//   totalPrice: {
//     fontFamily: FONTS.SFProDisplayBold,
//     fontSize: SIZES.medium,
//     color: COLORS.text,
//     marginTop: 25,
//     fontWeight: '700',
//     marginHorizontal: 20,
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center',
//   },
//   highlighted: {
//     fontFamily: FONTS.SFProDisplayBold,
//     color: COLORS.black,
//     fontWeight: '700',
//   },
//   divider1: {
//     width: '100%',
//     borderBottomWidth: 1,
//     borderColor: COLORS.lightGray,
//     marginTop: 15,
//   },

//   // DoctorCard Styles
//   DoctorCardContainer: {
//     marginTop: 8,
//     marginBottom: 3,
//     marginHorizontal: 20,
//     display: 'flex',
//     flexDirection: 'row',
//     overflow: 'hidden',
//     fontSize: 10,
//     fontWeight: 500,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   nextAvailableText: {
//     display: 'flex',
//     flexDirection: 'row',
//     overflow: 'hidden',
//     fontSize: 10,
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontWeight: '500',
//     color: COLORS.background.primary,
//   },
//   DoctordetailsContainer: {
//     flex: 1,
//     alignSelf: 'center',
//     marginStart: 10,
//   },
//   docDetails2: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   nameContainer: {
//     paddingHorizontal: 5,
//     paddingTop: 2,
//   },
//   name: {
//     fontFamily: FONTS.SFProDisplay_w500,
//     fontSize: SIZES.medium,
//     color: COLORS.text,
//     textTransform: 'uppercase',
//     lineHeight: 16,
//     letterSpacing: -0.24,
//   },
//   category1: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: SIZES.small,
//     fontWeight: '400',
//     color: COLORS.black,
//   },
//   likeBackground: {
//     margin: 10,
//     width: 30,
//     height: 30,
//     backgroundColor: COLORS.gray,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 8,
//   },
//   venueDetails: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   time: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: SIZES.extraSmall,
//     fontWeight: '400',
//     color: COLORS.black,
//   },
//   hospitalDetails: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: SIZES.extraSmall,
//     fontWeight: '400',
//     color: COLORS.black,
//     marginHorizontal: 20,
//     marginTop: 10,
//   },
//   drtimeText: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: SIZES.extraSmall,
//     fontWeight: '400',
//     color: COLORS.dark_gray,
//     marginTop: 5,
//   },
//   seeMore: {
//     fontFamily: FONTS.Poppins,
//     fontSize: SIZES.base,
//     fontWeight: '400',
//     color: COLORS.background.primary,
//     textDecorationLine: 'underline',
//   },
//   btn: {
//     borderRadius: 5,
//     backgroundColor: COLORS.background.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 30,
//     width: 90,
//   },
//   btnText: {
//     fontFamily: FONTS.SFProDisplayBold,
//     fontSize: 9,
//     fontWeight: '500',
//     color: COLORS.background.secondary,
//     textAlign: 'center',
//   },
//   avatar1: {
//     borderColor: COLORS.background.primary,
//     borderWidth: 3,
//     borderTopLeftRadius: 15,
//     borderBottomLeftRadius: 15,
//   },
//   circleImageContainer: {
//     overflow: 'hidden',
//     borderRadius: 50,
//     width: 50,
//     height: 50,
//     alignSelf: 'center',
//   },
//   circularImage: {
//     width: '100%',
//     height: '100%',
//   },
//   tickIcon: {
//     width: 10,
//     height: 10,
//   },

//   // SearchAppointment styles
//   appointmentContainer: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   header1: {
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   topBarTitle1: {
//     ...FONTS.h4,
//     justifyContent: 'center',
//   },
//   icon1: {
//     height: 15,
//     width: 20,
//     justifyContent: 'center',
//   },
//   textDoctorsList: {
//     width: '90%',
//     textAlign: 'center',
//     color: COLORS.text,
//     fontFamily: FONTS.PoppinsBold,
//     alignItems: 'center',
//     textAlignVertical: 'center',
//     fontSize: 18,
//     fontStyle: 'normal',
//     fontWeight: '700',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   filterSelectCategory: {
//     minWidth: 80,
//     backgroundColor: COLORS.background.primary,
//     padding: 8,
//     borderRadius: 25,
//     borderColor: COLORS.background.primary,
//     margin: 5,
//   },
//   filterCategory: {
//     minWidth: 80,
//     backgroundColor: COLORS.background.secondary,
//     padding: 8,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.background.primary,
//     margin: 5,
//   },
//   filterSelectText: {
//     color: COLORS.white,
//     textAlign: 'center',
//     fontFamily: FONTS.Poppins,
//     fontSize: 14,
//     fontWeight: '100',
//   },
//   filterText: {
//     color: COLORS.background.primary,
//     textAlign: 'center',
//     ontFamily: FONTS.Poppins,
//     fontSize: 14,
//     fontWeight: '400',
//   },
//   addIcon: {
//     height: 25,
//     width: 25,
//   },
//   filterIcon: { marginTop: 8, alignItems: 'center' },
//   filterContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     alignContent: 'center',
//   },
//   section: {
//     ...FONTS.text,
//   },
//   sectionBorderStyle: {
//     borderBottomColor: COLORS.black,
//     borderBottomWidth: 3,
//     width: '30%',
//   },
//   searchDoctorInput: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignContent: 'center',
//   },
//   searchTextInput: {
//     color: '#343E42',
//     fontFamily: FONTS.SFProDisplayBold,
//     fontSize: 12,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     lineHeight: 15,
//     alignContent: 'center',
//     marginTop: 10,
//     marginHorizontal: 20,
//   },
//   searchForContainer: {
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     marginTop: 12,
//     marginStart: 15,
//   },
//   textSearchResultFor: {
//     color: COLORS.grey_525252,
//     fontFamily: FONTS.Inter,
//     fontSize: 10,
//     fontStyle: 'normal',
//   },
//   textSearchResult: {
//     color: COLORS.background.primary,
//     fontFamily: FONTS.InterBold,
//     fontSize: 10,
//     fontStyle: 'normal',
//   },
//   doctorsList: {
//     paddingBottom: 150,
//     marginTop: 10,
//   },

//   // CancelAppointment styles
//   header: {
//     backgroundColor: COLORS.white,
//   },
//   textBold: { fontFamily: FONTS.SFProDisplayBold, fontSize: 12, lineHeight: 22 },

//   // CancelRadioButton Styles
//   mainContainer: { borderWidth: 1, borderRadius: 4, borderColor: '#EFEFEF', marginTop: 20 },
//   cancelRadioButtoncontainer: { borderBottomWidth: 1, borderBottomColor: '#EFEFEF' },
//   touchStyle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 20,
//   },
//   selectOptionContainerStyle: {
//     height: 22,
//     width: 22,
//     borderRadius: 12,
//     borderWidth: 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 5,
//   },
//   selectOptionStyle: {
//     height: 12,
//     width: 12,
//     borderRadius: 6,
//     backgroundColor: COLORS.background.primary,
//   },
//   optionTextStyle: {
//     marginLeft: 10,
//     color: COLORS.text,
//     fontSize: 12,
//     fontFamily: FONTS.SFProDisplayRegular,
//   },
//   resultTextStyle: { marginLeft: 35, color: COLORS.background.primary, fontSize: 12 },

//   // CancelAppointment styles
//   topBarTitle: {
//     ...FONTS.pageHeaderTitleText,
//   },
//   helpText: { fontSize: 14, fontFamily: FONTS.SFProDisplaySemibold, color: COLORS.black },
//   appointmentId: { height: 10.5, width: 13.5, alignSelf: 'center', marginRight: 5 },
//   appointmentDetailsText: {
//     fontFamily: FONTS.SFProDisplaySemibold,
//     fontSize: 14,
//     color: COLORS.black,
//   },
//   antIcon: { alignSelf: 'center', marginRight: 5 },
//   labelText: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 12,
//     color: '#8A8A8A',
//     marginBottom: 5,
//   },
//   image: { width: 12, height: 12, alignSelf: 'center', marginRight: 5 },
//   valueText: { fontFamily: FONTS.SFProDisplayRegular, fontSize: 12, color: COLORS.black },
//   buttonBoxContainer: {
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     width: '100%',
//     top: Platform.OS === 'ios' ? SIZES.screenWidth / 0.53 : SIZES.screenHeight / 1.05,
//   },
//   addBtnStyle: {
//     backgroundColor: COLORS.background.primary,
//     borderRadius: 10,
//   },
//   applyTxtStyle: { color: COLORS.white, fontSize: 15, fontWeight: '500' },

//   // Appointment styles
//   cababMenu: {
//     paddingLeft: 15,
//     paddingRight: 8,
//     paddingVertical: 10,
//   },
//   AppointmentcardContainer: {
//     marginHorizontal: 10,
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   seperator: {
//     marginRight: 8,
//     height: 174,
//     width: 14,
//   },
//   card: {
//     flex: 1,
//     marginRight: 5,
//     borderWidth: 1,
//     borderRadius: 10,
//     marginBottom: 20,
//     overflow: 'hidden',
//   },
//   upcomingCard: {
//     borderColor: '#EFEFEF',
//   },
//   pastCard: {
//     borderColor: '#F3F3F3',
//   },
//   upcomingHeader: {
//     backgroundColor: COLORS.blue_F3F8FF,
//   },
//   upcomingFailedHeader: {
//     backgroundColor: '#FFF1F3',
//   },
//   pastHeader: {
//     backgroundColor: COLORS.grey_E5E5E5,
//   },
//   upcomingHeaderTitle: {
//     color: COLORS.background.primary,
//   },
//   upcomingFailedHeaderTitle: {
//     color: '#FA4D5E',
//   },
//   pastHeaderTitle: {
//     color: COLORS.greyText,
//   },
//   cardHeader: {
//     padding: 8,
//     paddingHorizontal: 12,
//     height: 34,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerTitle: {
//     fontFamily: FONTS.PoppinsMedium,
//     fontSize: SIZES.small,
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontStyle: 'normal',
//   },
//   cardContent: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//   },
//   dateStyle: {
//     marginTop: 9,
//     fontFamily: FONTS.Poppins,
//     fontSize: SIZES.extraSmall,
//     color: COLORS.darkBlue,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     marginBottom: 8,
//   },
//   categoryStyle: {
//     fontFamily: FONTS.Poppins,
//     fontSize: SIZES.small,
//     fontWeight: '500',
//     color: COLORS.darkBlue,
//   },
//   doctorStyle: {
//     fontFamily: FONTS.PoppinsMedium,
//     fontSize: SIZES.small,
//     color: COLORS.darkBlue,
//     fontStyle: 'normal',
//     fontWeight: '700',
//     marginBottom: 8,
//   },
//   hospitalStyle: {
//     fontFamily: FONTS.Poppins,
//     fontSize: SIZES.base,
//     fontWeight: '300',
//     color: COLORS.darkBlue,
//   },
//   doctorIcon: {
//     width: 60,
//     height: 60,
//     marginRight: 10,
//   },
//   cardFooter: {
//     flex: 1,
//     justifyContent: 'center',
//     height: 32,
//   },
//   footerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//   },
//   userIcon: {
//     width: 12,
//     height: 16,
//     justifyContent: 'center',
//   },
//   icon2: {
//     width: 12,
//     height: 12,
//     justifyContent: 'center',
//   },
//   lapIcon: {
//     width: 12,
//     height: 17,
//     justifyContent: 'center',
//   },
//   avatar: {
//     height: 54,
//     width: 54,
//     borderRadius: 40,
//     marginBottom: 15,
//   },
//   patientContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   patientStyle: {
//     fontFamily: FONTS.PoppinsMedium,
//     fontSize: SIZES.small,
//     color: COLORS.darkBlue,
//     justifyContent: 'center',
//     marginStart: 5,
//     textAlign: 'center',
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     lineHeight: 18,
//   },
//   tickImage: {
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center',
//     marginLeft: 5,
//     alignSelf: 'center',
//   },
//   txtPaynow: {
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     backgroundColor: COLORS.background.primary,
//     fontFamily: FONTS.SFProDisplayMedium,
//     color: COLORS.background.white,
//     width: 60,
//     height: 28,
//     fontSize: 11,
//     borderRadius: 4,
//   },

//   // ViewAppointment styles
//   txtComingSoon: {
//     fontSize: 8,
//     marginStart: 15,
//     paddingVertical: 3,
//     paddingHorizontal: 5,
//     borderWidth: 1,
//     borderRadius: 6,
//     color: COLORS.green_00B347,
//     borderColor: COLORS.green_CFFED6,
//     backgroundColor: COLORS.green_CFFED6,
//   },
//   divider: {
//     borderBottomWidth: 1,
//     borderColor: COLORS.grey_E5E5E5,
//   },
//   bsItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingVertical: 21,
//   },
//   bsName: {
//     color: '#121212',
//     textAlign: 'center',
//     fontFamily: FONTS.PoppinsMedium,
//     fontSize: 13,
//     lineHeight: 21,
//     fontStyle: 'normal',
//     fontWeight: '500',
//     marginStart: 15,
//   },
//   bsLayout: {
//     padding: 20,
//     width: '100%',
//   },
//   scrollViewStyle: { flex: 1 },
//   icon3: {
//     height: 22,
//     width: 22,
//   },
//   sectionContainer: {
//     padding: 3,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     alignContent: 'center',
//     backgroundColor: COLORS.grey_F6F6F6,
//     marginHorizontal: 15,
//     borderRadius: 5,
//   },
//   selectedSection: {
//     backgroundColor: COLORS.white,
//     borderRadius: 5,
//     paddingVertical: 10,
//     textAlign: 'center',
//     fontSize: 12,
//     fontFamily: FONTS.Poppins,
//     color: COLORS.black,
//   },
//   unSelectedSection: {
//     backgroundColor: COLORS.grey_F6F6F6,
//     paddingVertical: 10,
//     textAlign: 'center',
//     fontSize: 12,
//     fontFamily: FONTS.Poppins,
//     color: COLORS.black_121212,
//   },
//   tabTextContainer: {
//     width: '50%',
//   },
//   noAppointment: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   //   appointmentContainer: {
//   //     flex: 1,
//   //     flexDirection: 'column',
//   //     alignItems: 'center',
//   //   },
//   // SupportBottomSheet styles
//   txtPaid: {
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     backgroundColor: '#17CF9D',
//     fontFamily: FONTS.SFProDisplayMedium,
//     color: COLORS.background.white,
//     width: 60,
//     height: 28,
//     fontSize: 11,
//     borderRadius: 4,
//   },
//   txtPaynowPast: {
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     backgroundColor: COLORS.grey_E5E5E5,
//     fontFamily: FONTS.SFProDisplayMedium,
//     color: COLORS.greyText,
//     width: 60,
//     height: 28,
//     fontSize: 11,
//     borderRadius: 4,
//   },
//   bsIcon: {
//     width: 15,
//     height: 17,
//     marginLeft: 10,
//   },
//   bsName: {
//     color: '#121212',
//     textAlign: 'center',
//     fontFamily: FONTS.PoppinsMedium,
//     fontSize: 13,
//     lineHeight: 21,
//     fontStyle: 'normal',
//     fontWeight: '500',
//     marginStart: 15,
//   },
// });

import { Platform, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet, isWpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  // BookAppointment styles
  scrollViewContainer: { flexGrow: 1 },
  BookAptcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.white,
  },
  BookAptCancelcontainer: {
    flex: 1,
    backgroundColor: COLORS.background.white,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isHpTablet('1.5%'), // Assuming 15px = 3.8% for a 400px screen width
  },
  title: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('2.4%'), // Assuming SIZES.large is equivalent to 5% of screen width
    lineHeight: isHpTablet('2.8%'),
    fontWeight: '600',
    color: COLORS.black,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
  },
  optionsIcons: {
    marginVertical: hp('0.5%'), // Assuming 5px = 0.5% for an 800px screen height
    marginRight: wp('1.3%'), // Assuming 5px = 1.3% for a 400px screen width
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    padding: isHpTablet('2%'),
    paddingVertical: hp('0.6%'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: COLORS.white_smoke,
    borderBottomWidth: 1,
    // borderTopWidth: 2,
  },
  doctorImage: {
    width: isHpTablet('8%'), // Assuming 68px = 17% for a 400px screen width
    height: isHpTablet('8%'), // Assuming 68px = 8.5% for an 800px screen height
  },
  imageContainer: {
    borderRadius: isHpTablet('8%'),
    overflow: 'hidden',
  },
  detailsContainer: {
    flex: 1,
    borderColor: COLORS.gray,
    marginTop: hp('0.2%'), // Assuming 10px = 2.5% for a 400px screen width
    paddingLeft: wp('2.5%'), // Assuming 10px = 2.5% for a 400px screen width
    paddingBottom: isHpTablet('2.2%'), // Assuming 20px = 2.5% for an 800px screen height
    justifyContent: 'center',
    alignContent: 'center',
  },
  dateContainer: {
    marginVertical: hp('1.25%'), // Assuming 10px = 1.25% for an 800px screen height
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  selectedDate: {
    padding: wp('1.25%'), // Assuming 5px = 1.25% for a 400px screen width
    backgroundColor: COLORS.background.primary,
    borderRadius: 4,
  },
  accountBoxIconStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  accountIconStyle: {
    // marginTop: hp('0.5%'),
    marginHorizontal: hp('0.4%'),
    alignSelf: 'center',
  },
  patientIcon: {
    height: isHpTablet('2%'),
  },
  accNameStyle: {
    // marginTop: isHpTablet('1%'),
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.Inter,
    color: COLORS.black,
  },
  docDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1.25%'), // Assuming 10px = 1.25% for an 800px screen height
    marginBottom: hp('2.5%'), // Assuming 20px = 2.5% for an 800px screen height
  },
  addPatient: {
    fontFamily: FONTS.PoppinsBold,
    fontSize: wp('3%'), // Assuming SIZES.small is equivalent to 3% of screen width
    lineHeight: wp('3%'),
    fontWeight: '600',
    color: COLORS.background.primary,
  },
  slotsContainer: {
    flexDirection: 'row',
    marginVertical: hp('1.875%'), // Assuming 15px = 1.875% for an 800px screen height
    flexWrap: 'wrap',
    marginHorizontal: wp('5%'), // Assuming 20px = 5% for a 400px screen width
  },

  slotTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slotName: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: isWpTablet('3%'), // Assuming SIZES.small is equivalent to 3% of screen width
    lineHeight: wp('3%'),
    color: COLORS.black,
    marginHorizontal: wp('5%'), // Assuming 20px = 5% for a 400px screen width
    marginEnd: wp('8%'), // Assuming 48px = 8% for a 400px screen width
  },
  selectedSlotName: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: isWpTablet('3%'),
    lineHeight: wp('3%'),
    color: COLORS.background.primary,
    marginHorizontal: wp('5%'),
    marginEnd: wp('8%'),
  },
  AvailableSlotsText: {
    fontFamily: FONTS.Poppins,
    fontSize: wp('3%'),
    lineHeight: wp('3%'),
    fontWeight: '600',
    color: COLORS.green,
    marginTop: hp('0.625%'), // Assuming 5px = 0.625% for an 800px screen height
  },
  slotBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: isHpTablet('3.5%'),
    width: isWpTablet('16.5%'),
    padding: wp('0.5%'), // Assuming 2px = 0.5% for a 400px screen width
    marginHorizontal: wp('1%'), // Assuming 4px = 1% for a 400px screen width
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: hp('0.875%'), // Assuming 7px = 0.875% for an 800px screen height
    paddingHorizontal: wp('0.5%'),
    borderColor: COLORS.lightGray,
  },
  selectedBookedSlotBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: isHpTablet('3.5%'),
    width: isWpTablet('16.5%'),
    padding: wp('0.5%'),
    marginHorizontal: wp('1%'),
    borderRadius: 5,
    marginVertical: hp('0.875%'),
    paddingHorizontal: wp('0.5%'),
    backgroundColor: COLORS.green,
  },
  selectedSlotBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: isHpTablet('3.5%'),
    width: isWpTablet('16.5%'),
    padding: wp('0.5%'),
    marginHorizontal: wp('1%'),
    borderRadius: 5,
    marginVertical: hp('0.875%'),
    paddingHorizontal: wp('0.5%'),
    backgroundColor: COLORS.background.primary,
  },
  slotBoxText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isWpTablet('2.5%'), // Assuming SIZES.extraSmall is equivalent to 2.5% of screen width
    lineHeight: isWpTablet('2.5%'),
    color: COLORS.placeHolder,
    padding: isWpTablet('0.4%'), // Assuming 1px = 0.25% for a 400px screen width
  },

  selectedSlotText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isWpTablet('2.5%'), // Assuming SIZES.extraSmall is equivalent to 2.5% of screen width
    lineHeight: isWpTablet('2.5%'),
    color: COLORS.background.white,
    padding: isWpTablet('0.4%'), // Adjusted
  },
  unCheckIcon: {
    width: isWpTablet('2.5%'), // Adjusted
    height: isHpTablet('1.25%'), // Adjusted
  },
  dayText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: wp('3%'), // Adjusted
    lineHeight: wp('3%'),
    fontWeight: '700',
    textAlign: 'center',
    padding: wp('0.5%'), // Adjusted
    color: COLORS.black,
  },
  dateText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontWeight: '700',
    textAlign: 'center',
    padding: wp('0.5%'), // Adjusted
    color: COLORS.black,
    fontSize: wp('4%'), // Adjusted
    lineHeight: wp('4%'),
  },
  category: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.4%'),
    fontWeight: '400',
    color: COLORS.lightGrey,
  },
  slotIcon: {
    width: wp('3%'), // Adjusted
    height: hp('1.5%'), // Adjusted
  },
  aboutContainer: {
    marginTop: hp('2.5%'), // Adjusted
    marginHorizontal: isWpTablet('5%'), // Adjusted
  },
  pateintDetailsContainer: {
    marginTop: isHpTablet('3.125%'), // Adjusted
    marginBottom: isHpTablet('1.5%'), // Adjusted
    marginHorizontal: isWpTablet('5%'), // Adjusted
  },
  pateintContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthText: {
    fontFamily: FONTS.Poppins,
    fontSize: wp('4%'), // Adjusted
    fontWeight: '400',
    color: COLORS.text,
    lineHeight: hp('7.5%'), // Adjusted
    textAlign: 'center',
    margin: wp('2.5%'), // Adjusted
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // alignSelf: 'center',
    // bottom: Platform.OS === 'ios' ? hp('4%') : hp('2%'), // Adjusted
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  bookSlotBtn: {
    width: '100%',
    height: isHpTablet('6.5%'), // Adjusted
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.primary,
  },
  bookSlotBtnText: {
    fontFamily: FONTS.Poppins,
    fontSize: isHpTablet('2%'), // Adjusted
    lineHeight: isHpTablet('2.2%'),
    fontWeight: '700',
    color: COLORS.background.white,
    textAlign: 'center',
  },
  timeContainer: {
    position: 'absolute',
    backgroundColor: COLORS.lightBlue,
    borderRadius: 4,
    marginTop: hp('0.625%'), // Adjusted
  },
  timeText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: isHpTablet('1.3%'), // Adjusted
    lineHeight: isHpTablet('1.8%'),
    letterSpacing: -0.24,
    paddingTop: hp('0.375%'), // Adjusted
    paddingBottom: hp('0.375%'), // Adjusted
    paddingStart: wp('1.25%'), // Adjusted
    paddingEnd: wp('1.25%'), // Adjusted
    color: COLORS.background.primary,
  },
  dropdown: {
    height: hp('7%'), // Adjusted
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: wp('2%'), // Adjusted
  },
  placeholderStyle: {
    fontSize: wp('4%'), // Adjusted
    lineHeight: wp('4%'),
  },
  selectedTextStyle: {
    fontSize: wp('4%'), // Adjusted
    lineHeight: wp('4%'),
  },
  iconStyle: {
    width: wp('5%'), // Adjusted
    // height: hp('2.5%'), // Adjusted
  },
  consultationForLabel: {
    position: 'absolute',
    backgroundColor: COLORS.background.white,
    left: wp('2.5%'), // Adjusted
    top: -hp('0.625%'), // Adjusted
    paddingHorizontal: wp('0.25%'), // Adjusted
    zIndex: 999,
    paddingStart: wp('1.25%'), // Adjusted
    paddingEnd: wp('1.25%'), // Adjusted
    fontSize: wp('3%'), // Adjusted
    lineHeight: wp('3%'),
    color: COLORS.text,
  },
  patinetNameLabel: {
    position: 'absolute',
    backgroundColor: COLORS.background.white,
    left: wp('2.5%'), // Adjusted
    top: -hp('1%'), // Adjusted
    paddingHorizontal: wp('0.25%'), // Adjusted
    zIndex: 999,
    paddingStart: wp('1.25%'), // Adjusted
    paddingEnd: wp('1.25%'), // Adjusted
    fontSize: wp('3%'), // Adjusted
    lineHeight: wp('3%'),
    color: COLORS.text,
  },
  dateInputTxt: {
    backgroundColor: COLORS.background.white,
    width: wp('90%'), // Adjusted
    height: hp('7%'), // Adjusted
    marginVertical: hp('0.625%'), // Adjusted
    marginTop: hp('1.875%'), // Adjusted
  },
  dateInputIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1.25%'), // Adjusted
    paddingTop: hp('0.5%'), // Adjusted
  },
  calendar: {
    marginTop: -5,
    marginHorizontal: 20,
  },
  CalendarStripHeaderStyle: {
    color: COLORS.background.primary,
    position: 'absolute',
    marginTop: hp('-2%'),
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('1.8%'),
  },
  calenderDateNumberStyle: {
    color: COLORS.background.primary,
    fontSize: isHpTablet('1.8%'),
    marginRight: 5,
  },
  calenderDisableDateNumberStyle: {
    color: COLORS.text,
    fontSize: isHpTablet('1.8%'),
    marginRight: 5,
  },
  calenderHighlightDateNumberStyle: {
    color: COLORS.background.white,
    fontSize: isHpTablet('1.8%'),
    marginRight: 5,
  },
  calenderHighlightDateContainerStyle: {
    borderRadius: 4,
    backgroundColor: COLORS.background.primary,
    height: 60,
    width: 40,
  },
  inputTxtStyle: {
    height: isHpTablet('5.5%'),
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.8%'),
    lineHeight: isHpTablet('2%'),
    backgroundColor: COLORS.white,
  },
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: hp('0.0625%'), // Adjusted
  },
  subtitle: {
    color: COLORS.black,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.5%'), // Adjusted
    lineHeight: isHpTablet('1.8%'),
    textAlign: 'center',
  },
  contentContainerStyle: {
    paddingBottom: hp('2.5%'), // Adjusted
    width: '100%',
  },
  boxContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp('2%'), // Adjusted
    borderBottomWidth: 1,
    paddingHorizontal: wp('5%'), // Adjusted
    borderColor: '#f1f1f1',
  },
  appointmentPrice: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('2%'), // Adjusted
    lineHeight: isHpTablet('2.2%'),
    color: COLORS.black,
  },
  viewBill: {
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.background.primary,
  },
  noSlots: {
    color: COLORS.danger,
    fontFamily: FONTS.SFProDisplayRegular,
    paddingBottom: hp('2.5%'), // Adjusted
  },
  appointTimeText: {
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplayBold,
    color: COLORS.background.primary,
    marginVertical: hp('0.625%'), // Adjusted
  },
  resText: {
    fontSize: isHpTablet('1.4%'), // Adjusted
    lineHeight: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayRegular,
    color: '#2E2E2E',
    marginVertical: hp('0.25%'), // Adjusted
  },
  hosptailNameText: {
    fontSize: wp('2.5%'), // Adjusted
    lineHeight: wp('2.5%'),
    fontFamily: FONTS.SFProDisplayRegular,
    color: '#2E2E2E',
    marginVertical: hp('0.25%'), // Adjusted
  },
  locationText: {
    fontSize: wp('2.5%'), // Adjusted
    lineHeight: wp('2.5%'),
    fontFamily: FONTS.SFProDisplaySemibold,
    color: '#2E2E2E',
    marginVertical: hp('0.25%'), // Adjusted
  },
  payBtn: {
    backgroundColor: COLORS.background.primary,
    borderRadius: isHpTablet('1%'), // Adjusted
    height: isHpTablet('6.5%'), // Adjusted
  },
  payBtnText: {
    fontFamily: FONTS.Inter,
    fontSize: isHpTablet('2%'), // Adjusted
    lineHeight: isHpTablet('2.2%'),
    color: COLORS.background.white,
  },
  bottomFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  appointFeeText: {
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black,
  },
  appointFee: {
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplaySemibold,
    color: COLORS.black,
  },
  termsText: {
    fontSize: isHpTablet('1.4%'), // Adjusted
    lineHeight: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplaySemibold,
    color: COLORS.background.primary,
  },
  agreeText: {
    fontSize: isHpTablet('1.4%'), // Adjusted
    lineHeight: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayRegular,
    color: '#969696',
  },
  icon: {
    height: hp('1.875%'), // Adjusted
    width: wp('3.75%'), // Adjusted
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: wp('5%'), // Adjusted
    fontFamily: FONTS.SFProDisplay_w700,
    fontSize: wp('4.5%'), // Adjusted
    lineHeight: wp('4.5%'),
  },
  info: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('2.2%'),
    fontWeight: '400',
    color: COLORS.black,
    textAlign: 'center',
  },
  subHeading: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('2%'),
    lineHeight: isHpTablet('2.2%'),
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 10,
  },
  paymentItem: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.8%'),
    color: COLORS.black_121212,
    marginTop: isHpTablet('1.5%'),
    fontWeight: '400',
  },
  textStrikeOut: {
    fontFamily: FONTS.Poppins,
    fontSize: wp('3%'), // Adjusted
    lineHeight: wp('3%'),
    color: COLORS.grey_969696,
    marginTop: hp('1.875%'), // Adjusted
    marginEnd: wp('1.25%'), // Adjusted
    fontWeight: '400',
    textDecorationLine: 'line-through',
  },
  textFree: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: wp('3%'), // Adjusted
    lineHeight: wp('3%'),
    color: COLORS.background.primary,
    marginTop: hp('1.875%'), // Adjusted
    fontWeight: '400',
  },
  txtDesc: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: wp('2.25%'), // Adjusted
    lineHeight: wp('2.5%'),
    color: COLORS.background.primary,
    fontWeight: '400',
  },
  txtTerms: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: wp('2.5%'), // Adjusted
    lineHeight: wp('2.5%'),
    color: COLORS.background.primary,
    fontWeight: '400',
  },
  txtByClicking: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: wp('2.5%'), // Adjusted
    lineHeight: wp('2.5%'),
    color: COLORS.grey_969696,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: hp('2.5%'), // Adjusted
  },
  paymentPrice: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('1.8%'),
    color: COLORS.text,
    marginTop: isHpTablet('1%'),
    fontWeight: '600',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  totalPrice: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('2.2%'),
    color: COLORS.text,
    marginTop: isHpTablet('2.5%'),
    fontWeight: '700',
    marginHorizontal: isHpTablet('2%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  totalAmountTop: {
    height: wp('70%'),
  },
  highlighted: {
    fontFamily: FONTS.SFProDisplayBold,
    color: COLORS.black,
    fontSize: isHpTablet('1.6%'),
    fontWeight: '700',
  },
  divider1: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    marginTop: hp('1.875%'), // Adjusted
  },
  // DoctorCard Styles
  DoctorCardContainer: {
    marginTop: hp('1%'), // Adjusted
    marginBottom: hp('0.375%'), // Adjusted
    marginHorizontal: wp('5%'), // Adjusted
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    fontSize: hp('2.5%'), // Adjusted
    lineHeight: wp('2.5%'),
    fontWeight: '500',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextAvailableText: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    fontSize: isHpTablet('1.4%'), // Adjusted
    lineHeight: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayRegular,
    fontWeight: '500',
    color: COLORS.background.primary,
  },
  DoctordetailsContainer: {
    flex: 1,
    alignSelf: 'center',
    marginStart: wp('2.5%'), // Adjusted
  },
  docDetails2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    paddingHorizontal: wp('1.25%'), // Adjusted
    paddingTop: hp('0.25%'), // Adjusted
  },
  name: {
    fontFamily: FONTS.SFProDisplay_w500,
    fontSize: isHpTablet('1.8%'),
    color: COLORS.text,
    textTransform: 'uppercase',
    lineHeight: isHpTablet('2%'),
    letterSpacing: -0.24,
  },
  category1: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.4%'),
    lineHeight: isHpTablet('2%'),
    fontWeight: '400',
    color: COLORS.black,
  },
  likeBackground: {
    margin: wp('2.5%'), // Adjusted
    width: wp('7.5%'), // Adjusted
    height: hp('3.75%'), // Adjusted
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  venueDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.2%'),
    lineHeight: isHpTablet('1.2%'),
    fontWeight: '400',
    color: COLORS.black,
  },
  hospitalDetails: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.2%'), // Adjusted
    lineHeight: isHpTablet('1.4%'),
    fontWeight: '400',
    color: COLORS.black,
    marginHorizontal: wp('5%'), // Adjusted
    marginTop: isHpTablet('1.25%'), // Adjusted
  },
  drtimeText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.2%'), // Adjusted
    lineHeight: isHpTablet('1.4%'),
    fontWeight: '400',
    color: COLORS.dark_gray,
    marginTop: hp('0.625%'), // Adjusted
  },
  seeMore: {
    fontFamily: FONTS.Poppins,
    fontSize: wp('3%'), // Adjusted
    lineHeight: hp('3%'),
    fontWeight: '400',
    color: COLORS.background.primary,
    textDecorationLine: 'underline',
  },
  btn: {
    borderRadius: 5,
    backgroundColor: COLORS.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: isHpTablet('3.75%'), // Adjusted
    width: isWpTablet('22.5%'), // Adjusted
  },
  btnText: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('1.3%'), // Adjusted
    lineHeight: isHpTablet('1.5%'),
    fontWeight: '500',
    color: COLORS.background.secondary,
    textAlign: 'center',
  },
  avatar1: {
    borderColor: COLORS.background.primary,
    borderWidth: 3,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  circleImageContainer: {
    overflow: 'hidden',
    borderRadius: isHpTablet('8%'),
    width: isHpTablet('8%'), // Adjusted
    height: isHpTablet('8%'), // Adjusted
    alignSelf: 'center',
  },
  circularImage: {
    // width: '100%',
    // height: '100%',
    width: isHpTablet('7.5%'),
    height: isHpTablet('7.5%'),
  },
  tickIcon: {
    width: isWpTablet('3%'), // Adjusted
    height: isWpTablet('3%'), // Adjusted
  },
  appointmentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: hp('1.25%'), // Adjusted
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header1: {
    justifyContent: 'center',
    marginTop: hp('1.25%'), // Adjusted
  },
  topBarTitle1: {
    fontFamily: FONTS.h4.fontFamily,
    fontSize: wp('4%'), // Adjusted
    lineHeight: hp('4%'),
    justifyContent: 'center',
    color: COLORS.text,
  },
  icon1: {
    height: hp('1.875%'), // Adjusted
    width: wp('5%'), // Adjusted
    justifyContent: 'center',
  },
  textDoctorsList: {
    width: '90%',
    textAlign: 'center',
    color: COLORS.text,
    fontFamily: FONTS.SFProDisplayBold,
    alignItems: 'center',
    textAlignVertical: 'center',
    fontSize: wp('4.5%'), // Adjusted
    lineHeight: hp('4.5%'),
    fontStyle: 'normal',
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterSelectCategory: {
    minWidth: wp('20%'), // Adjusted
    backgroundColor: COLORS.background.primary,
    padding: wp('2%'), // Adjusted
    borderRadius: 25,
    borderColor: COLORS.background.primary,
    margin: hp('0.625%'), // Adjusted
  },
  filterCategory: {
    minWidth: wp('20%'), // Adjusted
    backgroundColor: COLORS.background.secondary,
    padding: wp('2%'), // Adjusted
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.background.primary,
    margin: hp('0.625%'), // Adjusted
  },
  filterSelectText: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: wp('3.5%'), // Adjusted
    lineHeight: hp('3.5%'),
    fontWeight: '100',
  },
  // filterText: {
  //   color: COLORS.background.primary,
  //   textAlign: 'center',
  //   fontFamily: FONTS.SFProDisplayRegular,
  //   fontSize: wp('3.5%'), // Adjusted
  //   lineHeight: hp('3.5%'),
  //   fontWeight: '400',
  // },
  addIcon: {
    height: hp('3.125%'), // Adjusted
    width: wp('6.25%'), // Adjusted
  },
  // filterIcon: {
  //   marginTop: hp('1%'), // Adjusted
  //   alignItems: 'center',
  // },
  // filterContainer: {
  //   flexDirection: 'row',
  //   paddingHorizontal: wp('5%'), // Adjusted
  //   alignContent: 'center',
  // },
  section: {
    fontFamily: FONTS.text.fontFamily,
    fontSize: FONTS.text.fontSize,
    lineHeight: hp('1.5%'), // Adjust font size if needed
  },
  sectionBorderStyle: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 3,
    width: '30%',
  },
  searchDoctorInput: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  searchTextInput: {
    color: '#343E42',
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('2%'),
    fontStyle: 'normal',
    fontWeight: '400',
    height: isHpTablet('5.5%'),
    alignContent: 'center',
    marginTop: hp('1.25%'), // Adjusted
    marginHorizontal: wp('5%'), // Adjusted
  },
  searchForContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: hp('1.5%'), // Adjusted
    marginStart: wp('3.75%'), // Adjusted
  },
  textSearchResultFor: {
    color: COLORS.grey_525252,
    fontFamily: FONTS.Inter,
    fontSize: isHpTablet('1.4%'), // Adjusted
    lineHeight: isHpTablet('1.6%'),
    fontStyle: 'normal',
  },
  textSearchResult: {
    color: COLORS.background.primary,
    fontFamily: FONTS.InterBold,
    fontSize: isHpTablet('1.4%'), // Adjusted
    lineHeight: isHpTablet('1.6%'),
    fontStyle: 'normal',
  },
  doctorsList: {
    paddingBottom: hp('18.75%'), // Adjusted
    marginTop: hp('1.25%'), // Adjusted
  },
  header: {
    // backgroundColor: 'red',
  },
  textBold: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('1.8%'), // You might want to adjust this as well
  },
  cancelAppText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.7%'),
    lineHeight: isHpTablet('2%'),
    marginTop: isHpTablet('1%'),
    color: '#121212',
  },
  appointTextCancelMain: {
    fontSize: isHpTablet('2.4%'),
    fontFamily: FONTS.SFProDisplayBold,
    color: '#FF7981',
    lineHeight: isHpTablet('2.6%'),
  },
  cancelIcon: { width: isHpTablet('20%'), height: isHpTablet('20%') },
  mainContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#EFEFEF',
    marginTop: hp('2.5%'), // Adjusted
  },
  cancelRadioButtoncontainer: {
    display: 'flex',
    flexDirection: 'row',
    height: isHpTablet('7%'),
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  touchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5%'), // Adjusted
  },
  selectOptionContainerStyle: {
    height: isHpTablet('2.5%'), // Adjusted
    width: isHpTablet('2.5%'), // Adjusted
    borderRadius: isHpTablet('1.2%'),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('1.25%'), // Adjusted
  },
  selectOptionStyle: {
    height: isHpTablet('1.5%'), // Adjusted
    width: isHpTablet('1.5%'), // Adjusted
    borderRadius: isHpTablet('0.8%'),
    backgroundColor: COLORS.background.primary,
  },
  optionTextStyle: {
    marginLeft: wp('2.5%'), // Adjusted
    color: COLORS.text,
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplayRegular,
  },
  resultTextStyle: {
    marginLeft: wp('8.75%'), // Adjusted
    color: COLORS.background.primary,
    fontSize: wp('3%'), // Adjusted
    lineHeight: wp('3%'),
  },
  topBarTitle: {
    fontFamily: FONTS.pageHeaderTitleText.fontFamily, // Update font family and size if needed
    fontSize: wp('4%'), // Adjusted
    lineHeight: wp('4%'),
  },
  helpText: {
    fontSize: isHpTablet('1.8%'), // Adjusted
    lineHeight: isHpTablet('2%'),
    fontFamily: FONTS.SFProDisplaySemibold,
    color: COLORS.black,
  },
  appointmentId: {
    height: isHpTablet('1.8%'), // Adjusted
    width: isHpTablet('2.4%'), // Adjusted
    alignSelf: 'center',
    marginRight: isWpTablet('1.25%'), // Adjusted
  },
  appointmentDetailsText: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('1.8%'), // Adjusted
    lineHeight: isHpTablet('2%'),
    color: COLORS.black,
  },
  antIcon: {
    alignSelf: 'center',
    marginRight: wp('1.25%'), // Adjusted
  },
  labelText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('1.8%'),
    color: '#8A8A8A',
    marginBottom: hp('0.625%'), // Adjusted
  },
  image: {
    width: isHpTablet('1.8%'), // Adjusted
    height: isHpTablet('1.8%'), // Adjusted
    alignSelf: 'center',
    marginRight: isWpTablet('1.25%'), // Adjusted
  },
  valueText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('1.8%'),
    color: COLORS.black,
  },
  buttonBoxContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    bottom: Platform.OS === 'ios' ? hp('5%') : hp('5%'), // Adjusted
  },
  addBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 10,
    height: isHpTablet('6.5%'),
  },
  applyTxtStyle: {
    color: COLORS.white,
    fontSize: isHpTablet('2%'), // Adjusted
    lineHeight: isHpTablet('2.2%'),
    fontWeight: '500',
  },
  cababMenu: {
    // paddingLeft: hp('1.25%'), // Adjusted
    // paddingRight: hp('1.25%'), // Adjusted
    paddingVertical: isHpTablet('1.25%'), // Adjusted
  },
  AppointmentcardContainer: {
    marginHorizontal: wp('2.5%'), // Adjusted
    display: 'flex',
    flexDirection: 'row',
  },
  seperator: {
    marginRight: wp('2%'), // Adjusted
    height: hp('23.8%'), // Adjusted
    width: hp('1.8%'), // Adjusted
  },
  card: {
    flex: 1,
    marginRight: wp('1.25%'), // Adjusted
    borderWidth: wp('0.25%'), // Adjusted
    borderRadius: wp('2.5%'), // Adjusted
    marginBottom: hp('2.5%'), // Adjusted
    overflow: 'hidden',
  },
  upcomingCard: {
    borderColor: '#EFEFEF',
  },
  pastCard: {
    borderColor: '#F3F3F3',
  },
  upcomingHeader: {
    backgroundColor: COLORS.blue_F3F8FF,
  },
  upcomingFailedHeader: {
    backgroundColor: '#FFF1F3',
  },
  pastHeader: {
    backgroundColor: COLORS.grey_E5E5E5,
  },
  upcomingHeaderTitle: {
    color: COLORS.background.primary,
  },
  upcomingFailedHeaderTitle: {
    color: '#FA4D5E',
  },
  pastHeaderTitle: {
    color: COLORS.greyText,
  },
  cardHeader: {
    paddingHorizontal: isWpTablet('3%'), // Adjusted
    paddingVertical: isHpTablet('0.3%'), // Adjusted
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: isHpTablet(1.5),
    lineHeight: isHpTablet(1.5),
    letterSpacing: wp('0.125%'), // Adjusted
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'normal',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isWpTablet('3%'), // Adjusted
  },
  dateStyle: {
    marginTop: hp('1.125%'), // Adjusted
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet(1.5),
    lineHeight: isHpTablet(1.5),
    color: COLORS.text,
    fontStyle: 'normal',
    fontWeight: '400',
    marginBottom: hp('0.8%'), // Adjusted
  },
  patientName: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_231F20,
    fontWeight: '400',
    fontSize: isHpTablet(1.5),
    lineHeight: isHpTablet(1.7),
  },
  categoryStyle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet(1.5),
    lineHeight: isHpTablet(1.5),
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: hp('0.8%'), // Adjusted
  },
  doctorStyle: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: isHpTablet(1.5),
    lineHeight: isHpTablet(1.5),
    color: COLORS.text,
    fontStyle: 'normal',
    fontWeight: '700',
    marginBottom: hp('0.8%'),
  },
  hospitalStyle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet(1.5),
    lineHeight: isHpTablet(1.5),
    fontWeight: '300',
    color: COLORS.greyText,
    marginBottom: hp('0.8%'),
  },
  doctorIcon: {
    width: isWpTablet('15%'), // Adjusted
    height: hp('7.5%'), // Adjusted
    marginRight: wp('2.5%'), // Adjusted
  },
  cardFooter: {
    flex: 1,
    justifyContent: 'center',
    height: isHpTablet('4%'), // Adjusted
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isWpTablet('3%'), // Adjusted
  },
  userIcon: {
    width: isWpTablet('3%'), // Adjusted
    height: isHpTablet('2%'), // Adjusted
    justifyContent: 'center',
  },
  icon2: {
    width: wp('3%'), // Adjusted
    height: hp('1.5%'), // Adjusted
    justifyContent: 'center',
  },
  lapIcon: {
    width: wp('3%'), // Adjusted
    height: hp('2.125%'), // Adjusted
    justifyContent: 'center',
  },
  avatar: {
    height: hp('6.75%'), // Adjusted
    width: wp('13.5%'), // Adjusted
    borderRadius: 40,
    marginBottom: hp('1.875%'), // Adjusted
  },
  patientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  patientStyle: {
    fontFamily: FONTS.PoppinsMedium,
    fontSize: isHpTablet(1.7), // Adjusted
    color: COLORS.text,
    justifyContent: 'center',
    marginStart: wp('1.25%'), // Adjusted
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: isHpTablet('2.25%'), // Adjusted
  },
  tickImage: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: isWpTablet('1.25%'), // Adjusted
    alignSelf: 'center',
  },
  txtPaynow: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: COLORS.background.primary,
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.background.white,
    width: isWpTablet('18%'), // Adjusted
    height: isHpTablet('3.6%'), // Adjusted
    fontSize: isHpTablet('1.7'), // Adjusted
    lineHeight: isHpTablet('1.7'),
    borderRadius: isWpTablet('2%'), // Adjusted
  },
  // ViewAppointment styles
  txtComingSoon: {
    fontSize: isHpTablet('1.2%'), // Adjusted
    lineHeight: isHpTablet('1.4%'),
    marginStart: isHpTablet('3.75%'), // Adjusted
    paddingVertical: isHpTablet('0.375%'), // Adjusted
    paddingHorizontal: isHpTablet('1.25%'), // Adjusted
    borderWidth: 1,
    borderRadius: isHpTablet('0.6%'),
    color: COLORS.green_00B347,
    borderColor: COLORS.green_CFFED6,
    backgroundColor: COLORS.green_CFFED6,
  },
  divider: {
    borderBottomWidth: isWpTablet('0.175%'), // Adjusted
    borderColor: COLORS.grey_E5E5E5,
  },
  bsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: hp('2.625%'), // Adjusted
  },
  bsName: {
    color: '#121212',
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: isHpTablet('1.7%'),
    lineHeight: isHpTablet('2%'),
    fontStyle: 'normal',
    fontWeight: '500',
    marginStart: isHpTablet('1.5%'),
  },
  bsLayout: {
    padding: wp('5%'), // Adjusted
    width: '100%',
  },
  scrollViewStyle: {
    flex: 1,
  },
  icon3: {
    height: hp('2.75%'), // Adjusted
    width: wp('5.5%'), // Adjusted
  },
  tabTextContainer: {
    width: wp('45%'), // Adjusted,
  },
  sectionContainer: {
    padding: hp('0.3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.grey_F6F6F6,
    marginHorizontal: hp('1.5%'),
    borderRadius: hp('0.5%'),
  },
  selectedSection: {
    backgroundColor: COLORS.white,
    borderRadius: hp('0.5%'),
    paddingVertical: hp('1%'),
    textAlign: 'center',
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.Poppins,
    color: COLORS.black,
  },
  unSelectedSection: {
    backgroundColor: COLORS.grey_F6F6F6,
    paddingVertical: hp('1.2%'), // Adjusted
    textAlign: 'center',
    fontSize: isHpTablet('1.7%'), // Adjusted
    lineHeight: isHpTablet('1.7%'),
    fontFamily: FONTS.Poppins,
    color: COLORS.black_121212,
  },
  noAppointment: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtPaid: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#17CF9D',
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.background.white,
    width: isWpTablet('15%'), // Adjusted
    height: isHpTablet('3.5%'), // Adjusted
    fontSize: isHpTablet('1.7'), // Adjusted
    lineHeight: isHpTablet('1.7%'),
    borderRadius: isHpTablet('0.5%'), // Adjusted
  },
  txtPaynowPast: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: COLORS.grey_E5E5E5,
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.greyText,
    width: isWpTablet('15%'), // Adjusted
    height: isHpTablet('3.5%'), // Adjusted
    fontSize: isHpTablet('1.7'), // Adjusted
    lineHeight: isHpTablet('1.7%'),
    borderRadius: isHpTablet('0.5%'), // Adjusted
  },
  bsIcon: {
    width: isHpTablet('2%'), // Adjusted
    height: isHpTablet('2%'), // Adjusted
    // marginLeft: isHpTablet('1.5%'), // Adjusted
  },
  copyBsIcon: {
    width: isHpTablet('1.8%'), // Adjusted
    height: isHpTablet('2..5%'), // Adjusted
    marginLeft: isHpTablet('1.5%'), // Adjusted
  },
  calendarStripStyle: {
    paddingVertical: 20,
    height: 120,
    marginTop: 10,
  },
  commonCalenderStripStyle: {
    height: 60,
  },
  bookAgnBtn: {
    backgroundColor: COLORS.background.primary,
    width: isWpTablet('18%'), // Adjusted
    height: isHpTablet('3.5%'), // Adjusted
    borderRadius: isWpTablet('0.5%'), // Adjusted
    justifyContent: 'center',
  },
  joinBtn: {
    backgroundColor: '#17CF9D',
    width: isWpTablet('18%'), // Adjusted
    height: isHpTablet('3.5%'), // Adjusted
    borderRadius: isHpTablet('0.5%'), // Adjusted
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  joinBtnIcon: {
    height: isHpTablet('1.8%'),
  },
  bookAgnTxt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.background.white,
    fontSize: isHpTablet('1.5%'), // Adjusted
    lineHeight: isHpTablet('1.7%'),
  },
  joinTxt: {
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.background.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: isHpTablet('1.5%'), // Adjusted
    lineHeight: isHpTablet('1.7%'),
    paddingLeft: '3%',
  },
  filterIcon: { alignItems: 'center', height: isHpTablet(2), width: 16 },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    backgroundColor: '#F5F5F5',
    height: isHpTablet('6%'),
    marginHorizontal: hp('1.5%'),
    marginVertical: hp('1.5%'),
    borderRadius: 5,
  },
  filterText: {
    color: COLORS.text,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.8%'),
  },
  filterApplied: {
    fontSize: isHpTablet('1.8%'),
    fontWeight: '600',
    fontFamily: FONTS.SFProDisplayMedium,
    color: '#232323',
    paddingHorizontal: '3.5%',
  },
  resultFound: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FONTS.SFProDisplayMedium,
    color: '#207DFF',
    paddingHorizontal: '3%',
  },
  countStyle: {
    fontSize: 15,
    fontFamily: FONTS.SFProDisplayMedium,
    color: '#207DFF',
    paddingHorizontal: '3%',
  },
  addContainer: {
    width: isWpTablet('7%'),
    height: isHpTablet('3.2%'),
    backgroundColor: '#EDF5FF',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearAll: {
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplayMedium,
    color: '#207DFF',
  },
  clearContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '3%',
  },
});
