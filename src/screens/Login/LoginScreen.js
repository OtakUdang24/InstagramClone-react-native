import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Thumbnail,
  Text,
  Item,
  Input,
  Form,
  Label
} from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

import RESTAPI_V1 from "../../config";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    AsyncStorage.getItem("token").then(token => {
      if (token) {
        this.props.navigation.navigate("Main");
      }
    });
    this.state = {
      username: "",
      password: "",
      loading: false
    };
    // AsyncStorage.clear();
  }

  storeData = async (key, val) => {
    AsyncStorage.setItem(key, val);
  };

  handleSubmit() {
    this.setState({ loading: true });
    axios
      .post(`${RESTAPI_V1}/user/login`, {
        email: this.state.username,
        password: this.state.password
      })
      .then(res => {
        if (res.data.success) {
          this.storeData("token", res.data.token);
          this.setState({ loading: false });
          this.props.navigation.navigate("Main");
        } else {
          this.setState({
            loading: false, 
            username:'',
            password:''
          });
          alert("Username or password is wrong");
        }
      })
      .catch(err => {
        this.setState({
          loading: false, 
          username:'',
          password:''
        });
        console.log(err);
      });
  }


  render() {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.textHeader}>English (United States)</Text>
        </View>
        <Content>
          <Spinner
            visible={this.state.loading}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <Text style={styles.contentHeaderText}>Instagram</Text>
            </View>

            <View style={styles.uname}>
              <Item regular style={styles.textBoxt}>
                <Input
                  style={styles.input}
                  placeholder="Phone number, email or username"
                  onChangeText={username => this.setState({ username })}
                  value={this.state.username}
                />
              </Item>
            </View>

            <View style={styles.pwd}>
              <Item regular style={styles.textBoxt}>
                <Input
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
              </Item>
            </View>

            <View style={styles.submit}>
              <Button
                full
                info
                style={styles.button}
                onPress={() => this.handleSubmit()}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </Button>
            </View>

            <View style={styles.questions}>
              <Text style={styles.questions1}>Forgot your login details? </Text>
              <Text style={styles.questions2}>Get help signing in.</Text>
            </View>
          </View>
        </Content>
        <Footer style={styles.footer}>
          <Text style={styles.footerText1}>Don't have an account? </Text>
          <Text style={styles.footerText2}>Sign up.</Text>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 50,
    alignItems: "center",
    backgroundColor: "white"
  },
  header: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center"
  },
  textHeader: {
    fontSize: 12,
    color: "#999"
  },
  content: {
    padding: 30
  },
  contentHeader: {
    alignItems: "center"
  },
  contentHeaderText: {
    fontSize: 30
  },
  uname: {
    marginTop: 30
  },
  textBoxt: {
    borderRadius: 5,
    backgroundColor: "#FAFAFA"
  },
  input: {
    fontSize: 12,
    borderColor: "#999"
  },
  pwd: {
    marginTop: 15
  },
  submit: {
    marginTop: 15
  },
  button: {
    borderRadius: 5
  },
  buttonText: {
    fontSize: 12
  },
  questions: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center"
  },
  questions1: {
    fontSize: 12,
    color: "#999"
  },
  questions2: {
    fontSize: 12,
    fontWeight: "bold"
  },
  footerText1: {
    fontSize: 12,
    color: "#999"
  },
  footerText2: {
    fontSize: 12,
    fontWeight: "bold"
  }
});
