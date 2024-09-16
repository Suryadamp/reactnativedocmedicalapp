import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Box } from '../../components';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import Dropdown from '../CustomDropdown/DropDown';
import { ScrollView } from 'react-native-gesture-handler';
interface NavigateProps {
  navigation?: any;
  route?: any;
  header?: string;
}
type Props = NavigateProps;

interface Symptom {
  value?: string;
  name: string;
}

const FormComponent = ({ navigation, header }: Props) => {
  const Symptoms = [
    {
      value: '1',
      name: 'Blood Thinner',
    },
    {
      value: '2',
      name: 'Fever',
    },
    {
      value: '3',
      name: 'sick',
    },
    {
      value: '4',
      name: 'Blood',
    },
  ];
  const Units = [
    {
      value: '1',
      name: 'mg',
    },
    {
      value: '2',
      name: 'g',
    },
    {
      value: '3',
      name: 'ml',
    },
    {
      value: '4',
      name: 'cc',
    },
  ];

  const [symptomsItem, setSymptomsItem] = useState<Symptom | undefined>(undefined);
  const [unitsItem, setUnitsItem] = useState<Units | undefined>(undefined);
  const [symptomOpen, setSymptomOpen] = useState(false);
  const [unitOpen, setUnitOpen] = useState(false);

  const onSymptomSelect = (item: Symptom) => {
    setSymptomsItem(item as Symptom);
  };
  const onUnitsSelect = (item: Units) => {
    setUnitsItem(item as Units);
  };
  return (
    <Box style={styles.container}>
      <StatusBar backgroundColor={COLORS.background.white} barStyle={'dark-content'} />
      <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={assets.Back} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Add {header}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              //   navigation.navigate("CreateRemainder");
            }}
          ></TouchableOpacity>
        </Box>
      </Box>
      <ScrollView>
        <Box alignItems="center" marginTop={20}>
          <Box width={SIZES.screenWidth - 36} height={symptomOpen ? 180 : 56}>
            <Dropdown
              label="Select Symptoms"
              data={Symptoms}
              onSelect={onSymptomSelect}
              value={symptomsItem}
              setOpen={setSymptomOpen}
            />
          </Box>
          <Box height={56} marginTop={10}>
            <TextInput
              label="MedicineName"
              mode="outlined"
              placeholderTextColor={'grey'}
              placeholder={'MedicineName'}
              style={styles.medicineInputTxt}
              outlineColor={COLORS.background.primary}
              activeOutlineColor={COLORS.background.primary}
              theme={{
                colors: {
                  primary: COLORS.gray,
                  underlineColor: 'transparent',
                  background: 'white',
                },
                roundness: SIZES.padding * 1.5,
              }}
            />
          </Box>
          <Box marginTop={20}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width={SIZES.screenWidth - 36}
            >
              <Box>
                <TextInput
                  label="Dosage"
                  mode="outlined"
                  placeholderTextColor={'grey'}
                  placeholder={'Dosage'}
                  style={styles.dosageInputTxt}
                  outlineColor={COLORS.background.primary}
                  activeOutlineColor={COLORS.background.primary}
                  theme={{
                    colors: {
                      primary: COLORS.gray,
                      underlineColor: 'transparent',
                      background: COLORS.background.secondary,
                    },
                    roundness: SIZES.padding * 1.5,
                  }}
                />
              </Box>
              <Box width={SIZES.screenWidth * 0.25} height={unitOpen ? 220 : 56}>
                <Dropdown
                  label="Units"
                  data={Units}
                  onSelect={onUnitsSelect}
                  value={unitsItem}
                  setOpen={setUnitOpen}
                />
              </Box>
            </Box>
          </Box>
          <TextInput
            label="Frequency"
            mode="outlined"
            value="how many times a day"
            placeholder={'how many times a day'}
            style={styles.frequency}
            editable={false}
            outlineColor={COLORS.background.primary}
            activeOutlineColor={COLORS.background.primary}
            theme={{
              colors: {
                primary: COLORS.gray,
                underlineColor: 'transparent',
                background: COLORS.background.secondary,
              },
              roundness: SIZES.padding * 1.5,
            }}
          />
          <TextInput
            label="Schedule"
            mode="outlined"
            placeholder={'Select Schedule'}
            editable={false}
            value="Select schedule"
            textColor="grey"
            style={styles.scheduleInputTxt}
            outlineColor={COLORS.background.primary}
            activeOutlineColor={COLORS.background.primary}
            //   onChangeText={(Schedule) => setEmail(email)}
            right={
              <TextInput.Icon
                style={styles.scheduleInputIcon}
                iconColor={COLORS.placeHolder}
                icon="chevron-down"
              />
            }
            theme={{
              colors: {
                primary: COLORS.gray,
                underlineColor: 'transparent',
                background: COLORS.background.secondary,
              },
              roundness: SIZES.padding * 1.5,
            }}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default FormComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.grey,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  topBarTitle: {
    ...FONTS.h4,
    width: '75%',
    marginStart: 20,
  },
  icon: {
    height: 15,
    width: 20,
  },
  addIcon: {
    height: 25,
    width: 25,
  },
  sectionContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  section: {
    ...FONTS.text,
  },
  messageText: {
    ...FONTS.text,
    fontSize: 8,
    textAlign: 'center',
    width: 300,
  },
  sectionBorderStyle: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 3,
    width: '30%',
  },
  noAppointment: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  medicineInputTxt: {
    width: SIZES.screenWidth - 36,
    height: 56,
    marginVertical: 5,
  },
  dosageInputTxt: {
    width: SIZES.screenWidth * 0.6,
    height: 56,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  dosageIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 4,
  },
  unitInputTxt: {
    // width: SIZES.screenWidth - 250,
    // height: 56,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  unitInputIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 4,
  },
  frequency: {
    width: SIZES.screenWidth - 36,
    height: 56,
    marginVertical: 5,
    backgroundColor: 'white',
    marginTop: 15,
  },
  frequencyIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 4,
  },
  scheduleInputTxt: {
    width: SIZES.screenWidth - 36,
    height: 56,
    marginVertical: 5,
    backgroundColor: 'white',
    marginTop: 15,
  },
  scheduleInputIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 4,
  },
});
