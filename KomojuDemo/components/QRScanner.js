import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useIsFocused} from '@react-navigation/native';

const QRCodeLinksToKomojuPayments = barcodeData => {
  const expression = new RegExp('https://komoju.com/s/p/.+');

  return expression.test(barcodeData);
};

const processBarcode = barcode => {
  if (isFocused) {
    if (QRCodeLinksToKomojuPayments(barcode.data)) {
      navigation.navigate('PaymentProcessor', {
        paymentUrl: barcode.data,
      });
    } else {
      updateAlertState(true);
      !showAlert &&
        Alert.alert(
          'Invalid QR code',
          'For this demo app the QR code must have been generated from "https://tim-pay.herokuapp.com/"',
          [{text: 'OK', onPress: () => updateAlertState(false)}],
        );
    }
  }
};

const QRScanner = ({navigation}) => {
  const isFocused = useIsFocused();
  const [showAlert, updateAlertState] = useState(false);

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}
        onBarCodeRead={processBarcode}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
});

export default QRScanner;
