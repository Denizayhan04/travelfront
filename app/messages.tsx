import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChatItem from './components/ChatItem';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  image?: string;
  read: boolean;
  createdAt: string;
}

interface GroupMessage {
  senderId: string;
  content: string;
  image?: string;
  readBy: {
    userId: string;
    readAt: string;
  }[];
}

interface GroupChat {
  id: string;
  name: string;
  description: string;
  photo: string;
  members: {
    userId: string;
    role: 'admin' | 'member';
    joinedAt: string;
  }[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface ChatPreview {
  userId: string;
  username: string;
  profilePicture: string;
  lastMessage: string;
  unreadCount: number;
  lastMessageTime: string;
}

// Mock data for direct chats
const mockChats: ChatPreview[] = [
  {
    userId: "1",
    username: "Jane Smith",
    profilePicture: "https://placekitten.com/100/100",
    lastMessage: "See you tomorrow then!",
    unreadCount: 2,
    lastMessageTime: "2 min ago"
  },
  {
    userId: "2",
    username: "Mike Johnson",
    profilePicture: "https://placekitten.com/101/101",
    lastMessage: "Great travel plans!",
    unreadCount: 0,
    lastMessageTime: "1 hour ago"
  },
];

// Mock data for group chats
const mockGroupChats: GroupChat[] = [
  {
    id: "1",
    name: "Europe Backpackers",
    description: "Group for backpackers traveling in Europe",
    photo: "https://placekitten.com/102/102",
    members: [
      { userId: "1", role: "admin", joinedAt: "2024-01-01" },
      { userId: "2", role: "member", joinedAt: "2024-01-02" },
      { userId: "3", role: "member", joinedAt: "2024-01-03" },
    ],
    lastMessage: "Who's in Paris next week?",
    lastMessageTime: "5 min ago",
    unreadCount: 3
  },
  {
    id: "2",
    name: "Asia Travel Plans",
    description: "Planning trips across Asia",
    photo: "https://placekitten.com/103/103",
    members: [
      { userId: "1", role: "member", joinedAt: "2024-01-01" },
      { userId: "4", role: "admin", joinedAt: "2024-01-01" },
    ],
    lastMessage: "Check out this temple in Thailand!",
    lastMessageTime: "1 day ago",
    unreadCount: 0
  },
];

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'direct' | 'groups'>('direct');
  const [chats, setChats] = useState<ChatPreview[]>(mockChats);
  const [groupChats, setGroupChats] = useState<GroupChat[]>(mockGroupChats);

  const handleChatPress = (chatId: string) => {
    // TODO: Navigate to chat detail
    console.log('Navigate to chat:', chatId);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'direct' && styles.activeTab]}
          onPress={() => setActiveTab('direct')}
        >
          <Text style={[styles.tabText, activeTab === 'direct' && styles.activeTabText]}>
            Direct Messages
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
          onPress={() => setActiveTab('groups')}
        >
          <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>
            Group Chats
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      {activeTab === 'direct' ? (
        <FlatList
          data={chats}
          renderItem={({ item }) => (
            <ChatItem
              chat={item}
              onPress={() => handleChatPress(item.userId)}
            />
          )}
          keyExtractor={item => item.userId}
          style={styles.chatList}
        />
      ) : (
        <FlatList
          data={groupChats}
          renderItem={({ item }) => (
            <ChatItem
              chat={{
                userId: item.id,
                username: item.name,
                profilePicture: item.photo,
                lastMessage: item.lastMessage,
                lastMessageTime: item.lastMessageTime,
                unreadCount: item.unreadCount,
                isGroup: true,
                memberCount: item.members.length,
              }}
              onPress={() => handleChatPress(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          style={styles.chatList}
        />
      )}

      {/* New Message/Group Button */}
      <TouchableOpacity style={styles.newMessageButton}>
        <Ionicons 
          name={activeTab === 'direct' ? "create" : "people"} 
          size={24} 
          color="#fff" 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: 16,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2667f2',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#2667f2',
    fontWeight: '600',
  },
  chatList: {
    flex: 1,
  },
  newMessageButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2667f2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 