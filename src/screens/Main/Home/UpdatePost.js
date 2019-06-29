import React, { Component } from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";
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

export default class UpdatePost extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");
    const photo = navigation.getParam("photo", "");
    const refresh = navigation.getParam("refresh", "");

    this.state = {
      data: [],
      id: itemId,
      photoo: photo,
      caption: ""
    };
  }

  handleSubmit() {
    this.setState({
      loading: true
    });
    AsyncStorage.getItem("token").then(token => {
      axios
        .patch(
          `${RESTAPI_V1}/home/updatePost/${this.state.id}`,
          {
            caption: this.state.caption
          },
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          console.log(response);
          if (response.data.success) {
            this.setState({
              itemId: "",
              loading: false,
              photoo: "",
              caption: ""
            });
            alert("Succesed");
            this.props.navigation.navigate("HomeScreen"), {
              refresh: true
            };
          }
        })
        .catch(err => alert("sedang perbaikan"));
    });
  }
  render() {
    return (
      <View>
        <Text>{this.state.captionn}</Text>
        <Spinner
          visible={this.state.loading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <View>
          <Image
            source={{ uri: this.state.photoo }}
            style={{ width: "100%", height: 200 }}
          />
        </View>
        <Form>
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
            <Text>Edit</Text>
          </Button>
        </Form>
      </View>
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
