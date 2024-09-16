import React from 'react';
import { ActivityIndicator, Image, Platform, StyleSheet, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../../constants';
import Box from '../Box';

interface Props {
  type?: boolean;
  pdfUri?: string;
  imageUri?: string;
  pdfStyle?: object;
  imageStyle?: object;
}

const CustomImage = (props: Props): JSX.Element => {
  const { type, pdfStyle, pdfUri, imageStyle, imageUri } = props;
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      {type ? (
        <ScrollView scrollEnabled={true} contentContainerStyle={styles.scrollStyle}>
          <Pdf
            source={{
              uri: pdfUri,
              cache: true,
            }}
            trustAllCerts={Platform.OS === 'android' ? false : true}
            onError={(error) => error}
            style={pdfStyle}
            renderActivityIndicator={(progress: number) => {
              return (
                <Box style={styles.pdfStyle}>
                  <Text>{progress}</Text>
                  <ActivityIndicator size="small" color={COLORS.black} />
                </Box>
              );
            }}
            fitPolicy={0}
          />
        </ScrollView>
      ) : (
        <Box>
          {loading && (
            <Box style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={COLORS.black} />
            </Box>
          )}

          <Image
            onLoadStart={() => {
              setLoading(true);
            }}
            onLoadEnd={() => setLoading(false)}
            source={{
              uri: imageUri,
            }}
            style={imageStyle}
            resizeMode="contain"
          />
        </Box>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollStyle: { flex: 1, flexWrap: 'wrap' },
  pdfStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default CustomImage;
