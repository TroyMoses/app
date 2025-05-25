# 🥔 Legacy Potato Doctor

A modern React Native mobile application that uses AI-powered image recognition to help farmers identify common potato plant diseases. Built with Expo and featuring a sleek, user-friendly interface with advanced gesture controls and bookmarking capabilities.

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![NativeWind](https://img.shields.io/badge/NativeWind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📱 Features

### Core Functionality
- **AI Disease Detection**: Upload or capture images of potato plants for instant disease identification
- **Comprehensive Disease Library**: Browse detailed information about common potato diseases
- **Bookmarking System**: Save important diseases for quick reference
- **Search & Filter**: Find specific diseases quickly with real-time search
- **Daily Tips**: Get randomized farming tips to improve plant health

### User Experience
- **Swipe Gestures**: Intuitive swipe-to-reveal actions for bookmarking and details
- **Modern UI**: Clean, cozy design with smooth animations and transitions
- **Dark/Light Mode**: Automatic theme adaptation based on system preferences
- **Offline Storage**: Bookmarks persist locally using AsyncStorage
- **Recent Images**: Quick access to previously analyzed images

### Technical Features
- **Cross-Platform**: Works on both iOS and Android
- **Gesture Handler**: Advanced touch interactions with react-native-gesture-handler
- **Animated UI**: Smooth animations using react-native-reanimated
- **Custom Fonts**: Beautiful Poppins font family for enhanced readability
- **Safe Area Support**: Proper handling of device notches and status bars

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TroyMoses/potato-disease-detection.git
   cd potato-disease-detection
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

### Environment Setup

Create a `.env` file in the root directory and add your API configuration:

```env
API_URL=http://your-api-endpoint:8000/predict
```

## 📁 Project Structure

```
app/
├── (tabs)/                 # Tab-based navigation screens
│   ├── index.tsx          # Home screen
│   ├── explore.tsx        # Disease library with search
│   ├── predict.tsx        # AI prediction screen
│   ├── bookmarks.tsx      # Saved diseases
│   ├── about.tsx          # App information
│   └── _layout.tsx        # Tab navigation layout
├── _layout.tsx            # Root layout with providers
├── +not-found.tsx         # 404 error screen
└── assets/                # Static assets
    ├── fonts/             # Custom font files
    └── images/            # Disease images and backgrounds

components/
├── ui/                    # Reusable UI components
│   ├── IconSymbol.tsx     # Cross-platform icons
│   └── TabBarBackground.tsx # Tab bar styling
├── TipOfTheDay.tsx        # Daily tips component
├── HapticTab.tsx          # Haptic feedback for tabs
└── ...                    # Other utility components

constants/
├── Colors.ts              # App color scheme
└── diseaseData.ts         # Disease information database

context/
└── BookmarkContext.tsx    # Bookmark state management

hooks/
├── useColorScheme.ts      # Theme detection
└── useThemeColor.ts       # Color utilities
```

## 🎨 Design System

### Typography
- **Primary Font**: Poppins (Regular, Medium, SemiBold, Bold)
- **Monospace Font**: Space Mono (for code/technical content)

### Color Palette
- **Primary Blue**: #007AFF
- **Success Green**: #4CAF50
- **Warning Orange**: #FF9800
- **Error Red**: #FF3B30
- **Background**: Dynamic based on theme

### Components
- **Cards**: Rounded corners (16px), subtle shadows
- **Buttons**: Consistent padding, haptic feedback
- **Icons**: SF Symbols (iOS) / Material Icons (Android)

## 🔧 API Integration

### Prediction Endpoint

The app expects a REST API endpoint that accepts image uploads:

```typescript
POST /predict
Content-Type: multipart/form-data

Body: {
  file: ImageFile
}

Response: {
  class: string,        // Disease name
  confidence: number    // Confidence score (0-1 or 0-100)
}
```

### Mock Implementation

For development, the app includes mock responses:

```typescript
const mockResponses = {
  "early-blight": { class: "Early Blight", confidence: "0.925" },
  "late-blight": { class: "Late Blight", confidence: "0.897" },
  // ... more diseases
}
```

## 📊 Disease Database

The app includes information for 7 common potato diseases:

1. **Early Blight** - Dark target-like spots on older leaves
2. **Late Blight** - Rapidly spreading brown lesions
3. **Potato Leaf Roll** - Upward rolling of leaves with yellowing
4. **Septoria Leaf Spot** - Small dark spots with yellow halos
5. **Psyllid Yellows** - Yellowing and curling of upper leaves
6. **Black Dot** - Small black dots on stems and tubers
7. **Blackleg** - Black stem base and wilting

Each disease entry includes:
- High-quality reference images
- Short description for quick identification
- Detailed symptoms, impact, and management information

## 🎯 User Interactions

### Gesture Controls

1. **Swipe Left on Disease Cards**: Reveal bookmark and details actions
2. **Swipe Left/Right on Images**: Clear current prediction
3. **Pull to Refresh**: Refresh disease library (planned feature)
4. **Pinch to Zoom**: Zoom into disease images (planned feature)

### Navigation Flow

1. **Home Screen**: Overview and quick access to main features
2. **Explore Screen**: Browse and search disease library
3. **Predict Screen**: Capture/upload images for analysis
4. **Bookmarks Screen**: View saved diseases
5. **About Screen**: App information and contact details

## 🔒 Data Storage

### Local Storage (AsyncStorage)
- **Bookmarks**: Persisted disease IDs
- **Recent Images**: Image URIs for quick access
- **User Preferences**: Theme settings, tip preferences

### No External Database Required
- All disease information is bundled with the app
- No user accounts or cloud storage needed
- Fully functional offline (except for AI predictions)

## 🧪 Testing

### Running Tests

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run E2E tests (if configured)
npm run test:e2e
```

### Test Coverage Areas
- Component rendering
- Gesture interactions
- API integration
- Local storage operations
- Navigation flows

## 📱 Platform-Specific Features

### iOS
- SF Symbols for native icon appearance
- Haptic feedback on interactions
- Blur effects for tab bar
- Native navigation animations

### Android
- Material Design icons
- Edge-to-edge display support
- Android-specific animations
- Adaptive icon support

## 🚀 Deployment

### Building for Production

```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android

# Or use EAS Build (recommended)
npx eas build --platform all
```

### App Store Submission

1. **iOS App Store**
   - Configure app.json with proper bundle identifier
   - Add required privacy descriptions
   - Submit through App Store Connect

2. **Google Play Store**
   - Generate signed APK/AAB
   - Configure store listing
   - Submit through Google Play Console

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow React Native best practices
- Use Prettier for code formatting
- Add JSDoc comments for complex functions

### Adding New Diseases

1. Add disease images to `assets/images/`
2. Update `constants/diseaseData.ts` with new disease information
3. Test the new disease in the explore and prediction screens

## 🐛 Troubleshooting

### Common Issues

1. **Gesture Handler Errors**
   - Ensure GestureHandlerRootView wraps the entire app
   - Check react-native-gesture-handler installation

2. **Font Loading Issues**
   - Verify font files are in the correct directory
   - Check font names match exactly in the code

3. **Image Picker Permissions**
   - Add camera and photo library permissions to app.json
   - Handle permission requests properly

4. **API Connection Issues**
   - Verify API_URL in environment configuration
   - Check network connectivity
   - Ensure API endpoint is accessible from device

### Performance Optimization

- Use `React.memo` for expensive components
- Implement lazy loading for large image lists
- Optimize image sizes and formats
- Use FlatList for large datasets

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: TroyLegacy
- **Email**: troylegacy256@gmail.com
- **Website**: https://troylegacy.vercel.app

## 🙏 Acknowledgments

- Disease information sourced from agricultural research institutions
- Icons provided by SF Symbols and Material Design
- Background images from agricultural photography collections
- AI model training data from plant pathology databases

## 📈 Roadmap

### Upcoming Features

- [ ] Offline AI model for predictions
- [ ] Multi-language support
- [ ] Weather integration for disease risk assessment
- [ ] Community forum for farmers
- [ ] Treatment recommendation system
- [ ] Crop rotation planning tools
- [ ] Push notifications for disease alerts

### Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added gesture controls and bookmarking
- **v1.2.0** - Enhanced UI with custom fonts and animations

---

For more information, visit our [documentation site](https://github.com/TroyMoses/potato-disease-detection) or contact our support team.
