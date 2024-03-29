import React from "react";
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function Setting(props) {
    return(
      <View>
      <Text>{props.loggedInUser}</Text>
      <Button
      title="Log In"
      onPress={() => Alert.alert('Simple Button pressed')}
    />
      </View>
    )
  }

export default Setting;