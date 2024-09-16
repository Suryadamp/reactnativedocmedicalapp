import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { AppContainer } from '../../components';
import { COLORS } from '../../constants/theme';

const ReportDocsList = () => {
  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <Text>ReportDocsList</Text>
    </AppContainer>
  );
};

export default ReportDocsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background.white,
  },
});
