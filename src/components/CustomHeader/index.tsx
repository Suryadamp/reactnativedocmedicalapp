import { Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Box from '../Box';
import { COLORS, assets } from '../../constants';
import styles from '../../styles/component_styles/CustomHeader.styles';
import { AnimatedIconButton } from '../AnimatedIconButton';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconButton from '../IconButton';
import { useNetInfo } from "@react-native-community/netinfo";

type HeaderProps = {
  leftIcon?: 'back' | 'hamburger' | 'menu' | string;
  rightIconType?: 'bell' | 'materialCommunity' | 'ionicon' | 'other' | string;
  rightIcon?: any;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  title?: string;
  textColor?: string;
  permission?: boolean;
  hasDivider?: boolean;
  iconColor?: string;
  iconSize?: number;
};

const CustomHeader = ({
  leftIcon,
  rightIconType,
  rightIcon,
  title,
  permission,
  hasDivider = false,
  textColor,
  iconColor,
  iconSize,
  onLeftIconPress,
  onRightIconPress,
}: HeaderProps) => {
  const { type, isConnected } = useNetInfo()

  const renderRightIcon = () => {
    switch (rightIconType) {
      case 'bell':
        return <Image source={assets.Notification} style={styles.iconStyle} />;
      case 'materialCommunity':
        return (
          <AnimatedIconButton
            type="materialCommunity"
            name={rightIcon}
            color={COLORS.text}
            size={hp(3)}
            onPress={onRightIconPress}
          />
        );
      case 'ionicon':
        return (
          <AnimatedIconButton
            type="ionicon"
            name={rightIcon}
            color={COLORS.text}
            size={hp(3)}
            onPress={onRightIconPress}
          />
        );
      default:
        return <Image source={rightIcon} style={styles.iconStyle} />;
    }
  };

  const renderLeftIcon = () => {
    if (leftIcon === 'back') {
      return (
        <AnimatedIconButton
          type="ionicon"
          name="arrow-back"
          color={COLORS.text}
          size={hp(2)}
          onPress={onLeftIconPress}
        />
      );
    } else {
      return (
        <AnimatedIconButton
          type="materialCommunity"
          name="menu"
          color={COLORS.text}
          size={hp(2)}
          onPress={onLeftIconPress}
        />
      );
    }
  };

  return (
    <Box style={[styles.headerContainer, hasDivider ? { borderBottomWidth: 1 } : {}]}>
      <IconButton name={leftIcon || ''} onClick={onLeftIconPress} />
      <Text style={[styles.titleStyle, { color: textColor }]}>{title}</Text>
      {rightIconType !== 'text' && rightIcon ? (
        <>
          {permission && isConnected && rightIcon == 'plus' ? (
            <Box style={styles.addContainer}>
              <IconButton
                type={rightIconType || ''}
                name={rightIcon || ''}
                iconColor={COLORS.background.primary}
                size={styles.iconStyle.height}
                onClick={onRightIconPress}
              />
            </Box>
          ) : rightIcon !== 'plus' ? (
            <IconButton
              type={rightIconType || ''}
              name={rightIcon || ''}
              iconColor={iconColor || COLORS.background.primary}
              size={iconSize || styles.imageStyle.height}
              onClick={onRightIconPress}
            />
          ) : (
            <Box />
          )}
        </>
      ) : rightIconType == 'text' ? (
        <TouchableOpacity
          hitSlop={{ bottom: 50, top: 50, right: 50, left: 50 }}
          activeOpacity={0.8}
          onPress={onRightIconPress}
        >
          <Text style={styles.rightText}>{isConnected && rightIcon}</Text>
        </TouchableOpacity>
      ) : (
        <Box />
      )}
    </Box>
  );
};

export default CustomHeader;
