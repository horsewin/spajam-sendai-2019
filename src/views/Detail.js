import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { counterIncrement as counterIncrementAction } from "../actions/counter";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null
    };
  }

  async componentDidMount() {
    const res = await axios.post(
      "https://us-central1-spajam2019-sendai.cloudfunctions.net/sampleApi",
      {
        name: "Arumon"
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    this.setState({
      response: res.data
    });
  }

  increment = () => {
    const { counter, counterIncrement } = this.props;
    counterIncrement(counter.counter);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>API response = {this.state.response}</Text>
        <Text>{this.props.counter.counter}</Text>
        <Button title="Add" onPress={this.increment} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter
});

const mapDispatchToProps = dispatch => ({
  counterIncrement: values => {
    dispatch(counterIncrementAction(values));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen);
