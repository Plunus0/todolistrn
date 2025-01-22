import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";

interface TodoButtonsProps {
  onEdit: () => void;
}

const TodoEditButtons: React.FC<TodoButtonsProps> = ({ onEdit }) => {
  return (
    <View style={styles.buttonGroup}>
      <Pressable onPress={onEdit}>
        <Image
          source={require("../../assets/images/edit.jpg")}
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

export default TodoEditButtons;
