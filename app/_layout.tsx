import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1a2f5a',
            borderTopWidth: 0,
            height: 60,
            paddingVertical: 10,
            paddingTop: 5,
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#8e9baf',
          tabBarShowLabel: false,
          tabBarIconStyle: {
            width: 32,
            height: 32,
          }
        }}
      >
        <Tabs.Screen 
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "home" : "home-outline"} size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen 
          name="matching"
          options={{
            title: "Matching",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "swap-horizontal" : "swap-horizontal-outline"} size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen 
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "search" : "search-outline"} size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen 
          name="communities"
          options={{
            title: "Communities",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "people" : "people-outline"} size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen 
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "person" : "person-outline"} size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
} 