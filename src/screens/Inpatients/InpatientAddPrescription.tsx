// InpatientAddInvestigation
import React, { useState, useCallback, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

import { AbstractButton, AppContainer, Box, CustomHeader } from '../../components';
import { COLORS, SIZES } from '../../constants';
import { RootState } from '../../state';
import { PrescriptionProducts } from '../../state/prescriptions/prescriptionProduct';
import {
  showErrorSnackBar,
  showSnackBar,
  showSuccessSnackBar,
  Snackbar,
} from '../../util/AlertUtil';
import { strings } from '../../i18n';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import CustomSelectBottomSheet from '../../components/CustomBottomSheet/CustomSelectBottomSheet';
import styles from '../../styles/Inpatients/InpatientPrescription.styles';
import {
  inpatientCreatePrescription,
  inpatientGetPrescriptions,
} from '../../service/InpatientService';

interface NavigateProps {
  navigation?: any;
  route?: any;
  header?: string;
}
type Props = NavigateProps;

const InpatientAddPrescription = ({ navigation, route }: Props) => {
  const { prescriptionProductList } = useSelector(
    (state: RootState) => state.prescriptionProductList,
  );

  const { selectedInpatient } = useSelector((state: RootState) => state.inpatients);

  const [isProductOpen, setIsProductOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [productItem, setProductItem] = useState<PrescriptionProducts | undefined>(undefined);
  const [quantity, setQuantity] = useState<string>('');
  const [instruction, setInstruction] = useState<string>('');

  const snapPoints = ['41%'];

  // BottomSheet Hooks
  const sheetRef = useRef<BottomSheet>(null);

  const handleProductClosePress = useCallback(() => {
    setIsProductOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleQuantityChange = (text: string) => {
    setQuantity(text);
  };

  const handleChangeInstruction = (text: string) => {
    setInstruction(text);
  };

  const handleSelectedProductType = (selectedData: any) => {
    setProductItem(selectedData);
  };

  // NextScreen
  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddMedicine = () => {
    console.log('ipAdmission', selectedInpatient);
    if (productItem && quantity) {
      setLoader(true);
      const newData = {
        ip_admission_id: selectedInpatient?.ip_admissions?.id,
        prescription_consultant_id: selectedInpatient?.ip_admissions?.doctor_id,
        prescription_store_id: 1,
        prescriptions: [
          {
            product: productItem.id,
            quantity,
            instruction,
          },
        ],
      };

      inpatientCreatePrescription(newData)
        .then(async (res) => {
          if (res?.data) {
            showSuccessSnackBar('Inpatient prescription created successfully');

            await inpatientGetPrescriptions(selectedInpatient?.ip_admissions?.id);
            navigation.navigate('InpatientPrescriptionList', {
              screen: 'InpatientPrescriptionList',
            });
          }
          setLoader(false);
        })
        .catch((err) => {
          showErrorSnackBar(err.message);
          setLoader(false);
        });
    } else {
      const fields = {
        productItem: !productItem?.id && 'Symptoms',
        quantity: !quantity && 'Quantity',
      };
      const missingField = Object.entries(fields).find(([_, message]) => message);
      if (missingField) {
        showErrorSnackBar(`Please enter ${missingField[1]}.`);
      }
    }
  };

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon={'arrow-left'}
        hasDivider
        title={strings.displayText.addMedicine}
        onLeftIconPress={handleBack}
      />
      {/* <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            style={{ padding: 1 }}
            onPress={() => {
              handleBack();
            }}
          >
            <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.addMedicine}</Text>
          <TouchableOpacity activeOpacity={0.8}>
            {/* <Image source={assets.AddPlusBlue} style={commonStyles.menuIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
      <ScrollView>
        <Box alignItems="center">
          <Box width={SIZES.screenWidth * 0.9} marginTop={styles.addPreMarginTop.height}>
            <TouchableOpacity onPress={() => setIsProductOpen(true)}>
              <TextInput
                label={strings.displayText.medicineName}
                mode="outlined"
                placeholderTextColor={COLORS.gray}
                placeholder={strings.displayText.search}
                style={[styles.inputTxtStyle]}
                value={productItem ? productItem?.name : ''}
                editable={false}
                outlineColor={COLORS.white_smoke}
                activeOutlineColor={COLORS.background.primary}
                onPressIn={() => setIsProductOpen(true)}
                // Add an icon at the end of the TextInput
                right={
                  <TextInput.Icon
                    style={styles.iconStyle}
                    color={COLORS.black}
                    disabled={true}
                    icon="chevron-down"
                  />
                }
                theme={{
                  colors: {
                    primary: COLORS.gray,
                    underlineColor: 'transparent',
                    background: COLORS.background.secondary,
                    onSurfaceVariant: '#8A8A8A',
                  },
                  roundness: SIZES.padding * 0.9,
                }}
              />
            </TouchableOpacity>
          </Box>
          <Box width={SIZES.screenWidth * 0.9} marginVertical={12}>
            <TextInput
              label={'Quantity'}
              mode="outlined"
              placeholderTextColor={'grey'}
              style={styles.inputTxtStyle}
              activeOutlineColor={COLORS.background.primary}
              value={quantity}
              onChangeText={(text) => handleQuantityChange(text)}
              outlineColor={COLORS.white_smoke}
              keyboardType="numeric"
              maxLength={7}
              theme={{
                colors: {
                  primary: COLORS.gray,
                  underlineColor: 'transparent',
                  background: COLORS.background.secondary,
                  onSurfaceVariant: '#8A8A8A',
                },
                roundness: SIZES.padding * 0.9,
              }}
            />
          </Box>
          <Box width={SIZES.screenWidth * 0.9}>
            <TextInput
              label={'Instruction'}
              mode="outlined"
              placeholderTextColor={'grey'}
              style={styles.inputTxtStyle}
              activeOutlineColor={COLORS.background.primary}
              value={instruction}
              onChangeText={(text) => handleChangeInstruction(text)}
              outlineColor={COLORS.white_smoke}
              theme={{
                colors: {
                  primary: COLORS.gray,
                  underlineColor: 'transparent',
                  background: COLORS.background.secondary,
                  onSurfaceVariant: '#8A8A8A',
                },
                roundness: SIZES.padding * 0.9,
              }}
            />
          </Box>
        </Box>
      </ScrollView>
      {productItem && quantity && (
        <Box style={styles.buttonBoxContainer}>
          <AbstractButton
            onPress={handleAddMedicine}
            loader={loader}
            buttonStyle={[styles.addBtnStyle, { backgroundColor: COLORS.background.primary }]}
            textStyle={styles.applyTxtStyle}
          >
            {strings.displayText.createPrescription}
          </AbstractButton>
        </Box>
      )}
      {isProductOpen && (
        <CustomBottomSheet
          openBSheet={isProductOpen}
          snapPoints={snapPoints}
          setSheetState={setIsProductOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.selectMedicine}
        >
          <CustomSelectBottomSheet
            type={strings.displayText.selectMedicine}
            selectOptions={prescriptionProductList}
            handleSelectedFilterType={handleSelectedProductType}
            handleClosePress={handleProductClosePress}
          />
        </CustomBottomSheet>
      )}
    </AppContainer>
  );
};

export default InpatientAddPrescription;
