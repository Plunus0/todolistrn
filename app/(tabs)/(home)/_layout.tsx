import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        statusBarBackgroundColor: "cyan",
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerTitle: "todolist",
          headerStyle: {
            backgroundColor: "lightblue",
          },
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerTitle: "details",
        }}
      />
    </Stack>
  );
};
export default StackLayout;
