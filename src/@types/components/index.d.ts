import { BottomSheetProps } from '@gorhom/bottom-sheet';

export interface ICustomBottomSheetProps extends BottomSheetProps {
  snapPoints: string[];
  openBSheet: boolean;
  setSheetState?: (_value: boolean) => void;
  backgroundStyle?: any;
  contentContainerStyle?: object;
  boxContainerStyle?: any;
  enablePanDownToClose?: any;
  title?: string;
  onClose?: () => void;
  children: React.ReactNode | React.ReactElement | string;
  options?: IBottomSheetOptions;
  cancelButton?: boolean;
  title?: string | ReactNode;
  enableHideIconClose?: boolean;
}
export interface ICustomFilterBottomSheetProps extends BottomSheetProps {
  title?: string;
  type?: string;
  handleClosePress?: () => void;
  handleParentClosePress?: () => void;
  handleSelectedFilterType?: (filterType: any) => void;
  children?: React.ReactNode | React.ReactElement | string;
  options?: IBottomSheetOptions;
  data?: any[];
}
export interface IOptionsBottomSheetProps extends BottomSheetProps {
  handleClosePress?: () => void;
  selectedItem?: object;
  handleSelectedItem?: (item: any) => void;
  children?: React.ReactNode | React.ReactElement | string;
  options?: IBottomSheetOptions;
  navigation?: any;
  onDelete?: () => void;
}
export interface ICustomBillPayFilterBottomSheetProps extends BottomSheetProps {
  handleClosePress?: () => void;
  handleSelectedFilterType?: (filterType: any) => void;
  selectOptions?: any;
  setSheetState?: any;
  children?: React.ReactNode | React.ReactElement | string;
  options?: IBottomSheetOptions;
}
export interface ICustomSymptomBottomSheetProps extends BottomSheetProps {
  title?: string;
  type?: string;
  handleClosePress?: () => void;
  handleSelectedFilterType?: (filterType: any) => void;
  selectOptions?: any;
  children?: React.ReactNode | React.ReactElement | string;
  options?: IBottomSheetOptions;
}
export interface ICustomSelectPetientBottomSheetProps extends BottomSheetProps {
  title?: string;
  handleClosePress?: () => void;
  patientsList?: object[];
  patientName?: string;
  setChangePatient?: (item: PatientItem) => void;
  setAddSheetState?: (open: boolean) => void;
  setEditSheetState?: (open: boolean) => void;
  setEditDetailsState?: Dispatch<SetStateAction<string>>;
  children?: React.ReactNode | React.ReactElement | string;
  options?: IBottomSheetOptions;
}
export interface ICustomEditPetientBottomSheetProps extends BottomSheetProps {
  editTitle?: string;
  handleClosePress?: () => void;
  setEditSheetState?: any;
  editDetails?: any;
  isEditOpen?: any;
  setIsEditOpen?: any;
  children?: React.ReactNode | React.ReactElement | string;
  options?: IBottomSheetOptions;
}
export interface ITestListBottomSheetProps extends BottomSheetProps {
  title?: string;
  testData?: any;
  handleDelete?: any;
  handleClosePress?: () => void;
  children?: React.ReactNode | React.ReactElement | string;
  options?: IBottomSheetOptions;
}
export interface ICustomSymptomsBottomSheetProps extends BottomSheetProps {
  handleClosePress?: () => void;
  handleSelectedFilterType?: (filterType: any) => void;
  setSheetState?: any;
  children?: React.ReactNode | React.ReactElement | string;
}

export interface ICustomMedicineBottomSheetProps extends BottomSheetProps {
  handleClosePress?: () => void;
  handleSelectedFilterType?: (filterType: any) => void;
  setSheetState?: any;
  children?: React.ReactNode | React.ReactElement | string;
}

export interface ICustomDeleteBottomSheetProps extends BottomSheetProps {
  handleClosePress?: () => void;
  handleDelete?: () => void;
  children?: React.ReactNode | React.ReactElement | string;
}

interface INavigationProps {
  navigation: {
    navigate: (_route: string, _params?: object) => void;
    goBack: () => void;
    setParams: (_params: object) => void;
  };
}

export interface IAbstractButton extends ViewStyle, TextStyle {
  children: React.ReactNode;
  onPress?(): void;
  onPress(): void;
  onLongPress?: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean;
  loader?: boolean;
  buttonStyle?: object;
  textStyle?: TextStyle;
  size?: number;
}
