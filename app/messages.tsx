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

  const renderChatItem = ({ item }: { item: ChatPreview }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={{ uri: item.profilePicture }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.timeText}>{item.lastMessageTime}</Text>
        </View>
        <View style={styles.lastMessageContainer}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGroupChatItem = ({ item }: { item: GroupChat }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={{ uri: item.photo }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <View style={styles.groupNameContainer}>
            <Text style={styles.username}>{item.name}</Text>
            <Text style={styles.memberCount}>{item.members.length} members</Text>
          </View>
          <Text style={styles.timeText}>{item.lastMessageTime}</Text>
        </View>
        <View style={styles.lastMessageContainer}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

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
          renderItem={renderChatItem}
          keyExtractor={item => item.userId}
          style={styles.chatList}
        />
      ) : (
        <FlatList
          data={groupChats}
          renderItem={renderGroupChatItem}
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
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  groupNameContainer: {
    flex: 1,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  memberCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  lastMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  newMessageButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
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