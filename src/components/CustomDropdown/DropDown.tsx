import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants';
import Box from '../Box';

interface DropdownProps {
  data?: { name: string }[];
  value?: { name: string };
  onSelect?: (c: { name: string }) => void;
  label?: string;
  setOpen: (value: boolean) => void;
}

interface Symptom {
  value: string;
  name: string;
}

export default function Dropdown({
  data = [],
  value = undefined,
  onSelect = () => {},
  label,
  setOpen,
}: DropdownProps) {
  const [showOption, setShowOption] = useState(false);
  const [searchingtext] = useState(false);
  const [filterdata, setFilterdata] = useState<{ name: string }[]>([]);
  const onSelectedItem = (c: Symptom | undefined) => {
    setShowOption(false);
    setOpen(false);
    if (c) {
      onSelect({ name: c.name });
    }
  };
  return (
    <Box style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setShowOption(!showOption);
          setFilterdata(data);
          setOpen(!showOption);
        }}
        style={styles.dropdownContainer}
        activeOpacity={0.8}
      >
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          <Text style={styles.dropDownText}>{value ? value?.name : `${label}`}</Text>
        </Box>
        <Icon
          style={{ transform: [{ rotate: showOption ? '180deg' : '0deg' }] }}
          name="chevron-down"
          size={30}
          color="#BABABA"
        />
      </TouchableOpacity>
      {showOption && (
        <Box style={styles.itemContainer}>
          <ScrollView>
            {!searchingtext &&
              data.map((d, i) => {
                return (
                  <TouchableOpacity
                    key={String(i)}
                    onPress={() => onSelectedItem(d)}
                    style={styles.item}
                  >
                    <Text style={styles.selectItemText}>{d.name}</Text>
                    <View
                      style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            {searchingtext &&
              filterdata.map((d, i) => {
                return (
                  <TouchableOpacity
                    key={String(i)}
                    onPress={() => onSelectedItem(d)}
                    style={styles.item}
                  >
                    <Text style={styles.selectItemText}>{d.name}</Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </Box>
      )}
    </Box>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 1,
  },
  dropdownContainer: {
    padding: 10,
    height: 56,
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.background.primary,
    flexDirection: 'row',
    zIndex: -5,
  },
  itemContainer: {
    padding: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  item: {
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchField: {
    width: 300,
    height: 50,
    borderWidth: 1,
  },
  search: {
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
  },
  dropDownText: { fontSize: 16, color: '#232323', fontWeight: '400' },
  selectItemText: { marginLeft: 10 },
});
