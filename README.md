# Travel App Frontend

A React Native mobile application for travelers to connect, share experiences, and join communities.

## Features Implemented

### Navigation Bar
- Home
- Search
- Communities
- Notifications
- Direct Messages
- Profile

### Profile Page
1. User Information Section
   - Profile picture
   - Background image
   - Username
   - Bio
   - Location
   - Interests (tags)
   - Travel style
   - Social media links (Instagram, Twitter)

2. Interaction Features
   - Add/Remove friend
   - Cancel friend request
   - Send message
   - Block/Unblock user
   - Report user
   - Profile options menu (three dots menu)

3. Posts Section
   - Post images
   - Post content
   - Like/Unlike functionality
   - Comments view
   - Like and comment counters
   - Timestamp

4. Privacy Features
   - Block user functionality
   - Content hiding for blocked users
   - Interaction restrictions

### Communities Page
1. Your Communities Section
   - Community cards with:
     - Community name
     - Member count
     - Description
     - View Community button

2. Recommended Communities Section
   - Similar card design with:
     - Community name
     - Member count
     - Description
     - View Community button
     - Join Community button

3. Community Features
   - Join community functionality
   - Member count display
   - Community description
   - Basic navigation setup

## Database Schema
The app follows a structured database schema for:
- Users (profile information, friends, blocks)
- Posts (content, likes, comments)
- Communities (members, descriptions)

## Styling
- Modern and clean UI design
- Consistent color scheme
- Shadow effects for cards
- Responsive buttons
- Status indicators
- Modal windows for additional features

## Next Steps
1. Implement remaining navigation pages:
   - Home
   - Search
   - Notifications
   - Direct Messages

2. Add features to Communities:
   - Community detail page
   - Post creation in communities
   - Member management
   - Community settings

3. Enhance Profile:
   - Post creation
   - Photo upload
   - Profile editing
   - Advanced privacy settings

4. Add Authentication:
   - Login
   - Registration
   - Password recovery

5. Implement Real-time Features:
   - Chat
   - Notifications
   - Post updates

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
