import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="cogs" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
