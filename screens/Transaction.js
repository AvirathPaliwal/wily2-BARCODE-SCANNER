import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
export default class Transaction extends Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }
    handleBarCodeScanner = async ({ type, data }) => {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }
    getCameraPerissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        this.setState({
            hasCameraPermission: status === "granted",
            scanned: false,
            buttonState: 'clicked'
        })
    }
    render() {
        const hasCameraPermission = this.state.hasCameraPermission
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if (buttonState === 'clicked' && hasCameraPermission) {
            return (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
                    style={StyleSheet.absoluteFillObject} />
            )
        }
        else if (buttonState === 'normal') {
            return (
                <View style={styles.container}>
                    <Text style={styles.displayText}>
                        {
                            hasCameraPermission === true ? this.state.scannedData :
                                "request camera permission"
                        }
                    </Text>
                    <TouchableOpacity onPress={this.getCameraPerissions}>
                        <Text>
                            Scan QR code
                        </Text>
                    </TouchableOpacity>
                    <Text>
                        Transaction Screen
                </Text>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    scanButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
    },
    buttonText: {
        fontSize: 20,
    }
});