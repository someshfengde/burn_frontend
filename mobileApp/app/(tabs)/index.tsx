import { useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";

import { HelloWave } from "@/components/HelloWave";
import { Text } from "react-native";

interface FoodItem {
  food_item_name: string;
  calories: number;
}

interface ExerciseRecommendation {
  exercise_name: string;
  duration: number;
  calories_burned: number;
}

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [responsData, setResponsData] = useState(null);
  const [exerciseRecommendations, setExerciseRecommendations] = useState<
    ExerciseRecommendation[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const takePhoto = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const makeExercise = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://burn-1.onrender.com/api/v1/ask_llama/get_exercise_recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responsData),
        }
      );
      const result = await response.json();
      setExerciseRecommendations(result.recommendations);
    } catch (error) {
      console.error("Error getting exercise recommendations:", error);
      alert("Failed to get exercise recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendImage = async () => {
    setIsLoading1(true);
    if (image) {
      try {
        const formData = new FormData();
        formData.append("image", {
          uri: image,
          name: "photo.jpg",
          type: "image/jpeg",
        } as any);

        const response = await fetch(
          "https://burn-1.onrender.com/api/v1/ask_llama/analyze-image/",
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const result = await response.json();
        setResponsData(result);
        setFoodItems(result.food_items);
      } catch (error) {
        console.error("Error sending image:", error);
        alert("Failed to send image. Please try again.");
      }
    } else {
      alert("Please take a photo first!");
    }
    setIsLoading1(false);
  };

  const calculateTotalCalories = () => {
    return foodItems.reduce((total, item) => total + item.calories, 0);
  };

  const calculateTotalCaloriesBurned = () => {
    return exerciseRecommendations.reduce(
      (total, item) => total + item.calories_burned,
      0
    );
  };

  return (
    <ScrollView style={[styles.container, { paddingBottom: 20 }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Burn🔥</Text>
      </View>

      <View style={styles.cameraContainer}>
        {!image && (
          <View
            style={{
              padding: 20,
              borderRadius: 20,
              backgroundColor: "#FF6347",
            }}
          >
            <Feather name="camera" size={86} color="#FFF" />
          </View>
        )}
        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.capturedImage} />
          </View>
        )}
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          {isLoading1 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#FF6347" />
              <Text style={styles.loadingText}>Analyzing...</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.sendButton, !image && styles.disabledButton]}
              onPress={() => {
                setIsLoading1(true);
                sendImage().finally(() => setIsLoading1(false));
              }}
              disabled={!image || isLoading}
            >
              <Text
                style={[styles.buttonText, !image && styles.disabledButtonText]}
              >
                Analyze Image
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {foodItems.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Detected Food Items:</Text>
          {foodItems.map((item, index) => (
            <View key={index} style={styles.foodItemCard}>
              <Text style={styles.foodItemName}>{item.food_item_name}</Text>
              <Text style={styles.foodItemCalories}>
                {item.calories} calories
              </Text>
            </View>
          ))}
          <View style={styles.totalCaloriesContainer}>
            <Text style={styles.totalCaloriesText}>
              Total Calories: {calculateTotalCalories()}
            </Text>
          </View>
        </View>
      )}

      {foodItems.length > 0 && (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.createExerciseButton}
            onPress={makeExercise}
          >
            <Text style={styles.buttonText}>Create Exercise Plan</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6347" />
          <Text style={styles.loadingText}>
            Getting exercise recommendations...
          </Text>
        </View>
      ) : (
        <View style={[styles.resultsContainer, { paddingBottom: 30 }]}>
          {exerciseRecommendations.length > 0 && (
            <Text style={styles.resultsTitle}>Exercise Recommendations:</Text>
          )}
          {exerciseRecommendations &&
            exerciseRecommendations.map((item, index) => (
              <View key={index} style={styles.exerciseCard}>
                <Text style={styles.exerciseName}>{item.exercise_name}</Text>
                <Text style={styles.exerciseDetails}>
                  Duration: {item.duration} minutes
                </Text>
                <Text style={styles.exerciseDetails}>
                  Calories burned: {item.calories_burned}
                </Text>
              </View>
            ))}
          {exerciseRecommendations.length > 0 && (
            <View style={styles.totalCaloriesContainer}>
              <Text style={styles.totalCaloriesText}>
                Total Calories Burned: {calculateTotalCaloriesBurned()}
              </Text>
            </View>
          )}
        </View>
      )}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: "#ccc",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  cameraContainer: {
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
  cameraButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    padding: 10,
    gap: 15,
  },
  capturedImage: {
    width: 400,
    height: 400,
    borderRadius: 10,
  },
  sendButton: {
    backgroundColor: "#FF4500",
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    paddingBottom: 100,
    backgroundColor: "#1A1A1A",
  },
  resultsContainer: {
    marginTop: 20,
    padding: 10,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF6347",
  },
  foodItemCard: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  foodItemCalories: {
    fontSize: 14,
    color: "#FF6347",
  },
  title: {
    color: "#FF6347",
    fontSize: 32,
    fontWeight: "bold",
  },
  createExerciseButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  loadingText: {
    color: "#FF6347",
    marginTop: 10,
  },
  exerciseCard: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  exerciseDetails: {
    fontSize: 14,
    color: "#FF6347",
  },
  totalCaloriesContainer: {
    backgroundColor: "#FF6347",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  totalCaloriesText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
});
