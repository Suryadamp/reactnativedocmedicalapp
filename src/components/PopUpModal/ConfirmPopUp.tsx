import React from 'react';
import { Animated, Image, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import Box from '../Box';

interface props {
  visible: boolean;
  showHeader?: boolean;
  handleCloseModal?: () => void;
  children?: React.ReactNode;
}

const ConfirmPopUp = (props: props) => {
  const { visible, showHeader, children, handleCloseModal } = props;
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  const toggleModal = React.useCallback(() => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        stiffness: 300,
        damping: 20,
        mass: 1,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, scaleValue]);

  React.useEffect(() => {
    toggleModal();
  }, [visible, toggleModal]);

  return (
    <Modal transparent visible={showModal}>
      <Box style={styles.modalBackGround}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          <Box alignItems="center">
            <Box style={styles.header}>
              {showHeader && (
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    style={{
                      fontFamily: FONTS.SFProDisplayRegular,
                      fontSize: SIZES.extraLarge,
                      color: COLORS.black,
                    }}
                  />
                  <TouchableOpacity
                    hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
                    onPress={() => (handleCloseModal ? handleCloseModal() : {})}
                  >
                    <Image source={assets.CloseX} style={styles.closeImage} />
                  </TouchableOpacity>
                </Box>
              )}
            </Box>
          </Box>
          {children}
        </Animated.View>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    // paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    // height: 40,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  closeImage: { height: 20, width: 20 },
});

export default ConfirmPopUp;
