import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useBackHandler } from '@react-native-community/hooks';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';
import { ICustomBottomSheetProps } from '../../@types';
import { COLORS, assets } from '../../constants';
import styles from '../../styles/component_styles/CustomBottomSheet.styles';
import Box from '../Box';
import { AnimatedIconButton } from '../AnimatedIconButton';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isHpTablet } from '../../hooks/useDeviceCheck';

export const CustomBackdrop = (props: BottomSheetBackdropProps) => {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.4}
      style={[Platform.OS === 'ios' ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]}
    />
  );
};

const CustomBottomSheet = (props: ICustomBottomSheetProps): JSX.Element => {
  const {
    snapPoints,
    openBSheet,
    setSheetState,
    backgroundStyle,
    contentContainerStyle,
    boxContainerStyle,
    enablePanDownToClose,
    children,
    title,
    enableHideIconClose,
    enableDynamicSizing = Platform.OS === 'ios' ? false : false,
  }: any = props;

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      index === 0 ? setSheetState(true) : setSheetState(false);
    },
    [setSheetState],
  );

  // hooks
  const sheetRef = useRef<BottomSheet>(null);
  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setSheetState(false);
  }, [setSheetState]);

  useFocusEffect(
    useCallback(() => {
      if (openBSheet) {
        handleSnapPress(0);
      } else {
        handleClosePress();
      }
    }, [handleClosePress, handleSnapPress, openBSheet]),
  );

  useBackHandler(
    useCallback(() => {
      sheetRef.current?.close();
      setSheetState(false);
      return true;
    }, [setSheetState]),
  );

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        index={openBSheet ? 0 : -1}
        snapPoints={snapPoints ? snapPoints : ['25%', '50%', '75%']}
        enablePanDownToClose={enablePanDownToClose ? enablePanDownToClose : false}
        backgroundStyle={backgroundStyle ? backgroundStyle : styles.backgroundStyle}
        enableContentPanningGesture={false}
        backdropComponent={CustomBackdrop}
        enableDynamicSizing={enableDynamicSizing}
        onChange={handleSheetChanges}
        detached={true}
        bottomInset={5}
        handleStyle={styles.handle}
        handleIndicatorStyle={[styles.handleIndicator, { backgroundColor: COLORS.gray }]}
      >
        <BottomSheetScrollView
          contentContainerStyle={
            contentContainerStyle ? contentContainerStyle : styles.contentContainer
          }
        >
          {title && (
            <Box>
              <Box style={boxContainerStyle ? boxContainerStyle : styles.boxContainer}>
                {typeof title === 'string' ? <Text style={styles.titleText}>{title}</Text> : title}
                {!enableHideIconClose ? (
                  <AnimatedIconButton
                    type="materialCommunity"
                    name="close-circle"
                    color={COLORS.text}
                    size={isHpTablet(3)}
                    onPress={handleClosePress}
                  />
                ) : null}
              </Box>
            </Box>
          )}
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

export default CustomBottomSheet;
