import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";

interface Todo {
  id: number;
  contents: string;
  isCompleted: number;
  createdDate: string;
}

const Details = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get<Todo>(
          `http://192.168.219.60:8080/api/todos/${params.id}`
        );
        setTodo(response.data);
      } catch (error) {
        console.error("Error fetching todo details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [params.id]);

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Todo not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo Details</Text>
      <Text style={styles.label}>ID: {todo.id}</Text>
      <Text style={styles.label}>Contents: {todo.contents}</Text>
      <Text style={styles.label}>
        Created: {new Date(todo.createdDate).toLocaleString()}
      </Text>
      <Text style={styles.label}>
        Status: {todo.isCompleted ? "Completed" : "Pending"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});

export default Details;
