import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import TodoEditButtons from "@/app/components/TodoEditButtons";
import TodoDeleteButtons from "@/app/components/TodoDeleteButtons";

interface Todo {
  id: number;
  contents: string;
  isCompleted: number;
  createdDate: string;
}

const Details = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // 수정 상태 관리
  const [editedContent, setEditedContent] = useState(""); // 수정된 내용 저장
  const params = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get<Todo>(
          `http://192.168.219.60:8080/api/todos/${params.id}`
        );
        setTodo(response.data);
        setEditedContent(response.data.contents); // 초기값 설정
      } catch (error) {
        console.error("Error fetching todo details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [params.id]);

  const handleEdit = async () => {
    if (!todo) return;

    try {
      const response = await axios.put<Todo>(
        `http://192.168.219.60:8080/api/todos/${todo.id}`,
        { contents: editedContent, isCompleted: todo.isCompleted }
      );
      setTodo(response.data);
      setIsEditing(false);
      Alert.alert("Success", "내용이 수정되었습니다.");
    } catch (error) {
      console.error("Error updating todo:", error);
      Alert.alert("Error", "수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!todo) return;

    try {
      await axios.delete(`http://192.168.219.60:8080/api/todos/${todo.id}`);
      Alert.alert("Success", "내용이 삭제되었습니다.");
      router.back(); // 이전 페이지로 이동
    } catch (error) {
      console.error("Error deleting todo:", error);
      Alert.alert("Error", "삭제에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#007BFF" />
    );
  }

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>해당 내용을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.created}>
          {new Date(todo.createdDate).toLocaleString()}
        </Text>
        <View style={styles.buttonGroup}>
          <TodoEditButtons onEdit={() => setIsEditing(true)} />
          <TodoDeleteButtons onDelete={handleDelete} />
        </View>
      </View>

      {/* Todo Content */}
      <View style={styles.content}>
        <Text style={styles.label}>내용:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedContent}
            onChangeText={setEditedContent}
          />
        ) : (
          <Text style={styles.value}>{todo.contents}</Text>
        )}
        <Text style={styles.label}>
          완료 여부:{" "}
          <Text
            style={[
              styles.value,
              todo.isCompleted ? styles.completed : styles.pending,
            ]}
          >
            {todo.isCompleted ? "완료" : "해야할 일"}
          </Text>
        </Text>
      </View>

      {/* Save and Cancel Buttons */}
      {isEditing && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setIsEditing(false); // 수정 모드 종료
              setEditedContent(todo.contents); // 수정 내용을 원래 값으로 복원
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between", // 좌우 정렬
    alignItems: "center",
    marginBottom: 20,
  },
  created: {
    fontSize: 14,
    color: "#666",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#FF4C4C",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  content: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // 안드로이드 그림자 효과
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  value: {
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  completed: {
    color: "green",
  },
  pending: {
    color: "red",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end", // 버튼들을 우측 정렬
    marginTop: 20,
    gap: 10, // 버튼 간격 조정
  },
  cancelButton: {
    backgroundColor: "#FF4C4C", // 빨간색 배경
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#28A745", // 초록색 배경
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Details;
