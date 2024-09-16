import { Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { Box } from '../../components';
import { assets } from '../../constants';
import { ITestListBottomSheetProps } from '../../@types/components';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import styles from '../../styles/BookTest.styles';
import { useScrollEndDetection } from '../../hooks/useLogs';

const TestSelectBottomSheet: React.FC<ITestListBottomSheetProps> = ({ testData, handleDelete }) => {
  const { handleScroll } = useScrollEndDetection();
  const TestListRender = ({ item }: any) => {
    return (
      <>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginVertical={10}
          key={item?.id.toString()}
        >
          <Text style={styles.testNameStyle}>{item?.name}</Text>
          <TouchableOpacity
            onPress={() => {
              handleDelete(item?.id);
            }}
          >
            <Image style={styles.deleteIcon} source={assets.deleteRed} />
          </TouchableOpacity>
        </Box>
        <Box style={styles.divider} />
      </>
    );
  };

  return (
    <>
      <Box style={styles.container}>
        <Box height={'100%'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={testData}
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

export default TestSelectBottomSheet;
