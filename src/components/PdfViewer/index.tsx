import React from 'react';
import { View, ActivityIndicator, Linking, Dimensions, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

// Constants for static values
type PDFViewerProps = {
  source: string;
  handlePageChanged?: any;
};

// How to use this component:

// <PdfViewer source="https://api.printnode.com/static/test/pdf/multipage.pdf" />

const PdfViewer: React.FC<PDFViewerProps> = ({ source, handlePageChanged }) => {
  // Callback functions
  const handleLoadProgress = (percentage: number) => console.log(`Loading: ${percentage}`);
  const handleLoadComplete = () => console.log('Loading Complete');
  // const handlePageChanged = (page: number, totalPages: number) =>
  //   console.log(`${page}/${totalPages}`);
  const handleError = (error: any) => console.log(error);
  const handlePageSingleTap = (page: number) => console.log(`Single Tap on page ${page}`);
  const handlePressLink = (link: string) => Linking.openURL(link);
  const handleScaleChanged = (scale: number) => console.log(scale);

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{ uri: source, cache: true }}
        page={1}
        scale={1.0}
        minScale={0.5}
        maxScale={3.0}
        renderActivityIndicator={() => <ActivityIndicator color="black" size="large" />}
        enablePaging={true}
        onLoadProgress={handleLoadProgress}
        onLoadComplete={handleLoadComplete}
        onPageChanged={handlePageChanged}
        onError={handleError}
        onPageSingleTap={handlePageSingleTap}
        onPressLink={handlePressLink}
        onScaleChanged={handleScaleChanged}
        spacing={10}
        style={styles.pdfStyle}
      />
    </View>
  );
};

// StyleSheet for styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdfStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default PdfViewer;
