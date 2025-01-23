import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  Pressable,
  Modal,
  Button,
  Image,
} from "react-native";
import axios from "axios";
import dayjs from "dayjs";
import { useFocusEffect, useRouter } from "expo-router";
import TodoAddButtons from "@/app/components/TodoAddButtons";
import TodoEditButtons from "@/app/components/TodoEditButtons";
import TodoDeleteButtons from "@/app/components/TodoDeleteButtons";
interface Todo {
  id: number;
  contents: string;
  isCompleted: number;
  createdDate: string;
}

const TodoApp = () => {
  const router = useRouter();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInput, setModalInput] = useState("");
  const inputRef = useRef<TextInput>(null);

  const [size, setSize] = useState(10); // 초기 크기 설정
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [isLastPage, setIsLastPage] = useState(false); // 마지막 데이터 여부 확인

  const fetchTodos = async (newSize: number) => {
    setLoading(true); // 로딩 시작
    try {
      const response = await axios.get<{ content: Todo[]; last: boolean }>(
        "http://192.168.219.60:8080/api/todos",
        {
          params: { page: 0, size: newSize }, //size만 변경
        }
      );
      setTodos(response.data.content.sort((a, b) => b.id - a.id)); // 모든 데이터를 업데이트
      setIsLastPage(response.data.last); // 마지막 페이지 여부 확인
    } catch (error) {
      console.error("오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };
  //초기 데이터 로드
  useFocusEffect(
    React.useCallback(() => {
      fetchTodos(10);
    }, [])
  );

  //  useEffect(() => {
  //    axios
  //      .get<Todo[]>("http://192.168.219.60:8080/api/todos")
  //      .then((response) => setTodos(response.data))
  //      .catch((error) => console.error("오류 발생:", error));
  //  }, []);

  // size가 변경될 때 마다 데이터를 로드
  useEffect(() => {
    fetchTodos(size);
  }, [size]);

  // 데이터를 로드하기 위해 가져올 데이터가 남아있으면 size를 증가
  const loadMoreTodos = () => {
    if (isLastPage || loading) return;
    setSize((prevSize) => prevSize + 10);
  };

  //단일 수정(모달)
  const openEditModal = (todo: Todo) => {
    setEditingId(todo.id);
    setModalInput(todo.contents);
    setIsModalVisible(true);
    setTimeout(() => {
      inputRef.current?.focus(); // 포커스 및 키보드 활성화 (지연시간이 있어야 키보드 활성화됨)
    }, 200);
  };

  const closeEditModal = () => {
    setIsModalVisible(false);
    setEditingId(null);
    setModalInput("");
  };

  const handleModalConfirm = () => {
    if (!modalInput.trim()) {
      Alert.alert("입력 오류", "할일을 적어주세요");
      return;
    }

    if (editingId) {
      // 기존 todo에서 isCompleted 값을 가져옴
      const existingTodo = todos.find((todo) => todo.id === editingId);
      if (!existingTodo) {
        Alert.alert("오류", "해당 할 일을 찾을 수 없습니다.");
        return;
      }

      // 수정 요청 전송
      axios
        .put<Todo>(`http://192.168.219.60:8080/api/todos/${editingId}`, {
          contents: modalInput,
          isCompleted: existingTodo.isCompleted, // 기존 isCompleted 값 전송
        })
        .then((response) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === editingId ? response.data : todo
            )
          );
          closeEditModal(); // 모달 닫기
        })
        .catch((error) => console.error("수정 오류 발생:", error));
    }
  };
  // 추가 또는 수정
  const handleAddOrUpdate = () => {
    if (!input.trim()) {
      Alert.alert("입력 오류", "할일을 적어주세요");
      return;
    }

    axios
      .post<Todo>("http://192.168.219.60:8080/api/todos", {
        contents: input,
      })
      .then((response) => {
        setTodos((prevTodos) => [response.data, ...prevTodos]);
        setInput("");
        Keyboard.dismiss();
      })
      .catch((error) => console.error("입력 오류 발생:", error));
  };

  // 체크버튼 토글
  const toggleCompletion = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      axios
        .put<Todo>(`http://192.168.219.60:8080/api/todos/${id}`, {
          isCompleted: todo.isCompleted === 1 ? 0 : 1,
        })
        .then((response) => {
          setTodos((prevTodos) =>
            prevTodos.map((t) => (t.id === id ? response.data : t))
          );
        })
        .catch((error) => console.error("체크 오류 발생:", error));
    }
  };

  // 단일삭제버튼
  const handleDelete = (id: number) => {
    axios
      .delete(`http://192.168.219.60:8080/api/todos/${id}`)
      .then(() =>
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
      )
      .catch((error) => console.error("삭제 오류 발생:", error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a todo..."
          value={input}
          onChangeText={setInput}
        />
        <TodoAddButtons onAdd={handleAddOrUpdate} />
      </View>
      {/* Display Todos */}
      <FlatList
        data={[...todos]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.timeText}>
              {dayjs(item.createdDate).format("MM/DD HH:mm")}
            </Text>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => toggleCompletion(item.id)}
            >
              <Text style={styles.checkboxText}>
                {item.isCompleted ? "✔" : "☐"}
              </Text>
            </TouchableOpacity>

            <Pressable
              style={({ pressed }) => [
                styles.pressableContainer,
                pressed && styles.pressablePressed,
              ]}
              onPress={() => router.push(`/details?id=${item.id}`)}
              onLongPress={() => openEditModal(item)}
            >
              <Text style={styles.pressableText}>{item.contents}</Text>
            </Pressable>

            <TodoEditButtons onEdit={() => openEditModal(item)} />
            <TodoDeleteButtons onDelete={() => handleDelete(item.id)} />
          </View>
        )}
        ListFooterComponent={
          !isLastPage ? (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={loadMoreTodos}
              disabled={loading} // 로딩 중 버튼 비활성화
            >
              <Image
                source={
                  loading
                    ? require("../../../assets/images/loading.gif") // 로딩 중일 때
                    : require("../../../assets/images/arrows.png") // 로딩 아닐 때
                }
                style={styles.loadMoreImage}
              />
            </TouchableOpacity>
          ) : null // 조건 만족하지 않을 경우 null 반환
        }
      />
      {/* Edit Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TextInput
              ref={inputRef}
              style={styles.modalInput}
              placeholder="Edit your todo..."
              value={modalInput}
              onChangeText={setModalInput}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="취소" onPress={closeEditModal} color="#ff5c5c" />
              <Button title="확인" onPress={handleModalConfirm} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 10,
  },
  pressableContainer: {
    flex: 1,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    justifyContent: "center",
  },
  pressablePressed: {
    backgroundColor: "#e0e0e0", // 눌렀을 때 색상 변경
  },
  pressableText: {
    fontSize: 16,
    color: "#333",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  timeText: {
    marginRight: 10,
    fontSize: 12,
    color: "#666",
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 18,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loadMoreButton: {
    alignItems: "center",
    marginVertical: 10,
  },
  loadMoreImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default TodoApp;
