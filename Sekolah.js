import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const App = () => {
  const [sekolahs, setSekolahs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sponsors from the API
  useEffect(() => {
    const fetchSekolahs = async () => {
      try {
        const response = await fetch(
          "http://157.10.161.35/triop/restapi/sekolah.php?function=get_sekolah"
        );
        const result = await response.json();
        console.log("Fetched Sekolah:", result);

        if (result.status === 1) {
          setSekolahs(result.data);
        } else {
          console.error("Failed to fetch sekolah:", result.message);
        }
      } catch (error) {
        console.error("Error fetching sekolah data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSekolahs();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {sekolahs.map((sekolah) => (
          <View key={sekolah.id_sekolah} style={styles.sekolahContainer}>
            <Image
              source={{
                uri: `http://157.10.161.35/triop/assets/img/sekolah/${sekolah.gambar}`,
              }}
              style={styles.sekolahImage}
              resizeMode="cover"
            />
            <Text style={styles.sekolahName}>{sekolah.nama}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sekolahContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  sekolahImage: {
    width: 200,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  sekolahName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default App;
