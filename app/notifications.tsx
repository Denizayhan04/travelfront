import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import NotificationItem from './components/NotificationItem';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'friend_request' | 'community' | 'mention';
  user: {
    id: string;
    name: string;
    image: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  relatedContent?: {
    id: string;
    type: 'post' | 'comment' | 'community';
    image?: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      id: 'u1',
      name: 'Ahmet Yılmaz',
      image: 'https://picsum.photos/200',
    },
    content: 'gönderini beğendi',
    timestamp: '5 dk önce',
    isRead: false,
    relatedContent: {
      id: 'p1',
      type: 'post',
      image: 'https://picsum.photos/400',
    },
  },
  {
    id: '2',
    type: 'comment',
    user: {
      id: 'u2',
      name: 'Zeynep Kaya',
      image: 'https://picsum.photos/201',
    },
    content: 'gönderine yorum yaptı: "Harika görünüyor!"',
    timestamp: '15 dk önce',
    isRead: false,
    relatedContent: {
      id: 'p2',
      type: 'post',
      image: 'https://picsum.photos/401',
    },
  },
  {
    id: '3',
    type: 'friend_request',
    user: {
      id: 'u3',
      name: 'Mehmet Demir',
      image: 'https://picsum.photos/202',
    },
    content: 'arkadaşlık isteği gönderdi',
    timestamp: '1 saat önce',
    isRead: true,
  },
  {
    id: '4',
    type: 'community',
    user: {
      id: 'c1',
      name: 'Europe Backpackers',
      image: 'https://picsum.photos/203',
    },
    content: 'topluluğunda yeni bir etkinlik paylaşıldı',
    timestamp: '2 saat önce',
    isRead: true,
    relatedContent: {
      id: 'c1',
      type: 'community',
    },
  },
  {
    id: '5',
    type: 'mention',
    user: {
      id: 'u4',
      name: 'Ayşe Yıldız',
      image: 'https://picsum.photos/204',
    },
    content: 'bir yorumda senden bahsetti',
    timestamp: '3 saat önce',
    isRead: true,
    relatedContent: {
      id: 'c1',
      type: 'comment',
    },
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const handleNotificationPress = (notification: Notification) => {
    Alert.alert("Bildirim", `${notification.user.name} - ${notification.content}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => handleNotificationPress(item)}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  },
}); 