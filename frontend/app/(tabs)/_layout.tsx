// import { colors } from "@/constants/Colors";
// import { Tabs } from "expo-router";
// import { Dumbbell, Home, LineChart, User, Utensils } from "lucide-react-native";
// import React from "react";

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: colors.accent,
//         tabBarInactiveTintColor: colors.text.muted,
//         tabBarStyle: {
//           backgroundColor: colors.background.secondary,
//           borderTopColor: colors.divider,
//         },
//         headerStyle: {
//           backgroundColor: colors.background.main,
//         },
//         headerTitleStyle: {
//           fontWeight: "600",
//           color: colors.text.primary,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Dashboard",
//           tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="food"
//         options={{
//           title: "Food",
//           tabBarIcon: ({ color, size }) => (
//             <Utensils size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="exercise"
//         options={{
//           title: "Exercise",
//           tabBarIcon: ({ color, size }) => (
//             <Dumbbell size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="progress"
//         options={{
//           title: "Progress",
//           tabBarIcon: ({ color, size }) => (
//             <LineChart size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }


import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialIcons,MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: 'Diary',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="book" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.progressTab}>
              <Ionicons 
                name="add" 
                size={24} 
                color={'white'} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="food"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="chart-line" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dots-horizontal" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingTop: 8,
    paddingBottom: 12,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    borderRadius: 15,
    shadowOpacity: 1.5,
    shadowRadius: 8,
    backgroundColor: 'white',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  progressTab: {
    backgroundColor: colors.primary,
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOpacity: 0.5,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
});