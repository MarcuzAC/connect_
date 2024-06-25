import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Colors from '@/constants/Colors';

const CELL_COUNT = 6;

const Page = () => {
  const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string }>();
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      if(signin== 'true'){
        verifySignIn();
      }else{
        verifyCode()
      }
    }
  }, [code]);

  const verifyCode = async () => {
    // Add your verification logic here
  };

  const verifySignIn = async () => {
    // Add your sign-in verification logic here
  };

  const resendCode = async () => {
    // Add your resend code logic here
    console.log('Resend code clicked');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: `Verify ${phone}` }} />
      <Text style={styles.legal}>We have sent an SMS with the code to the number above.</Text>
      <Text style={styles.legal}>
        To complete verification, please enter the 6-digit activation code.
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={resendCode}>
        <Text style={styles.buttonText}>Didn't receive a verification code?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 48,
    backgroundColor: Colors.background,
  },

  legal: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 18,
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 260,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 8
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: Colors.primary,
  },
});

export default Page;
