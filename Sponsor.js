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
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sponsors from the API
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch(
          "http://157.10.161.35/triop/restapi/sponsor.php?function=get_sponsor"
        );
        const result = await response.json();
        console.log("Fetched Sponsors:", result);

        if (result.status === 1) {
          setSponsors(result.data);
        } else {
          console.error("Failed to fetch sponsors:", result.message);
        }
      } catch (error) {
        console.error("Error fetching sponsor data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
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
        {sponsors.map((sponsor) => (
          <View key={sponsor.id_sponsor} style={styles.sponsorContainer}>
            <Image
              source={{
                uri: `http://157.10.161.35/triop/assets/img/sponsor/${sponsor.gambar}`,
              }}
              style={styles.sponsorImage}
              resizeMode="cover"
            />
            <Text style={styles.sponsorName}>{sponsor.nama}</Text>
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
  sponsorContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  sponsorImage: {
    width: 200,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  sponsorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default App;
