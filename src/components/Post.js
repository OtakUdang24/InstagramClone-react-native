import React, { Component } from "react";
import {
  ScrollView,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import Dialog, {
  DialogContent,
  SlideAnimation,
  DialogTitle
} from "react-native-popup-dialog";
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
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const styles = {
  header: {},
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
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  render() {
    return (
      <Grid>
        <Col>
          {/* Header */}
          <Row style={{ padding: 10 }}>
            <Left>
              <Row>
                <Thumbnail
                  circle
                  small
                  source={{
                    uri: this.props.avatar
                  }}
                />
                <Col
                  style={{
                    backgroundColor: "",
                    paddingLeft: 10,
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 13 }}>
                    {this.props.name}
                  </Text>
                </Col>
              </Row>
            </Left>
            <Right>
              <Button
                onPress={() => {
                  this.setState({ visible: true });
                }}
                transparent
              >
                <Text>
                  <Entypo name="dots-three-vertical" size={21} />
                </Text>
              </Button>
            </Right>
          </Row>
          {/* Header */}
          {/* Body */}
          <Col>
            <Image
              source={{
                uri: this.props.photo
              }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </Col>
          {/* Body */}
          {/* Footer */}
          <Col style={{ padding: 10 }}>
            <Row>
              <Left>
                <Row>
                  <Text style={styles.heart}>
                    <EvilIcons name="heart" size={35} />
                  </Text>
                  <Text style={styles.comment}>
                    <Icon name="comment-o" size={25} />
                  </Text>
                  <Image
                    style={styles.send}
                    source={{
                      uri:
                        "https://cdn3.iconfinder.com/data/icons/basic-user-interface-application/32/INSTAGRAM_ICON_SETS-05-512.png"
                    }}
                  />
                </Row>
              </Left>
              <Right>
                <Image
                  style={styles.save}
                  source={{
                    uri:
                      "https://cdn3.iconfinder.com/data/icons/basic-user-interface-application/32/INSTAGRAM_ICON_SETS-07-512.png"
                  }}
                />
              </Right>
            </Row>
            <Col>
              <Row style={{ marginTop: 5 }}>
                <Text style={styles.textLike}>17,075 </Text>
                <Text style={styles.textLike}>Likes</Text>
              </Row>
              <Row style={{ marginTop: 5 }}>
                <Text style={styles.user}>{this.props.name} </Text>
                <Text style={styles.caption}>{this.props.caption}</Text>
              </Row>
              <Text style={[styles.commentText, { marginTop: 5 }]}>
                View all 100 comments
              </Text>
              <Row style={{ marginTop: 5 }}>
                <Thumbnail
                  style={{ marginRight: 5 }}
                  circle
                  small
                  source={{
                    uri: this.props.avatar
                  }}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    marginLeft: 5,
                    fontSize: 13,
                    color: "#999"
                  }}
                >
                  Add a comments
                </Text>
              </Row>
            </Col>
          </Col>
          {/* Footer */}
          <View style={styles.container}>
            <Dialog
              visible={this.state.visible}
              animationDuration={100}
              width="100%"
              onTouchOutside={() => {
                this.setState({ visible: false });
              }}
            >
              {
                this.props.stts === "not" ? 
                <DialogContent
                  style={{ alignItems: "flex-start", padding: 10 }}
                >
                  <TouchableOpacity
                    style={{ marginBottom: 10 }}
                    
                  >
                    <Text>Report...</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    transparent
                    style={{ marginBottom: 10 }}
                  >
                    <Text>Copy Link</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    transparent
                    style={{ marginBottom: 10 }}
                  >
                    <Text>Turn On Post Notification</Text>
                  </TouchableOpacity>
                </DialogContent>
               : 
                <DialogContent
                  style={{ alignItems: "flex-start", padding: 10 }}
                >
                  <TouchableOpacity
                    style={{ marginBottom: 10 }}
                    onPress={() => {
                      this.setState({
                        visible: false
                      });
                      this.props.update();
                    }}
                  >
                    <Text>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    transparent
                    onPress={() => {
                      this.setState({
                        visible: false
                      });
                      this.props.remove(this.props.id);
                    }}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </DialogContent>
              }
            </Dialog>
          </View>
        </Col>
      </Grid>
    );
  }
}

export default Post;
