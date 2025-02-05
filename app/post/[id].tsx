import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Post from '../components/Post';
import CommentModal from '../components/CommentModal';

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

// Mock veriler (gerçek uygulamada API'den gelecek)
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

export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(mockComments);

  // Mock post verisi (gerçek uygulamada API'den gelecek)
  const post = {
    id: id as string,
    author: {
      id: "u1",
      name: "Ahmet Yılmaz",
      image: "https://picsum.photos/200",
      type: "user" as const,
    },
    content: "Kapadokya'da muhteşem bir gün! Balon turu herkese tavsiye ederim 🎈",
    images: ["https://picsum.photos/400/300"],
    likes: 124,
    comments: comments.length,
    createdAt: "2 saat önce",
    isLiked: false,
  };

  const handleLike = () => {
    // Post beğenme işlemi
  };

  const handleOptionsPress = () => {
    // Post seçenekleri
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
    <View style={styles.container}>
      <ScrollView>
        <Post
          post={post}
          onLike={handleLike}
          onOptionsPress={handleOptionsPress}
          onCommentPress={() => setShowComments(true)}
        />
      </ScrollView>

      <CommentModal
        visible={showComments}
        onClose={() => setShowComments(false)}
        postId={post.id}
        comments={comments}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 