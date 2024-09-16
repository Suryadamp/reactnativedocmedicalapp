import { Text } from 'react-native';
import React from 'react';
import { Box } from '../../components';
import { ITestListBottomSheetProps } from '../../@types/components';
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../styles/BookTest.styles';
import { useScrollEndDetection } from '../../hooks/useLogs';
const testPreparationList = [
  {
    id: 1,
    testPrepName: 'Fasting is required about 10 - 12 hours before the sample collection.',
  },
  { id: 2, testPrepName: 'Consumption of water is permitted.' },
];

const TestPreparationBottomSheet: React.FC<ITestListBottomSheetProps> = () => {
  const { handleScroll } = useScrollEndDetection();
  const TestListRender = ({ item }: any) => {
    return (
      <Box display="flex" flexDirection="row">
        <Box style={styles.textBoxStyle} />
        <Text style={styles.testNameStyle}>{item?.testPrepName}</Text>
      </Box>
    );
  };
  return (
    <>
      <Box style={styles.container}>
        <Box margin={1}>
          <FlatList
            data={testPreparationList}
            onScroll={handleScroll}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({ item, index }) => <TestListRender item={item} key={index?.toString()} />}
          />
        </Box>
      </Box>
    </>
  );
};

export default TestPreparationBottomSheet;
