import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: number;
  content: string;
  image: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  createdAt: string;
}

interface User {
  username: string;
  profilePicture: string;
  backgroundImage: string;
  bio: string;
  location: string;
  interests: string[];
  travelStyle: string;
  socialLinks: {
    instagram: string;
    twitter: string;
  };
  isFriend: boolean;
  isBlocked: boolean;
  friendRequestSent: boolean;
}

// Örnek kullanıcı verisi (Daha sonra API'den alınacak)
const mockUser = {
  username: "johndoe",
  profilePicture: "https://placekitten.com/200/200",
  backgroundImage: "https://placekitten.com/400/200",
  bio: "Adventure seeker and passionate traveler",
  location: "Istanbul, Turkey",
  interests: ["Hiking", "Photography", "Camping"],
  travelStyle: "Backpacker",
  socialLinks: {
    instagram: "johndoe",
    twitter: "johndoe"
  },
  isFriend: false,
  isBlocked: false,
  friendRequestSent: false
};

const mockPosts = [
  {
    id: 1,
    content: "Had an amazing day!",
    image: "https://placekitten.com/300/200",
    likes: 24,
    comments: [
      {
        id: 1,
        username: "jane",
        content: "Looks amazing!",
        createdAt: "1 hour ago"
      }
    ],
    isLiked: false,
    createdAt: "2 hours ago"
  },
  // Daha fazla post eklenebilir
];

export default function Profile() {
  const [showOptions, setShowOptions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [userState, setUserState] = useState<User>(mockUser);
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleFriendRequest = () => {
    if (userState.isFriend) {
      Alert.alert(
        "Remove Friend",
        "Are you sure you want to remove this user from your friends?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => {
              setUserState({
                ...userState,
                isFriend: false,
                friendRequestSent: false
              });
            }
          }
        ]
      );
    } else if (userState.friendRequestSent) {
      Alert.alert(
        "Cancel Request",
        "Are you sure you want to cancel the friend request?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => {
              setUserState({
                ...userState,
                friendRequestSent: false
              });
              Alert.alert("Friend request cancelled");
            }
          }
        ]
      );
    } else {
      setUserState({
        ...userState,
        friendRequestSent: true
      });
      Alert.alert("Friend request sent!");
    }
  };

  const handleBlock = () => {
    Alert.alert(
      userState.isBlocked ? "Unblock User" : "Block User",
      userState.isBlocked 
        ? "Are you sure you want to unblock this user?"
        : "Are you sure you want to block this user?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            setUserState({
              ...userState,
              isBlocked: !userState.isBlocked
            });
          }
        }
      ]
    );
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const renderOptionsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showOptions}
      onRequestClose={() => setShowOptions(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => setShowOptions(false)}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              handleBlock();
              setShowOptions(false);
            }}
          >
            <Ionicons
              name={userState.isBlocked ? "lock-open" : "lock-closed"}
              size={24}
              color="#666"
            />
            <Text style={styles.modalOptionText}>
              {userState.isBlocked ? "Unblock" : "Block"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              Alert.alert("User Reported");
              setShowOptions(false);
            }}
          >
            <Ionicons name="flag" size={24} color="#666" />
            <Text style={styles.modalOptionText}>Report</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderCommentsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showComments}
      onRequestClose={() => setShowComments(false)}
    >
      <View style={styles.commentsModal}>
        <View style={styles.commentsHeader}>
          <Text style={styles.commentsTitle}>Comments</Text>
          <TouchableOpacity onPress={() => setShowComments(false)}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.commentsList}>
          {selectedPost?.comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Text style={styles.commentUsername}>{comment.username}</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
              <Text style={styles.commentTime}>{comment.createdAt}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      {renderOptionsModal()}
      {renderCommentsModal()}
      
      {/* Background Image */}
      <Image
        source={{ uri: mockUser.backgroundImage }}
        style={styles.backgroundImage}
      />

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: mockUser.profilePicture }}
            style={styles.profilePicture}
          />
          <TouchableOpacity
            style={styles.optionsButton}
            onPress={() => setShowOptions(true)}
          >
            <Ionicons name="ellipsis-vertical" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.username}>{mockUser.username}</Text>
        <Text style={styles.bio}>{mockUser.bio}</Text>
        <Text style={styles.location}>
          <Ionicons name="location" size={16} /> {mockUser.location}
        </Text>

        {/* Add Friend / Send Message Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.button,
              userState.friendRequestSent && !userState.isFriend
                ? styles.pendingButton
                : userState.isFriend
                ? styles.friendButton
                : styles.addFriendButton
            ]}
            onPress={handleFriendRequest}
            disabled={userState.isBlocked}
          >
            <Text style={styles.buttonText}>
              {userState.friendRequestSent && !userState.isFriend
                ? 'Cancel Request'
                : userState.isFriend
                ? 'Friends'
                : 'Add Friend'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            disabled={userState.isBlocked}
          >
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {mockUser.interests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Travel Style */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Style</Text>
          <Text style={styles.travelStyle}>{mockUser.travelStyle}</Text>
        </View>

        {/* Social Media Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Media</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-instagram" size={24} color="#E1306C" />
              <Text style={styles.socialText}>{mockUser.socialLinks.instagram}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
              <Text style={styles.socialText}>{mockUser.socialLinks.twitter}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Posts */}
      {!userState.isBlocked && (
        <View style={styles.postsContainer}>
          <Text style={styles.sectionTitle}>Posts</Text>
          {posts.map((post) => (
            <View key={post.id} style={styles.post}>
              {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} />
              )}
              <Text style={styles.postContent}>{post.content}</Text>
              <View style={styles.postStats}>
                <TouchableOpacity
                  style={styles.postStat}
                  onPress={() => handleLike(post.id)}
                >
                  <Ionicons
                    name={post.isLiked ? "heart" : "heart-outline"}
                    size={16}
                    color={post.isLiked ? "#ff3b30" : "#666"}
                  />
                  <Text style={styles.postStatText}> {post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.postStat}
                  onPress={() => {
                    setSelectedPost(post);
                    setShowComments(true);
                  }}
                >
                  <Ionicons name="chatbubble-outline" size={16} color="#666" />
                  <Text style={styles.postStatText}> {post.comments.length}</Text>
                </TouchableOpacity>
                <Text style={styles.postTime}>{post.createdAt}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: 150,
  },
  profileContainer: {
    padding: 16,
    marginTop: -50,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 10,
  },
  optionsButton: {
    padding: 8,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#007AFF',
  },
  addFriendButton: {
    backgroundColor: '#007AFF',
  },
  friendButton: {
    backgroundColor: '#34C759',
  },
  pendingButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: '#666',
  },
  travelStyle: {
    fontSize: 16,
    color: '#666',
  },
  socialLinks: {
    flexDirection: 'row',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  socialText: {
    marginLeft: 5,
    color: '#666',
  },
  postsContainer: {
    padding: 16,
  },
  post: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  postStatText: {
    color: '#666',
  },
  postTime: {
    color: '#999',
    marginLeft: 'auto',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#666',
  },
  commentsModal: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentsList: {
    padding: 16,
  },
  commentItem: {
    marginBottom: 15,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  commentContent: {
    color: '#666',
    marginBottom: 2,
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
  },
}); 