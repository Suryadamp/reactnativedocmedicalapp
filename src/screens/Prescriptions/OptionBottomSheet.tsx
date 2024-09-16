import { Image, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, assets } from '../../constants';
import { IOptionsBottomSheetProps } from '../../@types/components';
import { Box } from '../../components';
import { showSnackBar } from '../../util/AlertUtil';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import commonStyles from '../../styles/Common.styles';
import styles from '../../styles/Prescription.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';

const OptionBottomSheet: React.FC<IOptionsBottomSheetProps> = ({
  selectedItem,
  handleClosePress,
  onDelete,
  navigation,
}) => {
  const { prescriptionAction } = useSelector((state: RootState) => state.prescriptionProductList);
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      {/* <Box style={styles.divider} /> */}
      {/* {UsePermission(permissionList.mobilePrescriptionEdit) && (
        <>
          <TouchableOpacity
            style={styles.bsItem}
            onPress={() => {
              navigation.navigate('PrescriptionDetail', { item: [selectedItem] });
              handleClosePress?.();
            }}
          >
            {/* <Image
          source={assets.PencilSquare}
          style={[styles.bsIcon, { tintColor: COLORS.black_252525 }]}
        />
            <Icon
              // style={{ transform: [{ rotate: showOption ? '180deg' : '0deg' }] }}
              name="eye"
              size={styles.eyeIcon.height}
              color={COLORS.black_252525}
            />
            <Text style={styles.bsName}>View</Text>
          </TouchableOpacity>
          <Box style={commonStyles.divider} />
        </>
      )} */}
      {selectedItem?.access && UsePermission(permissionList.mobilePrescriptionDelete) && (
        <TouchableOpacity
          style={styles.bsItem}
          onPress={() => {
            onDelete();
          }}
        >
          <Image source={assets.DeleteRed} style={styles.bsIcon} />

          <Text style={styles.bsDeleteName}>Delete</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default OptionBottomSheet;
