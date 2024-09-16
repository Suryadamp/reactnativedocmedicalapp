// MedicalRecords - MenuBottomSheet
import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import { COLORS } from '../../../constants';
import { SvgIcon } from '../../../constants/SvgIcon';
import { Box } from '../../../components';
import { UsePermission } from '../../../hooks/usePermissionCheck';
import { permissionList } from '../../../constants/ApiConstants';
import styles from '../../../styles/MedicalRecords.styles';

export const MenuBottomSheet = ({ onShare, onDelete }: any) => {
  return (
    <ScrollView>
      <Box style={styles.container}>
        {/* <TouchableOpacity style={styles.bsItem} onPress={onEdit}>
          {isEdit && <SvgIcon name="EditIcon" />}
          {!isEdit && <MaterialCommunityIcons name="eye" />}
          <Text style={styles.title}>{isEdit ? 'Edit' : 'View'}</Text>
        </TouchableOpacity> */}
        {/* <Box style={styles.divider} /> */}
        {UsePermission(permissionList.moibileMediRecordShare) && (
          <>
            <TouchableOpacity style={styles.bsItem} onPress={onShare}>
              <SvgIcon name="ShareIcon" />
              <Text style={styles.title}>Share</Text>
            </TouchableOpacity>
            <Box style={styles.divider} />
          </>
        )}
        {UsePermission(permissionList.moibileMediRecordDelete) && (
          <TouchableOpacity style={styles.bsItem} onPress={onDelete}>
            <SvgIcon name="TrashIcon" />
            <Text style={[styles.title, { color: COLORS.danger }]}>Delete</Text>
          </TouchableOpacity>
        )}
      </Box>
    </ScrollView>
  );
};
export default MenuBottomSheet;
