import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Video from "./Video"; // Import the Video component
const Stack = createStackNavigator();

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require("./assets/triop2023.png")}
        style={styles.headerImage}
      />
    </View>
  );
};

const Menu = ({ navigation }) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Video")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Pastikan Icon tidak di dalam Text */}
          <Icon name="video-camera" size={20} color="#000" />
          <Text style={styles.menuText}> Video</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Video")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Pastikan Icon tidak di dalam Text */}
          <Icon name="newspaper-o" size={20} color="#000" />
          <Text style={styles.menuText}> Berita</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Video")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Pastikan Icon tidak di dalam Text */}
          <Icon name="graduation-cap" size={20} color="#000" />
          <Text style={styles.menuText}> Sekolah</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Video")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Pastikan Icon tidak di dalam Text */}
          <Icon name="calendar" size={20} color="#000" />
          <Text style={styles.menuText}> Jadwal</Text>
        </View>
      </TouchableOpacity>
      {/* Tambahkan menu lainnya di sini */}
    </View>
  );
};

const App = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Menu navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  menuItem: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Triop Mobile" component={App} />
        <Stack.Screen name="Video" component={Video} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
