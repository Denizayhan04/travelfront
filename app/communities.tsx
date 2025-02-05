import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import CommunityCard from "./components/CommunityCard";

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

  const handleViewCommunity = (communityId: string) => {
    router.push(`/community/${communityId}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Üye Olduğun Topluluklar</Text>
        {joinedCommunities.map((community) => (
          <CommunityCard
            key={community._id}
            community={community}
            onView={handleViewCommunity}
            onJoinLeave={handleLeaveCommunity}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Önerilen Topluluklar</Text>
        {suggestedCommunities.map((community) => (
          <CommunityCard
            key={community._id}
            community={community}
            onView={handleViewCommunity}
            onJoinLeave={handleJoinCommunity}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
}); 