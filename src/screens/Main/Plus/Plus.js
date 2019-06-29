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
import Spinner from "react-native-loading-spinner-overlay";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import RESTAPI_V1 from "../../../config";

export default class Plus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: "",
      caption: "",
      data: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getItem("token");
  }

  handleSubmit() {
    this.setState({
      loading: true
    });
    AsyncStorage.getItem("token").then(token => {
      axios
        .post(
          `${RESTAPI_V1}/home/insert`,
          {
            photo: this.state.photo,
            caption: this.state.caption
          },
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          if (response.data.success) {
            this.setState({
              loading: false,
              photo: "",
              caption: ""
            });
         
            this.props.navigation.navigate("Home");
          }
        })
        .catch(err => {
          this.setState({
              loading: false,
            });
          alert("sedang perbaikan")
        });
    });
  }

  testingAPI() {
    axios
      .get(`${RESTAPI_V1}/user/testing`)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getItem = key => {
    AsyncStorage.getItem(key).then(res => {});
  };

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flexDirection: "row" }}>
            <Text style={{ marginRight: 5 }}>
              <Icon name="camera" size={21} borderColor="black" />
            </Text>
          </Left>
          <Body>
            <Title style={{ color: "black" }}>Instagram</Title>
          </Body>
          <Right>
            <Text style={styles.headerRightText}>
              <FontAwesome name="tv" size={25} color="black" />
            </Text>
            <Image
              style={styles.headerRightImage}
              source={{
                uri:
                  "https://cdn3.iconfinder.com/data/icons/basic-user-interface-application/32/INSTAGRAM_ICON_SETS-05-512.png"
              }}
            />
          </Right>
        </Header>
        <Content style={styles.content}>
          <Spinner
            visible={this.state.loading}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
          <Form>
            <Item floatingLabel style={styles.paddingComponentForm}>
              <Label>Link</Label>
              <Input
                onChangeText={photo => {
                  this.setState({ photo });
                }}
                value={this.state.photo}
              />
            </Item>
            <Item floatingLabel last style={styles.paddingComponentForm}>
              <Label>Caption</Label>
              <Input
                onChangeText={caption => {
                  this.setState({ caption });
                }}
                value={this.state.caption}
              />
            </Item>
            <Button block onPress={() => this.handleSubmit()}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "white"
  },
  headerRightText: {
    marginRight: 21
  },
  headerRightImage: {
    width: 25,
    height: 25
  },
  MainContainer: {
    alignItems: "center",
    flex: 1,
    margin: 10,
    marginTop: 60
  },
  TextInputStyle: {
    textAlign: "center",
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#808000"
  },
  button: {
    width: "100%",
    height: 40,
    padding: 10,
    backgroundColor: "#808000",
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center"
  },
  text: {
    fontSize: 20,
    textAlign: "center"
  },
  content: {
    padding: 5
  },
  paddingComponentForm: {
    marginBottom: 10
  }
});
