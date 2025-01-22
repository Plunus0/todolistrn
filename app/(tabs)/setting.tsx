import { View, Text, Alert, Button, Switch, StyleSheet } from "react-native";
import React from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
  const navigation = useNavigation();

  const handleDeleteAll = () => {
    axios
      .delete("http://192.168.219.60:8080/api/todos")
      .then(() => {
        Alert.alert("Success", "All todos have been deleted.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("(home)", { reload: true });
            },
          },
        ]);
      })
      .catch((error) => {
        console.error("Error deleting all todos:", error);
        Alert.alert("Error", "Failed to delete all todos.");
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Delete All Todos" onPress={handleDeleteAll} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default Setting;
