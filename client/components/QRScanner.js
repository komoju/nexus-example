import React, {useState} from 'react';
import {StyleSheet, View, Alert, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useIsFocused} from '@react-navigation/native';

import globalStyles from './globalStyles';

/*
The QRScanner component integrates with the device camera to scan the Komoju
generated QR code. If a QR code is brought into the camera's viewfinder it will be
checked to make sure that the URL matches the ProcessPayment API structure. If it
does then the URL is forward to the PaymentProcessor component for the next step in
the flow.

ProcessPayment API docs: https://docs.komoju.com/en/qr/api_reference#process-payment
*/
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
        onBarCodeRead={(barcode) => {
          if (!isFocused) return;

          navigation.navigate('PaymentProcessor', {
            paymentUrl: barcode.data,
          });
        }}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}>
        {({status}) => {
          if (status === 'NOT_AUTHORIZED') {
            return (
              <View style={globalStyles.container}>
                <Text style={globalStyles.emoji}>😿</Text>
                <Text style={styles.text}>
                  Sorry, but this application requires camera permissions to
                  scan the QR code. Please grant the app camera permisisons
                </Text>
              </View>
            );
          }
        }}
      </RNCamera>
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
  text: {
    ...globalStyles.text,
    color: 'white',
  },
});

export default QRScanner;
