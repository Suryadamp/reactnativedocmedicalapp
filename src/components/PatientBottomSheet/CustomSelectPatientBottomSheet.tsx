import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, Keyboard, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ICustomSelectPetientBottomSheetProps } from '../../@types/components';
import { TextInput } from 'react-native-paper';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';

import { AbstractButton, Box } from '../../components';
import { COLORS, assets } from '../../constants';
import { strings } from '../../i18n';
import CustomRadioButton from '../../components/CustomRadioButton';
import { RootState } from '../../state';
import { useSelector } from 'react-redux';
import styles from '../../styles/component_styles/PatientBottomSheet.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import { getPatientsList } from '../../service/Patients';
import CustomActivityIndicator from '../CustomActivityIndicator';
import { useScrollEndDetection } from '../../hooks/useLogs';

const CustomSelectPatientBottomSheet: React.FC<ICustomSelectPetientBottomSheetProps> = ({
  patientsList,
  patientName,
  setChangePatient,
  setAddSheetState,
  setEditSheetState,
  setEditDetailsState,
  sheetRef,
}) => {
  const { tempPatientList } = useSelector((state: RootState) => state.patients);
  /* const userList = [
    ...patientsList,
    ...(tempPatientList?.length > 0 ? tempPatientList : []),
  ].filter(Boolean); */
  const { handleScroll } = useScrollEndDetection();
  const [checkedName, setCheckedName] = useState(patientName);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [clearIconPressed, setClearIconPressed] = useState(false);

  const searchInputRef = useRef(null);
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  useEffect(() => {
    setCheckedName(patientName);
  }, [patientName]);

  useEffect(() => {
    setUserData(
      [...patientsList, ...(tempPatientList?.length > 0 ? tempPatientList : [])].filter(Boolean),
    );
  }, [patientsList, tempPatientList]);

  const handleRadioPress = (item: any) => {
    setCheckedName(item?.name);
    setChangePatient?.(item);
  };

  const handleCraetePatient = () => {
    setAddSheetState?.(true);
  };

  const handleEditPatient = (item: any) => {
    setEditSheetState?.(true);
    setEditDetailsState?.(item);
  };

  const handlePatientsList = async () => {
    if (loader) {
      return;
    }
    setLoader(true);
    if (page <= totalPage) {
      await getPatientsList({ page: page + 1, search: searchText })
        .then((response) => {
          setUserData([...userData, ...response?.data?.data]);
          setTotalPage(response.data?.last_page);
          setPage(response?.data?.current_page);
          setLoader(false);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setLoader(false);
        });
    } else {
      setLoader(false);
    }
  };

  const handleClear = async () => {
    sheetRef.current.collapse();
    // searchInputRef?.current?.blur();
    await setSearchText('');
    handleSearch('clear');
  };

  const handleSearch = async (type: string) => {
    setLoader(true);
    sheetRef.current.collapse();
    await getPatientsList({ search: typeof type === 'string' ? '' : searchText })
      .then((response) => {
        console.log({ response: response.data.data });
        setUserData([...response?.data?.data]);
        setLoader(false);
      })
      .catch((error) => {
        console.error('Error in search data: ', error);
        setLoader(false);
      });
  };

  const handleOnFocus = useCallback(
    (event: any) => {
      shouldHandleKeyboardEvents.value = Platform.OS === 'ios';
    },
    [shouldHandleKeyboardEvents],
  );

  const handleOnBlur = useCallback(
    (event: any) => {
      shouldHandleKeyboardEvents.value = false;
    },
    [shouldHandleKeyboardEvents],
  );

  const selectPatientDetials = ({ item }: { item: any; index: number }) => {
    return (
      <>
        <TouchableOpacity
          style={styles.selectBoxContainer}
          onPress={() => {
            handleRadioPress(item);
          }}
        >
          <Box style={styles.selectContainer}>
            <Box style={styles.selectTextBoxStyle}>
              <Text style={styles.selectTextStyle}>{item?.name?.slice(0, 1)}</Text>
            </Box>
            <Box style={styles.selectMarginLeftStyle}>
              <Text style={styles.nameTextStyle}>{item?.name}</Text>
              <Text style={styles.noTextStyle}>{item?.mobile}</Text>
              {UsePermission(permissionList?.mobileEditPatient) && (
                <TouchableOpacity
                  // style={styles.editBtn}
                  onPress={(event) => {
                    event.stopPropagation();
                    handleEditPatient?.(item);
                  }}
                >
                  <Box display="flex" flexDirection="row">
                    <Text style={styles.editTxtStyle}>{strings.displayText.edit}</Text>
                    <Icon
                      name="edit"
                      size={styles.iconMarginStyle.height}
                      color={COLORS.background.primary}
                      style={styles.iconMarginStyle}
                    />
                  </Box>
                </TouchableOpacity>
              )}
            </Box>
          </Box>
          <Box>
            <CustomRadioButton
              // value={item.name}
              color={checkedName === item?.name ? COLORS.background.primary : '#8A8A8A'}
              status={checkedName === item?.name ? 'checked' : 'unchecked'}
              onPress={() => {
                handleRadioPress(item);
              }}
            />
          </Box>
        </TouchableOpacity>
        <Box style={styles.divider} />
      </>
    );
  };

  return (
    <Box style={styles.container}>
      <Box>
        <TextInput
          ref={searchInputRef}
          label={strings.displayText.search}
          mode="outlined"
          style={styles.searchInput}
          outlineColor={COLORS.gray}
          activeOutlineColor={COLORS.background.primary}
          theme={{
            colors: {
              primary: COLORS.gray,
              underlineColor: 'transparent',
              background: COLORS.background.secondary,
              onSurfaceVariant: '#8A8A8A',
            },
          }}
          right={
            <TextInput.Icon
              style={styles.searchDoctorInput}
              iconColor={'#A7A7A7'}
              icon={searchText.length > 0 ? assets.CloseX : assets.SearchGrey}
              onPress={() => setSearchText('')}
              size={searchText.length > 0 ? 22 : 22}
            />
          }
          // right={
          //   searchText ? (
          //     <TextInput.Icon
          //       style={styles.closeIcon}
          //       size={20}
          //       color={COLORS.placeHolder}
          //       icon="close"
          //       onPress={handleClear}
          //     />
          //   ) : null
          // }
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSearch}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </Box>
      <Box style={styles.boxStyle}>
        <Box height={'100%'}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userData}
            onScroll={handleScroll}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={selectPatientDetials}
            onEndReached={handlePatientsList}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loader ? <CustomActivityIndicator loader={false} /> : null}
          />
        </Box>
      </Box>
      {UsePermission(permissionList?.mobileAddPatient) && (
        <Box style={styles.buttonBoxContainer}>
          <AbstractButton
            onPress={() => {
              handleCraetePatient?.();
            }}
            buttonStyle={styles.addBtnStyle}
            textStyle={styles.applyTxtStyle}
          >
            {strings.displayText.addNewPatient}
          </AbstractButton>
        </Box>
      )}
    </Box>
  );
};

export default CustomSelectPatientBottomSheet;
