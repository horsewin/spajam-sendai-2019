import {StyleSheet, Text, View, Button} from "react-native";
import React from "react";
import { connect } from "react-redux";
import { counterIncrement as counterIncrementAction } from "../actions/counter";

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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    increment = () => {
        const {counter, counterIncrement} = this.props;
        counterIncrement(counter.counter)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Hey, PUA detail.</Text>
                <Text>{this.props.counter.counter}</Text>
                <Button title="Add" onPress={this.increment}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    counter: state.counter
});

const mapDispatchToProps = dispatch => ({
    counterIncrement: values => {
        dispatch(counterIncrementAction(values))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailScreen)
