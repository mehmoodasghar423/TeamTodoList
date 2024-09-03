# RayTech Team To-Do List App

This is a cross-platform mobile application built using **React Native** and **Firebase** for managing team to-do lists with role-based permissions. The app supports task creation, assignment, completion, and includes basic authentication.

## Features

- **Task Management**: Create, edit, delete, and mark tasks as complete.
- **Role-Based Permissions**: 
  - **Admins**: Can create, edit, delete tasks, and assign them to team members.
  - **Members**: Can view and mark tasks as complete.
- **Basic Authentication**: Sign up and log in using email and password.
- **Offline Support**: Users remain signed in even when offline (session persistence). *(Note: i forget but now due to time shortage, this feature is not implemented)*

## Bonus Features (if implemented)
- **Push Notifications**: Notify users when tasks are assigned or completed. *(Note: Did not work on this feature due to time constraints)*
- **Task Filtering**: Filter tasks by due date, priority, or assigned user.
- **Progress Tracking**: Show team progress with task completion metrics.

## Getting Started

Follow the instructions below to set up and run the app on your local environment.

### Prerequisites

Make sure you have the following tools installed:
- **Node.js** (>= 12.x)
- **npm** or **yarn**
- **Android Studio** (for Android development) or **Xcode** (for iOS development)
- **React Native CLI**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/raytech-todo-app.git
   cd TodoRayTech

2. Install the dependencies:

for android
   npm install  

for ios 
yarn install
cd ios && pod install
Note: Ensure any additional configuration needed for iOS is completed (e.g., adding necessary permissions to Info.plist).

3. Configure Firebase: (i done already and stored in project but do it if needed again)

Set up a Firebase project in the Firebase console.
Add an Android and/or iOS app to your Firebase project.
Download the google-services.json (for Android) and GoogleService-Info.plist (for iOS) files.
Place them in the appropriate directories:
android/app/ for google-services.json
ios/ for GoogleService-Info.plist

4. Run the app:

For Android:
npx react-native run-android
For iOS:
npx react-native run-ios


5. Ensure that your development environment is correctly set up for React Native. Follow the official React Native documentation to ensure your environment is ready to build and run React Native projects.



6. Folder Structure 
ToDORAYTECH/
├── android/              # Android-specific files
├── ios/                  # iOS-specific files
├── assets/               # contain fontsand  static assets
├── src/
│   ├── images/           # For images
│   ├── libs/             # New folder for libraries
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation logic (e.g., AuthNavigator, AppNavigator)
│   ├── screens/          # Application screens 
│   ├── services/         # Empty
│   ├── hooks/            # Custom hooks
│   ├── context/          # Context API setup
│   ├── styles/           # Global styles
│   └── App.js            # Entry point of the app
└── README.md             # Project documentation
