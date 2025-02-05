import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface CommunityCardProps {
  community: {
    _id: string;
    name: string;
    description: string;
    memberCount: number;
    image: string;
    isMember: boolean;
  };
  onView: (communityId: string) => void;
  onJoinLeave: (communityId: string) => void;
}

export default function CommunityCard({ community, onView, onJoinLeave }: CommunityCardProps) {
  return (
    <View style={styles.communityCard}>
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
          onPress={() => onView(community._id)}
        >
          <Text style={styles.viewButtonText}>Görüntüle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.joinButton, community.isMember && styles.leaveButton]}
          onPress={() => onJoinLeave(community._id)}
        >
          <Text style={styles.joinButtonText}>
            {community.isMember ? "Ayrıl" : "Katıl"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: "#2667f2",
    fontSize: 12,
    textAlign: "center",
  },
  joinButton: {
    backgroundColor: "#2667f2",
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