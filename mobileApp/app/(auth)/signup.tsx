import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TextInput,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        // Replace this with your actual API call
        const response = await fetch("#", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.ok) {
          Alert.alert("Success", "Account created successfully", [
            {
              text: "OK",
              onPress: () => router.replace("/(auth)/login"),
            },
          ]);
        } else {
          Alert.alert("Error", "Failed to create account");
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>Burn🔥</ThemedText>
        </View>

        <ThemedView style={styles.formContainer}>
          <ThemedText style={styles.subtitle}>Create Account</ThemedText>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Email</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#B7B7B7"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? (
              <ThemedText style={styles.errorText}>{errors.email}</ThemedText>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Password</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#B7B7B7"
              secureTextEntry
            />
            {errors.password ? (
              <ThemedText style={styles.errorText}>
                {errors.password}
              </ThemedText>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Confirm Password</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#B7B7B7"
              secureTextEntry
            />
            {errors.confirmPassword ? (
              <ThemedText style={styles.errorText}>
                {errors.confirmPassword}
              </ThemedText>
            ) : null}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
          </TouchableOpacity>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Already have an account?{" "}
            </ThemedText>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <ThemedText style={styles.linkText}>Login</ThemedText>
              </TouchableOpacity>
            </Link>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: 40,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6347",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#2A2A2A",
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    color: "#FFF",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF6347",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#FFF",
    backgroundColor: "#1A1A1A",
  },
  button: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#FFF",
  },
  linkText: {
    color: "#FF6347",
  },
  errorText: {
    color: "#FF6347",
    fontSize: 12,
  },
});
