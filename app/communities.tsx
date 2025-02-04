import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Community {
  _id: string;
  name: string;
  description: string;
  memberCount: number;
  image: string;
  isMember: boolean;
}

const mockJoinedCommunities: Community[] = [
  {
    _id: "1",
    name: "Europe Backpackers",
    description: "A community for backpackers exploring Europe",
    memberCount: 1250,
    image: "https://picsum.photos/200",
    isMember: true,
  },
  {
    _id: "2",
    name: "Asia Travel Plans",
    description: "Plan your next trip to Asia with fellow travelers",
    memberCount: 850,
    image: "https://picsum.photos/201",
    isMember: true,
  },
];

const mockSuggestedCommunities: Community[] = [
  {
    _id: "3",
    name: "Solo Travelers",
    description: "Connect with solo travelers around the world",
    memberCount: 2100,
    image: "https://picsum.photos/202",
    isMember: false,
  },
  {
    _id: "4",
    name: "Budget Travel Tips",
    description: "Share and learn budget travel tips",
    memberCount: 1600,
    image: "https://picsum.photos/203",
    isMember: false,
  },
  {
    _id: "5",
    name: "Adventure Seekers",
    description: "For those who seek thrilling travel experiences",
    memberCount: 1800,
    image: "https://picsum.photos/204",
    isMember: false,
  },
];

export default function Communities() {
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>(mockJoinedCommunities);
  const [suggestedCommunities, setSuggestedCommunities] = useState<Community[]>(mockSuggestedCommunities);

  const handleJoinCommunity = (communityId: string) => {
    const community = suggestedCommunities.find((c) => c._id === communityId);
    if (community) {
      community.isMember = true;
      setJoinedCommunities([...joinedCommunities, community]);
      setSuggestedCommunities(suggestedCommunities.filter((c) => c._id !== communityId));
    }
  };

  const handleLeaveCommunity = (communityId: string) => {
    const community = joinedCommunities.find((c) => c._id === communityId);
    if (community) {
      community.isMember = false;
      setSuggestedCommunities([...suggestedCommunities, community]);
      setJoinedCommunities(joinedCommunities.filter((c) => c._id !== communityId));
    }
  };

  const renderCommunityCard = (community: Community) => (
    <View key={community._id} style={styles.communityCard}>
      <Image source={{ uri: community.image }} style={styles.communityImage} />
      <View style={styles.communityInfo}>
        <Text style={styles.communityName}>{community.name}</Text>
        <Text style={styles.communityDescription} numberOfLines={2}>
          {community.description}
        </Text>
        <Text style={styles.memberCount}>{community.memberCount} üye</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => router.push(`/community/${community._id}`)}
        >
          <Text style={styles.viewButtonText}>Görüntüle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.joinButton, community.isMember && styles.leaveButton]}
          onPress={() =>
            community.isMember
              ? handleLeaveCommunity(community._id)
              : handleJoinCommunity(community._id)
          }
        >
          <Text style={styles.joinButtonText}>
            {community.isMember ? "Ayrıl" : "Katıl"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Üye Olduğun Topluluklar</Text>
        {joinedCommunities.map(renderCommunityCard)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Önerilen Topluluklar</Text>
        {suggestedCommunities.map(renderCommunityCard)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  communityCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  communityImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  communityInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  communityName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  communityDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  memberCount: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  actionButtons: {
    justifyContent: "space-between",
    paddingLeft: 8,
  },
  viewButton: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  viewButtonText: {
    color: "#333",
    fontSize: 12,
    textAlign: "center",
  },
  joinButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 8,
  },
  leaveButton: {
    backgroundColor: "#FF3B30",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
}); 