import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import Video from "./Video";
import Sponsor from "./Sponsor";
import Sekolah from "./Sekolah";

const Stack = createStackNavigator();

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require("./assets/triop2023.png")}
        style={styles.headerImage}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
        style={styles.headerGradient}
      />
    </View>
  );
};

const MenuItem = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.menuItemGradient}
      >
        <Icon name={icon} size={24} color="#fff" />
        <Text style={styles.menuText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const Menu = ({ navigation }) => {
  return (
    <View style={styles.menuContainer}>
      <MenuItem
        icon="video"
        title="Video"
        onPress={() => navigation.navigate("Video")}
      />
      <MenuItem
        icon="newspaper"
        title="Berita"
        onPress={() => navigation.navigate("Video")}
      />
      <MenuItem
        icon="graduation-cap"
        title="Sekolah"
        onPress={() => navigation.navigate("Sekolah")}
      />
      <MenuItem
        icon="calendar-alt"
        title="Jadwal"
        onPress={() => navigation.navigate("Video")}
      />
      <MenuItem
        icon="handshake"
        title="Sponsor"
        onPress={() => navigation.navigate("Sponsor")}
      />
    </View>
  );
};

const App = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />
      <View style={styles.content}>
        <Menu navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItem: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
  },
  menuItemGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
});

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#192f6a",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Triop Mobile"
          component={App}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Video" component={Video} />
        <Stack.Screen name="Sponsor" component={Sponsor} />
        <Stack.Screen name="Sekolah" component={Sekolah} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
