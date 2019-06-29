import React, { Component } from "react";
import { Image, StyleSheet, View , TouchableOpacity} from "react-native";
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

export const Tab1 = props => (
  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap"
    }}
  >
    <TouchableOpacity>
      <Image
        style={{
          height: 120,
          width: props.width,
          marginRight: 2,
          marginBottom: 2
        }}
        source={{
          uri: props.photo
        }}
      />
    </TouchableOpacity>
  </View>
);


