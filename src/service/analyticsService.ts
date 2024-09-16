// import analytics from '@react-native-firebase/analytics';

export enum PermissionStatus {
  allowed,
  denied,
  permenently_denied,
}

export enum PermissionType {
  camera,
  mic,
  notification,
  storage,
}

export enum packageCatagory {
  base = 'base',
  standard = 'standard',
  premium = 'premium',
}

export enum ButtonPriority {
  low,
  average,
  high,
}

export enum LoginMethod {
  mobile = 'mobile',
  email = 'email',
}

export var setUserAttributes = async (
  user_id: string,
  hospital_id: string,
  hospital_name: string,
  hospital_zone: string,
  package_catagory: packageCatagory,
) => {
  await analytics().setUserId(user_id);
  await analytics().setUserProperties({
    hospital_id: hospital_id,
    hospital_name: hospital_name,
    hospital_zone: hospital_zone,
    package_catagory: package_catagory,
  });
};

export var logPermission = async (
  permission_type: PermissionType,
  permission_status: PermissionStatus,
) => {
  await analytics().logEvent('permission', {
    permission_type: permission_type,
    permission_status: permission_status,
  });
};

export var logButtonPress = async (label: string, priority: ButtonPriority) => {
  await analytics().logEvent('button_click', {
    label: label,
    priority: priority,
  });
};

export var logLogin = async (method: LoginMethod) => {
  await analytics().logLogin({
    method: method,
  });
};
