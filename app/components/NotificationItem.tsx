import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationItemProps {
  notification: {
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
  };
  onPress: () => void;
}

export default function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const getNotificationIcon = (type: NotificationItemProps['notification']['type']) => {
    switch (type) {
      case 'like':
        return 'heart';
      case 'comment':
        return 'chatbubble';
      case 'friend_request':
        return 'person-add';
      case 'community':
        return 'people';
      case 'mention':
        return 'at';
      default:
        return 'notifications';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.notificationItem, !notification.isRead && styles.unreadItem]}
      onPress={onPress}
    >
      <View style={styles.notificationContent}>
        <Image source={{ uri: notification.user.image }} style={styles.userImage} />
        <View style={styles.textContainer}>
          <View style={styles.notificationHeader}>
            <Text style={styles.userName}>{notification.user.name}</Text>
            <Text style={styles.timestamp}>{notification.timestamp}</Text>
          </View>
          <Text style={styles.content}>{notification.content}</Text>
        </View>
        <View style={[styles.iconContainer, { backgroundColor: "#2667f2" }]}>
          <Ionicons name={getNotificationIcon(notification.type)} size={16} color="#fff" />
        </View>
      </View>
      {notification.relatedContent?.image && (
        <Image 
          source={{ uri: notification.relatedContent.image }} 
          style={styles.contentImage} 
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  unreadItem: {
    backgroundColor: '#f8f8f8',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  content: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 12,
  },
}); 