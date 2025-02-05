import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  ActionSheetIOS,
  Alert,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import Post from "./components/Post";
import CommentModal from "./components/CommentModal";

interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface Post {
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
}

// Mock yorumlar
const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Ahmet Yılmaz',
      image: 'https://picsum.photos/200',
    },
    content: 'Harika görünüyor! Ben de gitmek istiyorum 😍',
    createdAt: '2 saat önce',
    likes: 5,
    isLiked: false,
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Zeynep Kaya',
      image: 'https://picsum.photos/201',
    },
    content: 'Hangi mevsimde gittin? Biz de planlamayı düşünüyoruz.',
    createdAt: '1 saat önce',
    likes: 3,
    isLiked: true,
  },
];

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      id: "u1",
      name: "Ahmet Yılmaz",
      image: "https://picsum.photos/200",
      type: "user",
    },
    content: "Kapadokya'da muhteşem bir gün! Balon turu herkese tavsiye ederim 🎈",
    images: ["https://picsum.photos/400/300"],
    likes: 124,
    comments: 18,
    createdAt: "2 saat önce",
    isLiked: false,
  },
  {
    id: "2",
    author: {
      id: "c1",
      name: "Europe Backpackers",
      image: "https://picsum.photos/201",
      type: "community",
    },
    content: "Roma'da gezilecek en iyi 10 yer! Detaylı rehber yorumlarda 👇",
    images: ["https://picsum.photos/401/300"],
    likes: 256,
    comments: 45,
    createdAt: "4 saat önce",
    isLiked: true,
  },
  {
    id: "3",
    author: {
      id: "u2",
      name: "Zeynep Kaya",
      image: "https://picsum.photos/202",
      type: "user",
    },
    content: "Amsterdam'da bisiklet turu. Şehri keşfetmenin en güzel yolu! 🚲",
    images: ["https://picsum.photos/402/300"],
    likes: 89,
    comments: 12,
    createdAt: "6 saat önce",
    isLiked: false,
  },
  {
    id: "4",
    author: {
      id: "c2",
      name: "Budget Travel Tips",
      image: "https://picsum.photos/203",
      type: "community",
    },
    content: "Avrupa'da ucuz konaklama için en iyi hostel önerileri ve püf noktaları",
    likes: 178,
    comments: 34,
    createdAt: "8 saat önce",
    isLiked: false,
  },
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [showComments, setShowComments] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleOptionsPress = (post: Post) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["İptal", "Postu Kaydet", "Postu Şikayet Et", "Paylaş"],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 2,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 1:
              Alert.alert("Bilgi", "Post kaydedildi!");
              break;
            case 2:
              Alert.alert("Bilgi", "Post şikayet edildi!");
              break;
            case 3:
              Alert.alert("Bilgi", "Paylaşım seçenekleri açıldı!");
              break;
          }
        }
      );
    } else {
      Alert.alert(
        "Post Seçenekleri",
        "Ne yapmak istersiniz?",
        [
          { text: "İptal", style: "cancel" },
          { text: "Postu Kaydet", onPress: () => Alert.alert("Bilgi", "Post kaydedildi!") },
          { text: "Postu Şikayet Et", onPress: () => Alert.alert("Bilgi", "Post şikayet edildi!"), style: "destructive" },
          { text: "Paylaş", onPress: () => Alert.alert("Bilgi", "Paylaşım seçenekleri açıldı!") },
        ]
      );
    }
  };

  const handlePostPress = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  const handleCommentPress = (postId: string) => {
    setSelectedPostId(postId);
    setShowComments(true);
  };

  const handleAddComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        id: 'currentUser',
        name: 'Kullanıcı',
        image: 'https://picsum.photos/205',
      },
      content,
      createdAt: 'Şimdi',
      likes: 0,
      isLiked: false,
    };
    setComments([newComment, ...comments]);

    // Yorum sayısını güncelle
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
            }
          : post
      )
    );
  };

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            }
          : comment
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {posts.map((post) => (
          <TouchableOpacity 
            key={post.id} 
            onPress={() => handlePostPress(post.id)}
            activeOpacity={1}
          >
            <Post
              post={post}
              onLike={handleLike}
              onOptionsPress={handleOptionsPress}
              onCommentPress={() => handleCommentPress(post.id)}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedPostId && (
        <CommentModal
          visible={showComments}
          onClose={() => {
            setShowComments(false);
            setSelectedPostId(null);
          }}
          postId={selectedPostId}
          comments={comments}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});
