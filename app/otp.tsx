import { View, Text, KeyboardAvoidingView, Platform, Linking, StyleSheet, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskInput from 'react-native-mask-input';

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNUmber] = useState("");
    const router = useRouter();
    const { bottom } = useSafeAreaInsets();

    const openLink = () => {
        Linking.openURL('https://connect.com');
    };

    const sendOTP = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push(`/verify/${phoneNumber}`);            
        }, 200);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {loading && (
                        <View style={[StyleSheet.absoluteFill, styles.loading]}>
                            <ActivityIndicator size={'large'} color={Colors.primary}/>
                            <Text style={{fontSize: 18, padding:10}}>Sending code...</Text>
                        </View>
                    )}
                    <Text style={styles.description}>
                        We need to verify your account. Carrier charges may apply.
                    </Text>
                    <View style={styles.list}>
                        <View style={styles.listItem}>
                            <Text style={styles.listItemText}>Malawi</Text>
                            <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.gray} />
                        </View>
                        <View style={styles.separator} />

                        <MaskInput
                            value={phoneNumber}
                            keyboardType='numeric'
                            autoFocus
                            placeholder='your phone number'
                            style={styles.input}
                            onChangeText={(masked, unmasked) => {
                                setPhoneNUmber(masked);
                            }}
                            mask={['(', /\d/, /\d/, /\d/,')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        />
                    </View>

                    <Text style={styles.legal}>
                        You must be{' '}
                        <Text style={styles.link} onPress={openLink}>
                            at least 16 years old
                        </Text>{' '}
                        to register. Find other Apps on {' '}
                        <Text style={styles.link} onLongPress={openLink}>
                            AnalyFix
                        </Text>
                        .
                    </Text>

                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                        style={[styles.button, phoneNumber !== '' ? styles.enabled : null, { marginBottom: bottom },]}
                        disabled={phoneNumber === ''}
                        onPress={sendOTP}>
                        <Text style={[styles.buttonText, phoneNumber !== '' ? styles.enabled : null]}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.background,
        gap: 20
    },
    description: {
        fontSize: 14,
        color: Colors.gray
    },
    list: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10,
        padding: 10,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        marginBottom: 10,
    },
    listItemText: {
        fontSize: 18,
        color: Colors.primary,
    },
    separator: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.gray,
        opacity: 0.3,
    },
    legal: {
        fontSize: 12,
        textAlign: 'center',
        color: '#000',
    },
    link: {
        color: Colors.primary,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    enabled: {
        backgroundColor: Colors.primary,
        color: '#fff'
    },
    buttonText: {
        color: Colors.gray,
        fontSize: 22,
        fontWeight: '500'
    },
    input: {
        borderColor: '#fff',
        width: '100%',
        fontSize: 16,
        padding: 6,
        marginTop: 10
    },
    loading: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Page;
