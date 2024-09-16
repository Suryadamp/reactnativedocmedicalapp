import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity } from 'react-native';
import { AppContainer, Box } from '../../components';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import { COLORS, SIZES, assets } from '../../constants';
import DeleteMedicine from '../../dialogs/DeleteMedicineDialog';
import { deletePrescriptionMedicine } from '../../service/PrescriptionService';
import { showSuccessSnackBar } from '../../util/AlertUtil';
import MedicineCard from './MedicineCard';
import styles from '../../styles/Prescription.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import { setPrescriptionAction } from '../../state/prescriptions/prescriptionProduct';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import { isHpBottomTablet } from '../../hooks/useDeviceCheck';

import CustomHeader from '../../components/CustomHeader';
import { useScrollEndDetection } from '../../hooks/useLogs';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NavigateProps;

const PrescriptionDetail = ({ navigation, route }: Props) => {
  const { handleScroll } = useScrollEndDetection();
  const prescriptionItem = route.params?.item;
  const dispatch = useDispatch();
  const { prescriptionAction } = useSelector((state: RootState) => state.prescriptionProductList);
  const [showDialog, setShowDialog] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [access, setAccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['20%'];

  // BottomSheet Callbacks
  const handlePressBs = useCallback(() => {
    sheetRef.current?.close();
    setIsOpen(false);
    openDialog();
  }, []);

  useEffect(() => {
    setPrescriptionData(prescriptionItem);
  }, [prescriptionItem]);

  // const addReminderCall = async () => {
  //   await reminderUpdate(1, selectedItem?.prescription_id, selectedItem?.id)
  //     .then((resp) => {
  //       handlePressBs();
  //       if (resp) {
  //         if (resp?.success === true) {
  //           addReminderToFirebaseDB();
  //           showSnackBar(strings.displayText.reminder_success);
  //         } else {
  //           showSnackBar(strings.displayText.service_error);
  //         }
  //       } else {
  //         showSnackBar(strings.displayText.service_error);
  //       }
  //     })
  //     .catch((_err) => {
  //       handlePressBs();
  //       showSnackBar(strings.displayText.service_error);
  //     });
  // };
  // const addReminderToFirebaseDB = async () => {
  //   try {
  //     const patientData = {
  //       id: selectedItem?.id, // Unique identifier for the patient
  //       product_id: selectedItem?.product.id,
  //       prescription_id: selectedItem?.prescription_id,
  //       product_name: selectedItem?.product.name,
  //       start_date: selectedItem?.start_date, // Start date of medication
  //       duration: selectedItem?.duration,
  //       prescription_dosage_timings: selectedItem?.prescription_dosage_timings,
  //     };
  //     const dataRef = ref(database, 'reminders/' + selectedItem?.id);
  //     set(dataRef, patientData);
  //   } catch (error) {}
  // };

  const BsContent = (
    <>
      {/* <TouchableOpacity
        style={styles.bsItem}
        onPress={() => {
          addReminderCall();
        }}
      >
        <Image source={assets.AddPlusGrey} style={styles.bsIcon} />
        <Text style={styles.bsName}>Add a Remainder</Text>
      </TouchableOpacity> */}
      {/* <Box style={styles.divider} /> */}
      {UsePermission(permissionList.mobilePrescriptionEdit) && (
        <>
          <TouchableOpacity
            style={styles.bsItem}
            onPress={() => {
              setIsOpen(false);
              navigation.navigate('CreateRemainder', { item: { selectedItem, access } });
            }}
          >
            <Image
              source={assets.PencilSquare}
              style={[styles.bsIcon, { tintColor: COLORS.black_252525 }]}
            />
            <Text style={styles.bsName}>Edit</Text>
            {/* <Text style={styles.txtComingSoon}>coming soon</Text> */}
          </TouchableOpacity>
          <Box style={styles.divider} />
        </>
      )}
      {/* <TouchableOpacity
        style={styles.bsItem}
        onPress={() => {
          handlePressBs();
        }}
      >
        <IconButton name={'share-variant-outline'} size={15} color={COLORS.black_252525} />
        <Text style={styles.bsName}>Share</Text>
        <Text style={styles.txtComingSoon}>coming soon</Text>
      </TouchableOpacity> */}
      {/* <Box style={styles.divider} /> */}
      {access && UsePermission(permissionList.mobilePrescriptionDelete) && (
        <TouchableOpacity
          style={styles.bsItem}
          onPress={() => {
            handlePressBs();
          }}
        >
          <Image source={assets.DeleteRed} style={styles.bsIcon} />
          <Text style={styles.bsDeleteName}>Delete</Text>
          {/* <Text style={styles.txtComingSoon}>coming soon</Text> */}
        </TouchableOpacity>
      )}
    </>
  );

  const openBottomSheet = (item: any) => {
    setIsOpen(true);
    setSelectedItem(item?.items);
    setAccess(item?.access);
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleNavigation = (data: any) => {
    navigation.navigate('CreateRemainder', {
      item: {
        presc_id: prescriptionData[0]?.id,
        patient_id: prescriptionData[0]?.patient_id,
        symtom: data?.symptom,
      },
    });
  };

  const handleDelete = async () => {
    try {
      setShowLoader(true);
      if (selectedItem?.id) {
        const result = await deletePrescriptionMedicine(selectedItem?.id);
        if (result?.message === 'Success') {
          const updatedPrescriptionData = {
            ...prescriptionData[0], // Assuming you are updating the first prescription in the array
            prescription_product: {
              ...prescriptionData[0]?.prescription_product, // Copying other prescription products
              [selectedItem?.symptom?.symptom_name]: prescriptionData[0]?.prescription_product[
                selectedItem?.symptom?.symptom_name
              ]?.filter((product: any) => product?.id !== selectedItem?.id),
            },
          };
          setPrescriptionData([updatedPrescriptionData, ...prescriptionData.slice(1)]);
          dispatch(setPrescriptionAction(!prescriptionAction));
          closeDialog();
          showSuccessSnackBar('Deleted Successfully');
        } else {
          // showSnackBar('Delete Failed');
        }
        setShowLoader(false);
      }
    } catch (error) {
      // Handle the error
      setShowLoader(false);
      console.log('Error occurred:', error);
    }
  };

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        {/* <Box style={styles.container}> */}
        {/* <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} /> */}
        <CustomHeader
          leftIcon="arrow-left"
          title={prescriptionData[0]?.invoice_no}
          rightIcon="plus"
          permission={
            prescriptionData[0]?.access && UsePermission(permissionList.mobilePrescriptionAdd)
          }
          onLeftIconPress={() => navigation.goBack()}
          onRightIconPress={() => {
            navigation.navigate('CreateRemainder', {
              item: {
                presc_id: prescriptionData[0]?.id,
                patient_id: prescriptionData[0]?.patient_id,
              },
            });
          }}
        />
        {/* <Box style={styles.header}>
          <Box style={styles.topBar}>
            <Box flexDirection="row" alignContent="center" alignItems="center">
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
            </Box>
            <Text style={commonStyles.topTitleText}>{prescriptionData[0]?.invoice_no}</Text>
            {prescriptionData[0]?.access && UsePermission(permissionList.mobilePrescriptionAdd) ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('CreateRemainder', {
                    item: {
                      presc_id: prescriptionData[0]?.id,
                      patient_id: prescriptionData[0]?.patient_id,
                    },
                  });
                }}
              >
                <Image source={assets.AddPlusBlue} style={commonStyles.menuIcon} />
              </TouchableOpacity>
            ) : (
              <Box />
            )}
          </Box>
        </Box> */}
        <Box marginTop={10}>
          <Box justifyContent="flex-end" position="absolute">
            <DeleteMedicine
              visible={showDialog}
              onClose={closeDialog}
              callback={handleDelete}
              closeDialog={closeDialog}
              loader={showLoader}
            />
          </Box>
          <Box height={SIZES.screenHeight / 1.1}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={prescriptionData}
              onScroll={handleScroll}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <MedicineCard
                  openBSheet={openBottomSheet}
                  openDialog={openDialog}
                  item={item}
                  handleNavigation={handleNavigation}
                  key={item?.id}
                  index={index}
                />
              )}
            />
          </Box>
        </Box>
        {/* </Box> */}
      </AppContainer>
      {isOpen && (
        <CustomBottomSheet
          openBSheet={isOpen}
          // snapPoints={[Platform.OS === 'ios' ? '25%' : `${isHpBottomTablet(3.5)}`]}
          snapPoints={['25%']}
          setSheetState={setIsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.bsLayout}
          title={'Options'}
          children={BsContent}
          enableDynamicSizing
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
    </>
  );
};

export default PrescriptionDetail;
