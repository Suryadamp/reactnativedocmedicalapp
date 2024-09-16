// IconButton
import React from 'react';
import { Image, TouchableOpacity, GestureResponderEvent } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { assets } from '../../constants';
import { SvgIcon } from '../../constants/SvgIcon';
import styles from '../../styles/component_styles/IconButton.styles';

type IconButtonProps = {
  type?: 'image' | 'icon' | string;
  name: string;
  iconColor?: string;
  isMaterial?: boolean;
  size?: number;
  style?: any;
  hitSlop?: any;
  onClick?: (data?: any) => void;
};

const IconButton = ({
  type = 'icon',
  name,
  size,
  iconColor,
  isMaterial = true,
  style,
  hitSlop,
  onClick,
}: IconButtonProps) => {
  const handleClick = (event: GestureResponderEvent) => {
    if (onClick) {
      event.stopPropagation();
      onClick();
    }
  };

  if (type === 'image') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.iconContainer, style]}
        hitSlop={hitSlop || { bottom: 50, top: 50, right: 50, left: 50 }}
        onPress={handleClick}
      >
        <Image
          source={assets[name]}
          style={[name == 'EditBlue' ? styles.editImageSize : styles.imageSize]}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.iconContainer, style]}
      hitSlop={hitSlop || { bottom: 50, top: 50, right: 50, left: 50 }}
      onPress={handleClick}
    >
      {!isMaterial ? (
        <SvgIcon name={name} />
      ) : (
        <MaterialCommunityIcons
          name={name}
          size={size || styles.iconSize.height}
          color={iconColor || '#232323'}
        />
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
