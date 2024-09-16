// Admin - MenuBottomSheet
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import { COLORS } from '../../../constants';
import { SvgIcon } from '../../../constants/SvgIcon';
import { Box } from '../../../components';
import { UsePermission } from '../../../hooks/usePermissionCheck';
import { permissionList } from '../../../constants/ApiConstants';

const MenuBottomSheet = ({ appointment, onCancel, onReschedule, onInvoice }: any) => {
  const copyToClipboard = () => {
    Clipboard.setString('04242236989');
  };

  return (
    <ScrollView>
      <Box style={styles.container}>
        {!appointment.arrived && UsePermission(permissionList.mobileAppointmentsReschedule) && (
          <>
            <TouchableOpacity style={styles.bsItem} onPress={onReschedule}>
              <SvgIcon name="CalendarIcon" />
              <Text style={styles.title}>Reschedule Appointment</Text>
            </TouchableOpacity>
            <Box style={styles.divider} />
          </>
        )}
        {appointment.status !== 2 &&
          !appointment.out &&
          UsePermission(permissionList.mobileAppointmentsCancel) && (
            <>
              <TouchableOpacity style={styles.bsItem} onPress={onCancel}>
                <SvgIcon name="CancelIcon" />
                <Text style={styles.title}>Cancel Appointment</Text>
              </TouchableOpacity>
              <Box style={styles.divider} />
            </>
          )}
        {appointment.status !== 2 && UsePermission(permissionList.mobileAppointmentsInvoice) && (
          <>
            <TouchableOpacity style={styles.bsItem} onPress={onInvoice}>
              <SvgIcon name="MenuInvoiceIcon" />
              <Text style={styles.title}>Invoice</Text>
            </TouchableOpacity>
            <Box style={styles.divider} />
          </>
        )}
        {UsePermission(permissionList.mobileAppointmentsSupport) && (
          <TouchableOpacity style={styles.bsItem} onPress={copyToClipboard}>
            <SvgIcon name="HeadsetIcon" />
            <Text style={styles.title}>Support</Text>
          </TouchableOpacity>
        )}
      </Box>
    </ScrollView>
  );
};
export default MenuBottomSheet;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 15,
    color: '#232323',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  bsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
    marginTop: 10,
  },
});
