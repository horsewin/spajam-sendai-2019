import * as React from "react";
import {Button, Image, StyleSheet, Text, View} from "react-native";
import ImagePicker from "react-native-image-picker";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    }
});

/**
 *
 */
export default class ImageScreen extends React.Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            source: null
        }
    }

    uploadImage = async () => {
        const options = {};
        ImagePicker.showImagePicker(options, async response => {
            console.log("image ", response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    source
                })}
        });
    }

    render() {
        const imageComponent = this.state.source ?
            <Image
            style={styles.image}
            source={
                this.state.source
            }
        /> : null;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Hey, PUA Image.</Text>
                <Button title="Upload" onPress={this.uploadImage}/>
                {imageComponent}
            </View>
        );
    }
}
