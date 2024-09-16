import React from 'react';
import { Text } from 'react-native';
import Box from '../Box';
import { ScrollView } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory-native';
import { COLORS } from '../../constants';
import styles from '../../styles/component_styles/VictoryCharts.styles';

const VictoryLineChart = ({ dateRangeType, lineData }: any) => {
  const generateData = (startDate, hours) => {
    const data = [];
    let startTime = new Date(startDate);
    for (let i = 0; i < hours; i++) {
      data.push({ x: new Date(startTime.getTime()), y: Math.random() * 10 }); // Random y value
      startTime.setHours(startTime.getHours() + 1); // Increment time by one hour
    }
    return data;
  };

  const generateDataByRange = (range: string) => {
    let startDate;
    let hours;
    switch (range) {
      case 'Last 1 Month':
        startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 0, 0);
        hours = 24 * 30; // Assuming 30 days in a month
        break;
      case 'Last 6 Month':
        startDate = new Date(new Date().setMonth(new Date().getMonth() - 6)).setHours(0, 0, 0, 0);
        hours = 24 * 30 * 6; // Assuming 30 days in a month
        break;
      case 'Today':
        startDate = new Date().setHours(0, 0, 0, 0);
        hours = 24;
        break;
      default:
        startDate = new Date().setHours(0, 0, 0, 0);
        hours = 24;
        break;
    }
    return generateData(startDate, hours);
  };

  const dateRange = generateDataByRange(dateRangeType);
  const calculateTickValues = () => {
    const tickValues: any = [];
    const dataLength = dateRange.length;
    const tickCount = Math.min(dataLength, 12);
    const tickIndexes = [];
    for (let i = 0; i < tickCount; i++) {
      const index = Math.floor((i / (tickCount - 1)) * (dataLength - 1));
      tickIndexes.push(index);
    }

    tickIndexes.forEach((index) => {
      tickValues.push(dateRange[index].x);
    });

    return tickValues;
  };

  return (
    <>
      <ScrollView
        horizontal
        style={{ marginHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        <VictoryChart
          theme={VictoryTheme.material}
          padding={{ left: 50, right: 50, top: 20, bottom: 60 }}
          width={600}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => `${datum.x.toLocaleString()}, ${datum.y.toFixed(2)}`} // Display x and y values in the tooltip
              labelComponent={
                <VictoryTooltip
                  style={{ fontSize: '15px', fill: 'black' }}
                  cornerRadius={15}
                  pointerLength={10}
                  constrainToVisibleArea
                  flyoutStyle={{
                    stroke: 'transparent',
                    fill: COLORS.gray,
                  }}
                />
              }
              voronoiBlacklist={['white']}
            />
          }
        >
          {lineData?.length > 0 &&
            lineData?.map((item: any, index: number) => {
              return (
                <VictoryGroup
                  key={item?.id}
                  style={{ data: { stroke: item.color, strokeWidth: 4 } }}
                  data={item.item}
                  color="blue"
                >
                  <VictoryLine
                    style={{ data: { stroke: item.color, strokeWidth: 4 } }}
                    data={item.item}
                  />
                  <VictoryScatter
                    name="white"
                    data={item.item}
                    size={5} // adjust the size of scatter points as needed
                    style={{ data: { fill: 'white' } }} // change fill color according to the line color
                    labelComponent={<VictoryTooltip pointerLength={20} />}
                  />
                  {/* Line */}
                </VictoryGroup>
              );
            })}
          {/* X-axis with time */}
          {dateRange?.length > 0 && (
            <VictoryAxis
              tickFormat={(x) => {
                const date = new Date(x);
                const day = date?.getDate();
                const month = date?.getMonth() + 1; // Month is zero-indexed, so we add 1
                const hour = date?.getHours() > 12 ? date.getHours() - 12 : date?.getHours();
                const minute = date?.getMinutes().toString().padStart(2, '0'); // Ensure minutes are always two digits
                const ampm = date?.getHours() >= 12 ? 'PM' : 'AM'; // Determine whether it's AM or PM
                const formattedDate = `${day}/${month}`;
                return formattedDate ? `${formattedDate} ${hour}:${minute} ${ampm}` : '';
              }}
              tickValues={calculateTickValues()}
              style={{
                tickLabels: styles.AxisTickLabel,
              }}
            />
          )}
          {/* Y-axis */}
          <VictoryAxis
            dependentAxis
            tickValues={[10, 50, 100, 150, 250, 500, 600, 700, 800, 900, 1000]}
          />
        </VictoryChart>
      </ScrollView>
      <Box style={styles.lineDataBox}>
        {lineData?.length > 0 &&
          lineData?.map((item: any) => (
            <Box style={styles.lineDataRenderBoxmain} key={item?.id.toLocaleString()}>
              <Box
                style={[
                  styles.lineDataRenderBoxSub,
                  {
                    backgroundColor: item.color,
                  },
                ]}
              />
              <Text style={styles.lineDataRenderBoxText}>{item?.name}</Text>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default VictoryLineChart;
