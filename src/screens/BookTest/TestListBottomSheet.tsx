import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Box } from '../../components';
import { COLORS, FONTS } from '../../constants';
import { ITestListBottomSheetProps } from '../../@types/components';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import styles from '../../styles/BookTest.styles';
import { useScrollEndDetection } from '../../hooks/useLogs';

const TestListBottomSheet: React.FC<ITestListBottomSheetProps> = ({ testData }) => {
  const { handleScroll } = useScrollEndDetection();
  const TestListRender = ({ item }: any) => {
    return (
      <>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginHorizontal={20}
          marginVertical={10}
        >
          <Text style={styles.testNameStyle}>{item?.test_name}</Text>
        </Box>
        <Box style={styles.testListDivider} />
      </>
    );
  };

  return (
    <>
      <Box style={styles.testListContainer}>
        <Box height={'100%'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={testData?.lab_tests}
              onScroll={handleScroll}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TestListRender item={item} index={index} key={index?.toString()} />
              )}
            />
          </ScrollView>
        </Box>
      </Box>
    </>
  );
};

export default TestListBottomSheet;

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//   },
//   boxContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 20,
//   },

//   closeXStyle: {
//     width: 16,
//     height: 16,
//   },
//   titleText: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 20,
//     lineHeight: 24,
//     textAlign: 'left',
//     color: COLORS.black,
//   },
//   subTitleText: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 10,
//     lineHeight: 24,
//     textAlign: 'left',
//     marginLeft: 2,
//     color: COLORS.background.primary,
//   },
//   divider: {
//     borderBottomWidth: 1,
//     borderColor: COLORS.grey_E5E5E5,
//     marginTop: 5,
//   },
//   testNameStyle: {
//     color: COLORS.dim_grey,
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 14,
//     fontWeight: '400',
//   },
// });
