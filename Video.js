import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
} from "react-native";

const videoData = [
  {
    id: "fWo76y3Fvns",
    thumbnail: `https://i.ytimg.com/vi/fWo76y3Fvns/default.jpg`,
  },
  {
    id: "GcQ0ouHpETY",
    thumbnail: `https://i.ytimg.com/vi/GcQ0ouHpETY/default.jpg`,
  },
  {
    id: "on2HNaZ7Zec",
    thumbnail: `https://i.ytimg.com/vi/on2HNaZ7Zec/default.jpg`,
  },
  {
    id: "on2HNaZ7Zec",
    thumbnail: `https://i.ytimg.com/vi/on2HNaZ7Zec/default.jpg`,
  },
  {
    id: "on2HNaZ7Zec",
    thumbnail: `https://i.ytimg.com/vi/on2HNaZ7Zec/default.jpg`,
  },
  {
    id: "on2HNaZ7Zec",
    thumbnail: `https://i.ytimg.com/vi/on2HNaZ7Zec/default.jpg`,
  },
  {
    id: "on2HNaZ7Zec",
    thumbnail: `https://i.ytimg.com/vi/on2HNaZ7Zec/default.jpg`,
  },
  {
    id: "on2HNaZ7Zec",
    thumbnail: `https://i.ytimg.com/vi/on2HNaZ7Zec/default.jpg`,
  },
];

const App = () => {
  const [videoTitles, setVideoTitles] = useState({});

  useEffect(() => {
    const getYoutubeVideoInfo = async () => {
      for (const video of videoData) {
        const response = await fetch(
          `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${video.id}`
        );
        const data = await response.json();
        setVideoTitles((prevTitles) => ({
          ...prevTitles,
          [video.id]: data.title,
        }));
      }
    };
    getYoutubeVideoInfo();
  }, []);

  const handleVideoPress = (videoId) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: "bold" }}>Trinitas Open</Text>
      </View>
      <ScrollView style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        {videoData.map((video, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleVideoPress(video.id)}
          >
            <View
              style={{
                marginBottom: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: video.thumbnail }}
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
              <Text
                style={{
                  fontSize: 8,
                  fontWeight: "bold",
                  marginLeft: 16,
                  width: "90%", // Pastikan ada ruang untuk teks
                  flexWrap: "wrap",
                }}
                numberOfLines={null} // Pastikan tidak ada pembatasan baris
              >
                {videoTitles[video.id]}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
