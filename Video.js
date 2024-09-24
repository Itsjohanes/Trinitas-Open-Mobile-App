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

const App = () => {
  const [videoData, setVideoData] = useState([]);
  const [videoTitles, setVideoTitles] = useState({});

  // Fetch the video data from the API
  const fetchVideos = async () => {
    try {
      const response = await fetch(
        "http://157.10.161.35/triop/restapi/video.php?function=get_video",
        { method: "GET" }
      );

      // Log response details
      console.log("Response Status:", response.status);
      console.log("Response Headers:", [...response.headers]);
      console.log("Response URL:", response.url);

      if (!response.ok) {
        // Log full response text before throwing error
        const text = await response.text();
        console.error("Response Text:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text(); // Get raw response text
      console.log("Raw response:", text); // Log the raw response

      // Attempt to parse the raw response as JSON
      try {
        const result = JSON.parse(text);
        console.log("Parsed JSON:", result);

        if (result.status === 1) {
          setVideoData(result.data); // Set the video data from API
          result.data.forEach((video) => {
            const videoId = video.link.split("?")[0]; // Extract videoId from link (before the ?si=)
            getYoutubeVideoInfo(videoId); // Fetch video titles from YouTube
          });
        }
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
      }
    } catch (error) {
      console.error("Error fetching video data: ", error);
    }
  };

  // Fetch video title from YouTube using NoEmbed
  const getYoutubeVideoInfo = async (videoId) => {
    try {
      const response = await fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
      );
      const data = await response.json();
      setVideoTitles((prevTitles) => ({
        ...prevTitles,
        [videoId]: data.title,
      }));
    } catch (error) {
      console.error(`Error fetching video info for ${videoId}: `, error);
    }
  };

  useEffect(() => {
    fetchVideos(); // Fetch video data on component mount
  }, []);

  // Handle video press to open YouTube video
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
        {videoData.map((video, index) => {
          const videoId = video.link.split("?")[0]; // Extract the YouTube video ID
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleVideoPress(videoId)}
            >
              <View
                style={{
                  marginBottom: 15,
                  flexDirection: "row",
                }}
              >
                <Image
                  source={{
                    uri: `https://i.ytimg.com/vi/${videoId}/default.jpg`,
                  }}
                  style={{ width: 100, height: 100, borderRadius: 8 }}
                />
                <View
                  style={{ flex: 1, marginLeft: 16, justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      flexWrap: "wrap",
                    }}
                    numberOfLines={4} // Allow up to 3 lines
                    ellipsizeMode="tail" // Add ellipsis (...) if text exceeds 3 lines
                  >
                    {videoTitles[videoId] || video.judul}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
