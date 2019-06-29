import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";

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
  Icon as INA,
  Thumbnail,
  Text,
  Item,
  Input,
  Form,
  Label,
  Tabs,
  Tab,
  TabHeading
} from "native-base";

import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/FontAwesome";
import Spinner from "react-native-loading-spinner-overlay";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import RESTAPI_V1 from "../../../config";
import {Tab1} from "./Tabs";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      bio: '',
      screenWidth: "",
      screenHeight: "",
      loading: true
    };
  }

  componentWillMount() {
    this.getScreenSize();
  }

  componentDidMount() {
    this.fetchAll();
  }

  getScreenSize = () => {
    const screenWidth = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);
    this.setState({ screenWidth: screenWidth, screenHeight: screenHeight });
  };

  fetchAll = () => {
    AsyncStorage.getItem("token").then(token => {
      axios
        .get(`${RESTAPI_V1}/profile/get`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.success) {
            this.setState({
              data: response.data.rows,
              bio: response.data.bio,
              loading: false
            });
          }
        })
        .catch(err => {
          this.setState({
            loading: false
          });
          alert("sedang perbaikan");
          
        });
    });
  };

  clearStorage = () => {
    Alert.alert(
      'Logout',
      'Are You Sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => {console.log('Cancel Pressed')},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
           AsyncStorage.clear();
      this.props.navigation.navigate("Login");
        }},
      ],
      {cancelable: false},
    );
  }



  render() {
    const width = this.state.screenWidth / 3 - 2;
    return (
      <Container>
        <Header
          style={{
            backgroundColor: "#fff",
            height: 40,
            borderWidth: 0.5,
            borderColor: "red"
          }}
        >
          <View style={{ paddingTop: 9 }}>
            <Text style={{ color: "black", alignSelf: "flex-start" }}>
              {this.state.bio.name}
            </Text>
          </View>

          <Body />
          <View
            style={{ flexDirection: "row", backgroundColor: "", paddingTop: 8 }}
          >
            <Text style={{ marginRight: 20 }}>
              <Icon name="navicon" size={30} color="black" />
            </Text>
            <Button transparent onPress={this.clearStorage}>
              <Text>
                <AntDesign name="logout" size={30} color="black" />
              </Text>
            </Button>
            
          </View>
        </Header>
        <Content style={{ backgroundColor: "", marginTop: 5 }}>
          <Spinner
            visible={this.state.loading}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={{}}>
            <View style={{ backgroundColor: "", flexDirection: "row" }}>
              <View style={{ backgroundColor: "", padding: 20 }}>
                <Thumbnail
                  large
                  source={{
                    uri:
                      this.state.bio.avatar
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: "",
                  justifyContent: "center"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    backgroundColor: "",
                    width: "100%",
                    justifyContent: "center"
                  }}
                >
                  <View style={{ alignItems: "center", marginRight: 10 }}>
                    <Text>3</Text>
                    <Text>Post</Text>
                  </View>
                  <View style={{ alignItems: "center", marginRight: 10 }}>
                    <Text>175</Text>
                    <Text>Followers</Text>
                  </View>
                  <View style={{ alignItems: "center", marginRight: 10 }}>
                    <Text>3</Text>
                    <Text>Following</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: "", width: "100%" }}>
                  <Button full light>
                    <Text>Edit Profile</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: "", padding: 20 }}>
            <Text>{this.state.bio.name}</Text>
            <Text>Kosong --</Text>
          </View>
          <View style={{ backgroundColor: "", padding: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <Thumbnail
                style={{ marginRight: 20 }}
                small
                source={{
                  uri:
                    "https://raw.githubusercontent.com/wix/react-native-navigation/master/.logo.png"
                }}
              />
              <Thumbnail
                style={{ marginRight: 20 }}
                small
                source={{
                  uri:
                    "https://raw.githubusercontent.com/wix/react-native-navigation/master/.logo.png"
                }}
              />
              <Thumbnail
                style={{ marginRight: 20 }}
                small
                source={{
                  uri:
                    "https://raw.githubusercontent.com/wix/react-native-navigation/master/.logo.png"
                }}
              />
            </View>
          </View>
          <Tabs>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "white" }}>
                  <MaterialIcons size={25} name="grid-on" />
                </TabHeading>
              }
            >
              {
                this.state.data.map( (item, index) => (
              
                  <Tab1 
                    key={index}
                    photo={item.photo}
                    width={width}
                  />
                ) )

              }
             
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "white" }}>
                  <MaterialIcons size={25} name="grid-on" />
                </TabHeading>
              }
            >
              {/* <Tab2 /> */}
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "white" }}>
                  <MaterialIcons size={25} name="grid-on" />
                </TabHeading>
              }
            >
              {/* <Tab3 /> */}
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    height: 120,
    width: "100%"
  },
  rowTextInstagram: {
    justifyContent: "center"
  },
  textInstagram: {
    fontSize: 50,
    paddingTop: 25
  },
  textBox: {
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
    marginBottom: 15
  }
});
