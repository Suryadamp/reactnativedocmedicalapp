import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { AbstractButton, Box } from '../components';
import { COLORS, FONTS, assets } from '../constants';
import { StyleSheet } from 'react-native';
import styles from '../styles/DeleteMedicineDialog';
import { isHpTablet } from '../hooks/useDeviceCheck';

const DeleteMedicine = ({ title, visible, onClose, callback, closeDialog, loader }: any) => {
  const handleSubmit = () => {
    callback();
  };

  const close = () => {
    closeDialog();
  };
  const lTitle = title?.toLowerCase();

  return (
    <Box style={styles.centeredView}>
      <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Box style={styles.container}>
            <Box style={styles.dialog}>
              <Box style={styles.title}>
                <Text style={styles.titleText}>Delete {title ?? 'Medicine'}</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  hitSlop={{ left: 10, right: 10, top: 15, bottom: 10 }}
                  onPress={close}
                >
                  <Image source={assets.CloseWhite} style={styles.closeIcon} />
                </TouchableOpacity>
              </Box>
              <Text style={styles.contentText}>
                Are you sure want to delete this {lTitle ?? 'medicine'}
              </Text>
              <Box style={styles.buttonBox}>
                <TouchableOpacity activeOpacity={0.5} onPress={close} style={styles.cancelBtn}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={styles.deleteBtnStyle}>
                  <Text style={styles.deleteText}>Delete</Text>
                  {loader && (
                    <ActivityIndicator
                      style={styles.indicator}
                      size={isHpTablet('2%')}
                      color={COLORS.background.white}
                    />
                  )}
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </Modal>
    </Box>
  );
};

export default DeleteMedicine;
