import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";

interface TodoButtonsProps {
  onAdd: () => void;
}

const TodoAddButtons: React.FC<TodoButtonsProps> = ({ onAdd }) => {
  return (
    <View style={styles.buttonGroup}>
      <Pressable onPress={onAdd}>
        <Image
          source={require("../../assets/images/add.jpg")}
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

export default TodoAddButtons;
