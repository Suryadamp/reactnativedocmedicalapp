import React from 'react';
import { Image, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Box } from '../../components';
import { COLORS, FONTS, assets } from '../../constants';

const LabReportDialog = ({ visible, onClose, callback, closeDialog, item }) => {
  const handleSubmit = () => {
    callback();
  };

  const close = () => {
    closeDialog();
  };

  return (
    <View style={styles.centeredView}>
      <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Box style={styles.container}>
            <Box style={styles.dialog}>
              <Box justifyContent="space-between" flexDirection="row">
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ justifyContent: 'center', marginHorizontal: 20 }}
                >
                  <Image source={assets.DownloadBlue} style={styles.filterIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={close}
                  style={{ justifyContent: 'center', marginHorizontal: 20 }}
                >
                  <Image source={assets.IconCloseWhite} style={styles.filterIcon} />
                </TouchableOpacity>
              </Box>
              <Box
                borderRadius={5}
                alignItems="center"
                justifyContent="center"
                marginVertical={20}
                marginHorizontal={20}
              >
                <Image source={item.pdf_url} />
              </Box>
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = {
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    borderRadius: 6,
    paddingBottom: 20,
    paddingTop: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    borderColor: COLORS.gray,
    borderWidth: 2,
    borderRadius: 6,
    padding: 3,
    shadowOffset: 6,
    shadowColor: COLORS.gray,
    shadowOpacity: 6,
    shadowRadius: 6,
    marginTop: 10,
  },
  selectedRadioText: {
    color: COLORS.background.primary,
    position: 'absolute',
    left: 55,
  },
  radioText: {
    color: COLORS.greyText,
    position: 'absolute',
    left: 55,
  },
  optionThree: { flexDirection: 'row', marginStart: 55, paddingEnd: 20, right: 10 },
  calendarIcon: { height: 20, width: 20 },
  toContainer: { marginStart: 10, marginEnd: 20 },
  calendarText: { marginStart: 5 },
  btnContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 20,
  },
  bookSlotBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bookSlotBtnText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 13,
    color: COLORS.background.primary,
    textAlign: 'center',
    backgroundColor: COLORS.grey,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  filterIcon: { alignItems: 'center' },
};

export default LabReportDialog;
