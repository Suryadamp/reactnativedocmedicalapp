import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import FormComponent from '../../../components/CustomForm';
import { RootStackParamList } from '../../../navigation/types';
interface NavigateProps {
  navigation?: any;
  route?: any;
}
type Props = NativeStackScreenProps<RootStackParamList> & NavigateProps;

export default function CreateRemainder({ navigation }: Props) {
  // const [, setSelectedItem] = useState(null);
  // const onSelect = (item: React.SetStateAction<null>) => {
  //   setSelectedItem(item);
  // };
  return (
    <>
      <FormComponent navigation={navigation} header={'Remainder'} />
    </>
  );
}

// const styles = StyleSheet.create({
//   noAppointment: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   section: {
//     ...FONTS.text,
//   },
//   messageText: {
//     ...FONTS.text,
//     fontSize: 8,
//     textAlign: 'center',
//     width: 300,
//   },
// });
