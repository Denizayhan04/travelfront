import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PostProps {
  post: {
    id: string;
    author: {
      id: string;
      name: string;
      image: string;
      type: "user" | "community";
    };
    content: string;
    images?: string[];
    likes: number;
    comments: number;
    createdAt: string;
    isLiked: boolean;
  };
  onLike: (postId: string) => void;
  onOptionsPress: (post: any) => void;
  onCommentPress?: () => void;
}

export default function Post({ post, onLike, onOptionsPress, onCommentPress }: PostProps) {
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <Image source={{ uri: post.author.image }} style={styles.authorImage} />
          <View>
            <Text style={styles.authorName}>{post.author.name}</Text>
            {post.author.type === "community" && (
              <Text style={styles.communityLabel}>Topluluk</Text>
            )}
            <Text style={styles.postTime}>{post.createdAt}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => onOptionsPress(post)}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      {post.images && (
        <Image source={{ uri: post.images[0] }} style={styles.postImage} />
      )}

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onLike(post.id)}
        >
          <Ionicons
            name={post.isLiked ? "heart" : "heart-outline"}
            size={24}
            color={post.isLiked ? "#2667f2" : "#666"}
          />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: "#fff",
    marginBottom: 8,
    padding: 16,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  communityLabel: {
    fontSize: 12,
    color: "#2667f2",
    marginTop: 2,
  },
  postTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  postContent: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    lineHeight: 22,
  },
  postImage: {
    width: Dimensions.get("window").width - 32,
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  actionText: {
    marginLeft: 4,
    color: "#666",
    fontSize: 14,
  },
}); 