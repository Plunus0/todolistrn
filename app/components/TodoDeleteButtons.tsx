import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";

interface TodoButtonsProps {
  onDelete: () => void;
}

const TodoDeleteButtons: React.FC<TodoButtonsProps> = ({ onDelete }) => {
  return (
    <View style={styles.buttonGroup}>
      <Pressable onPress={onDelete}>
        <Image
          source={require("../../assets/images/delete.jpg")}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default TodoDeleteButtons;
