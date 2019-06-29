import React, { Component } from "react";
import { ScrollView, View, Image, StyleSheet, FlatList, RefreshControl  } from "react-native";
import {
  Card,
  CardItem,
  Container,
  Header,
  Title,
  Content,
  Footer,
  Badge,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon as INA,
  Text,
  Thumbnail
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import Post from "../../../components/Post";
import AsyncStorage from "@react-native-community/async-storage";

import RESTAPI_V1 from "../../../config";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    AsyncStorage.getItem("token").then(token => {
      if (token === undefined) {
        this.props.navigation.navigate("Login");
      }
    });
    this.state = {
      idUser: '',
      data: [],
      screenWidth: "",
      screenHeight: "",
      loading: true,
      refreshing: refresh
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchAll()
  };

  componentDidMount() {
    this.fetchAll();
  }

  handleRemove = data => {
    this.setState({ loading: true });
    AsyncStorage.getItem("token").then(token => {
      axios
        .delete(`${RESTAPI_V1}/home/deletePost/${data}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          this.fetchAll();
          this.props.navigation.navigate("Home");
        })
        .catch(err =>
          this.setState({
            loading: false
          })
        );
    });
  };

  fetchAll = () => {
    AsyncStorage.getItem("token").then(token => {
      axios
        .get(`${RESTAPI_V1}/home/getPost`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          this.setState({
            loading: false,
            data: res.data.rows,
            idUser: res.data.iduser,
            refreshing: false
          });
        })
        .catch(err =>
          this.setState({
            loading: false
          })
        );
    });
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
                <Icon name="tv" size={25} color="black" />
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
          <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            >
          <Content>
            <Spinner
              visible={this.state.loading}
              textContent={"Loading..."}
              textStyle={styles.spinnerTextStyle}
            />
            

            

            <ScrollView 
               
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.story}
                
              >
                <Grid>
                  <Row
                    style={{
                      paddingTop: 12,
                      paddingBottom: 5,
                      paddingLeft: 12
                    }}
                  >
                    <Col style={{ paddingRight: 25, backgroundColor: "" }}>
                      <Thumbnail
                        source={{
                          uri:
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Za7B8EAahntpAYy9aYE3pI2BIz2HuuVHaECdmJDqdD8ZRIc0tA"
                        }}
                      />
                      <Text style={{ position: "absolute", top: 35, left: 46 }}>
                        <AntDesign
                          name="pluscircle"
                          size={15}
                          color="#4F8EF7"
                        />
                      </Text>
                      <Text style={[styles.storyText, { paddingTop: 5 }]}>
                        Your Story
                      </Text>
                    </Col>
                    <Col style={{ paddingRight: 20 }}>
                      <Thumbnail
                        style={{
                          borderColor: "tomato",
                          borderWidth: 1,
                          padding: 20
                        }}
                        source={{
                          uri:
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Za7B8EAahntpAYy9aYE3pI2BIz2HuuVHaECdmJDqdD8ZRIc0tA"
                        }}
                      />
                      <Text style={[styles.storyText, { paddingTop: 5 }]}>
                        Your Story
                      </Text>
                    </Col>
                    <Col style={{ paddingRight: 20 }}>
                      <Thumbnail
                        style={{
                          borderColor: "tomato",
                          borderWidth: 1,
                          padding: 20
                        }}
                        source={{
                          uri:
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Za7B8EAahntpAYy9aYE3pI2BIz2HuuVHaECdmJDqdD8ZRIc0tA"
                        }}
                      />
                      <Text style={[styles.storyText, { paddingTop: 5 }]}>
                        Your Story
                      </Text>
                    </Col>
                    <Col style={{ paddingRight: 20 }}>
                      <Thumbnail
                        style={{
                          borderColor: "tomato",
                          borderWidth: 1,
                          padding: 20
                        }}
                        source={{
                          uri:
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Za7B8EAahntpAYy9aYE3pI2BIz2HuuVHaECdmJDqdD8ZRIc0tA"
                        }}
                      />
                      <Text style={[styles.storyText, { paddingTop: 5 }]}>
                        Your Story
                      </Text>
                    </Col>
                    <Col style={{ paddingRight: 20 }}>
                      <Thumbnail
                        style={{
                          borderColor: "tomato",
                          borderWidth: 1,
                          padding: 20
                        }}
                        source={{
                          uri:
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Za7B8EAahntpAYy9aYE3pI2BIz2HuuVHaECdmJDqdD8ZRIc0tA"
                        }}
                      />
                      <Text style={[styles.storyText, { paddingTop: 5 }]}>
                        Your Story
                      </Text>
                    </Col>
                    <Col style={{ paddingRight: 20 }}>
                      <Thumbnail
                        style={{
                          borderColor: "tomato",
                          borderWidth: 1,
                          padding: 20
                        }}
                        source={{
                          uri:
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Za7B8EAahntpAYy9aYE3pI2BIz2HuuVHaECdmJDqdD8ZRIc0tA"
                        }}
                      />
                      <Text style={[styles.storyText, { paddingTop: 5 }]}>
                        Your Story
                      </Text>
                    </Col>
                  </Row>
                </Grid>
              </ScrollView>
              {this.state.data.length > 0 ? (
                this.state.data.map((item, index) => (
                  
                  <Post
                    key={index}
                    id={item.id}
                    stts={(this.state.idUser === item.by_id) ? "same" : "not"}
                    name={item.name}
                    photo={item.photo}
                    caption={item.caption}
                    avatar={item.avatar}
                    remove={this.handleRemove}
                    update={() => {
                      this.props.navigation.navigate("UpdatePost", {
                        itemId: item.id,
                        photo: item.photo,
                        caption: item.caption
                      });
                    }}
                  />
                ))
              ) : (
                <Text />
              )}
            </ScrollView>
            
          </Content>
          </ScrollView>
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
  story: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#D4D4D4D4"
  },
  storyContainer: {
    flexDirection: "row",
    flex: 1
  },
  storyImage: {
    alignItems: "center",
    margin: 9
  },
  storyText: {
    fontSize: 12
  },
  send: {
    width: 25,
    height: 25
  },
  save: {
    width: 24,
    height: 24
  },
  heart: {
    paddingRight: 12
  },
  comment: {
    paddingRight: 12
  },
  textLike: {
    fontWeight: "bold",
    fontSize: 13
  },
  user: {
    fontWeight: "bold",
    fontSize: 13
  },
  caption: {
    fontSize: 13
  },
  commentText: {
    fontSize: 13,
    color: "#999"
  }
});
