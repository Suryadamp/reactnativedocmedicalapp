import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import CustomBottomSheet from '../CustomBottomSheet';
import SearchBottomSheet from './BottomSheet';
import { strings } from '../../i18n';
import CustomSelectPatientBottomSheet from './CustomSelectPatientBottomSheet';
import { setSelectPatient } from '../../state/patients';
import CustomEditPatientBottomSheet from './CustomEditPatientBottomSheet';
import CustomAddPatientBottomSheet from './CustomAddPatientBottomSheet';
import styles from '../../styles/component_styles/PatientBottomSheet.styles';
import { KeyboardAvoidingView } from 'react-native';

const PatientBottomSheet = ({ isOpen, setIsOpen }: any) => {
  // BottomSheet Hooks
  const sheetRef = useRef<BottomSheet>(null);
  const dispatch = useDispatch();

  const { patientList, selectedPatient } = useSelector((state: RootState) => state.patients);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPatientDetails, setEditPatientDetails] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(patientList);
  }, [patientList]);

  // BottomSheet Callbacks
  const handleClosePress = useCallback(() => {
    setIsOpen(false);
    sheetRef.current?.close();
  }, [setIsOpen]);

  const handleAddClosePress = useCallback(() => {
    setIsAddOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleEditClosePress = useCallback(() => {
    setIsEditOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleChangePatient = (item: any) => {
    dispatch(setSelectPatient(item)); // Dispatch the action here
    handleClosePress();
  };

  return (
    <>
      {isOpen && (
        <SearchBottomSheet
          sheetRef={sheetRef}
          openBSheet={isOpen}
          snapPoints={['55%']}
          title="Select a Patient"
          setSheetState={setIsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
        >
          <CustomSelectPatientBottomSheet
            patientsList={patients}
            sheetRef={sheetRef}
            handleClosePress={handleClosePress}
            patientName={selectedPatient?.name}
            setChangePatient={handleChangePatient}
            setEditDetailsState={setEditPatientDetails}
            setAddSheetState={setIsAddOpen}
            setEditSheetState={setIsEditOpen}
          />
        </SearchBottomSheet>
      )}
      {/* Add Patient bottomsheet */}
      {isAddOpen && (
        <CustomAddPatientBottomSheet
          handleClosePress={handleAddClosePress}
          isAddOpen={isAddOpen}
          setIsAddOpen={setIsAddOpen}
        />
      )}

      {/* Edit patient details */}
      {isEditOpen && (
        <CustomEditPatientBottomSheet
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          editTitle={strings.displayText.editPatientDetails}
          editDetails={editPatientDetails}
          handleClosePress={handleEditClosePress}
        />
      )}
    </>
  );
};

export default PatientBottomSheet;
