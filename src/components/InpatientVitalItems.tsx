// Admin - VitalsItem
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { strings } from '../i18n';
import { Box } from '../components';
import { COLORS, SIZES } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../styles/Inpatients/InpatientRegistration.styles';

function splitToColumns(items: any[], isShowAdd: boolean) {
  const newItems = [...items];
  const itemsPerColumn = Math.ceil(newItems.length / 2);
  const columns = [];

  for (let i = 0; i < 2; i++) {
    const startIndex = i * itemsPerColumn;
    let endIndex = startIndex + itemsPerColumn;

    // If it's the last column, adjust the endIndex to the length of newItems
    if (i === 1) {
      endIndex = newItems.length;
    }

    columns.push(newItems.slice(startIndex, endIndex));
  }

  if (isShowAdd) {
    if (columns[0].length === columns[1].length) {
      columns[0].push({ id: 'add', name: 'Add' });
    } else {
      columns[1].push({ id: 'add', name: 'Add' });
    }
  }

  return columns;
}

export const InpatientVitalsItem = (props: any) => {
  const { state, doctorVitals, isShowAdd, onChange, onChangeDiagInfo, onAdd } = props;
  const [columns, setColumns] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [diagInfo, setDiagInfo] = useState<string>('');

  useEffect(() => {
    setColumns(splitToColumns(doctorVitals, isShowAdd));
    setIsLoading(false);
  }, [doctorVitals, isShowAdd]);

  return (
    <View>
      {isLoading && <Text />}
      {!isLoading && (
        <ScrollView>
          {columns.length > 0 && (
            <Box style={styles.containerVitalItem}>
              <Box style={styles.column1}>
                {columns[0]?.map((column: any) => (
                  <View>
                    {column.id !== 'add' ? (
                      <View>
                        <TextInput
                          label={column?.name}
                          mode="outlined"
                          keyboardType="number-pad"
                          value={
                            state.vitals.find(
                              (item: any) => item?.vital_id === column?.id,
                            )
                              ? state.vitals.find(
                                  (item: any) => item?.vital_id === column?.id,
                                ).vital_value
                              : ''
                          }
                          style={styles.inputTxt1}
                          outlineColor={COLORS.white_smoke}
                          onChangeText={(value) => {
                            onChange(column, value);
                          }}
                          activeOutlineColor={COLORS.background.primary}
                          theme={{
                            colors: {
                              primary: COLORS.gray,
                              background: COLORS.background.secondary,
                              onSurfaceVariant: '#8A8A8A',
                            },
                            roundness: SIZES.padding * 0.8,
                          }}
                        />
                        <View style={{ position: 'absolute', right: 10, top: 30 }}>
                          {column?.unit === 'kg/m<sup>2</sup>' ? (
                            <Text style={{ color: '#8A8A8A', fontSize: 11 }}>kg/m²</Text>
                          ) : (
                            <Text style={{ color: '#8A8A8A', fontSize: 11 }}>
                              {column?.unit}
                            </Text>
                          )}
                        </View>
                      </View>
                    ) : (
                      <TouchableOpacity style={styles.btnItem} onPress={onAdd}>
                        <Text style={styles.addTxt}>{strings.displayText.add}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </Box>
              <Box style={styles.column2}>
                {columns[1].map((column: any) => (
                  <View>
                    {column.id !== 'add' ? (
                      <View>
                        <TextInput
                          label={column?.name}
                          mode="outlined"
                          keyboardType="number-pad"
                          style={styles.inputTxt1}
                          value={
                            state.vitals.find(
                              (item: any) => item.vital_id === column?.id,
                            )
                              ? state.vitals.find(
                                  (item: any) => item.vital_id === column?.id,
                                ).vital_value
                              : ''
                          }
                          outlineColor={COLORS.white_smoke}
                          activeOutlineColor={COLORS.background.primary}
                          onChangeText={(value) => onChange(column, value)}
                          theme={{
                            colors: {
                              primary: COLORS.gray,
                              background: COLORS.background.secondary,
                              onSurfaceVariant: '#8A8A8A',
                            },
                            roundness: SIZES.padding * 0.8,
                          }}
                        />
                        <View style={{ position: 'absolute', right: 10, top: 30 }}>
                          {column?.unit === 'kg/m<sup>2</sup>' ? (
                            <Text style={styles.unitSizeText}>kg/m²</Text>
                          ) : (
                            <Text style={styles.unitSizeText}>{column?.unit}</Text>
                          )}
                        </View>
                      </View>
                    ) : (
                      <TouchableOpacity style={styles.btnItem} onPress={onAdd}>
                        <Text style={styles.addTxt}>{strings.displayText.add}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </Box>
            </Box>
          )}
          <Box style={styles.desScriptionBox}>
            <Text style={styles.title}>{strings.displayText.diagnosisInformation}</Text>
            <TextInput
              label={'Description'}
              mode="outlined"
              multiline
              style={styles.descriptionStyle}
              outlineColor={COLORS.white_smoke}
              activeOutlineColor={COLORS.background.primary}
              value={diagInfo}
              onChangeText={(value) => {
                console.log(value);
                setDiagInfo(value);
                // onChangeDiagInfo(value);
              }}
              theme={{
                colors: {
                  primary: COLORS.gray,
                  background: COLORS.background.secondary,
                  onSurfaceVariant: '#8A8A8A',
                },
                roundness: SIZES.padding * 0.8,
              }}
            />
          </Box>
        </ScrollView>
      )}
    </View>
  );
};

export default InpatientVitalsItem;
