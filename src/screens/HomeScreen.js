import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SvgXml } from 'react-native-svg';

const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [currentTask, setCurrentTask] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const tasks = [
    {
      id: 1,
      title: "Turn off lights when leaving",
      description: "Take a photo of switched off lights to earn 2 seeds.",
      image: require('../../assets/image 29-2.png'),
      type: "lights"
    },
    {
      id: 2,
      title: "Use stairs instead of elevator",
      description: "Show yourself using stairs to earn 3 seeds.",
      image: require('../../assets/image 29-2.png'),
      type: "stairs"
    },
    {
      id: 3,
      title: "Unplug unused electronics",
      description: "Take a photo of unplugged devices to earn 2 seeds.",
      image: require('../../assets/image 29-2.png'),
      type: "unplug"
    },
    {
      id: 4,
      title: "Use natural light during day",
      description: "Show your room with natural lighting to earn 1 seed.",
      image: require('../../assets/image 29-2.png'),
      type: "natural"
    },
    {
      id: 5,
      title: "Clean rubbish from tree roots",
      description: "Remove litter around tree bases to help them grow healthy. Earn 4 seeds.",
      image: require('../../assets/image 29-2.png'),
      type: "tree_cleaning"
    }
  ];

  // Fake AI Analysis Function
  const analyzeImage = (taskType) => {
    const responses = {
      lights: [
        {
          title: "Light Saver! 💡",
          message: "Great job turning off lights! You're saving energy and money. You've earned 2 seeds!",
          points: "+2 Seeds",
          color: "#0D5B10"
        },
        {
          title: "Energy Conscious! ⚡",
          message: "Excellent light management! You're reducing electricity waste. You've earned 2 seeds!",
          points: "+2 Seeds",
          color: "#0D5B10"
        }
      ],
      stairs: [
        {
          title: "Stair Master! 🏃‍♂️",
          message: "Fantastic choice using stairs! You're getting exercise and saving energy. You've earned 3 seeds!",
          points: "+3 Seeds",
          color: "#0D5B10"
        },
        {
          title: "Eco Athlete! 🏃‍♀️",
          message: "Amazing stair usage! You're being healthy and green. You've earned 3 seeds!",
          points: "+3 Seeds",
          color: "#0D5B10"
        }
      ],
      unplug: [
        {
          title: "Power Saver! 🔌",
          message: "Great job unplugging devices! You're preventing phantom energy waste. You've earned 2 seeds!",
          points: "+2 Seeds",
          color: "#0D5B10"
        },
        {
          title: "Smart Unplugger! ⚡",
          message: "Excellent device management! You're cutting unnecessary power consumption. You've earned 2 seeds!",
          points: "+2 Seeds",
          color: "#0D5B10"
        }
      ],
      natural: [
        {
          title: "Sunlight Lover! ☀️",
          message: "Perfect use of natural light! You're reducing artificial lighting needs. You've earned 1 seed!",
          points: "+1 Seed",
          color: "#0D5B10"
        },
        {
          title: "Daylight Champion! 🌞",
          message: "Wonderful natural lighting! You're embracing sustainable illumination. You've earned 1 seed!",
          points: "+1 Seed",
          color: "#0D5B10"
        }
      ],
      tree_cleaning: [
        {
          title: "Tree Guardian! 🌳",
          message: "Amazing work cleaning around tree roots! You're helping trees grow healthy and strong. You've earned 4 seeds!",
          points: "+4 Seeds",
          color: "#0D5B10"
        },
        {
          title: "Root Protector! 🌱",
          message: "Excellent tree care! Removing rubbish helps roots breathe and absorb nutrients better. You've earned 4 seeds!",
          points: "+4 Seeds",
          color: "#0D5B10"
        }
      ]
    };
    
    const taskResponses = responses[taskType] || responses.lights;
    const randomResponse = taskResponses[Math.floor(Math.random() * taskResponses.length)];
    setAiAnalysis(randomResponse);
    setShowAnalysisModal(true);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      "Add Proof Photo",
      "Choose how you want to add your proof photo",
      [
        { text: "Camera", onPress: takePhoto },
        { text: "Gallery", onPress: pickImage },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const submitProof = () => {
    if (selectedImage) {
      setIsAnalyzing(true);
      // Simulate AI analysis delay
      setTimeout(() => {
        const currentTaskData = tasks[currentTask];
        analyzeImage(currentTaskData.type);
        setIsAnalyzing(false);
      }, 2000); // 2 second delay
    } else {
      Alert.alert("No Photo", "Please add a photo first to submit your proof.");
    }
  };

  const nextTask = () => {
    setCurrentTask((prev) => (prev + 1) % tasks.length);
    setSelectedImage(null);
  };

  const prevTask = () => {
    setCurrentTask((prev) => (prev - 1 + tasks.length) % tasks.length);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* User Greeting Section */}
          <View style={styles.greetingSection}>
            <View style={styles.userInfo}>
              <View style={styles.profileContainer}>
                <View style={styles.profileCircle}>
                  <Image 
                    source={require('../../assets/image 25.png')} 
                    style={styles.profileImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View style={styles.userText}>
                <Text style={styles.greetingText}>Hello, Aytac !</Text>
                <Text style={styles.subGreetingText}>It's nice to see you again.</Text>
              </View>
            </View>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Image 
                source={require('../../assets/Component 2.jpg')} 
                style={styles.searchIcon}
                resizeMode="contain"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#6A6A6A"
              />
            </View>
          </View>

          {/* Fimo Message Section */}
          <View style={styles.fimoSection}>
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>
                Hi! I'm Fimo — your green buddy from Flomino!  Got a good deed or eco-habit to share today?  Let's make the world greener together! 
              </Text>
            </View>
            <Image 
              source={require('../../assets/image 25.png')} 
              style={styles.fimoCharacter}
              resizeMode="contain"
            />
          </View>

          {/* Activity Statistics */}
          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>120</Text>
              <Text style={styles.statLabel}>Fimo feeds</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>2,3 kg</Text>
              <Text style={styles.statLabel}>Waste reduce</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1,5 l</Text>
              <Text style={styles.statLabel}>Water saved</Text>
            </View>
          </View>

          {/* Daily Tasks Section */}
          <View style={styles.tasksSection}>
            <View style={styles.tasksHeader}>
              <Text style={styles.tasksTitle}>Daily task</Text>
              <View style={styles.taskNavigation}>
                <TouchableOpacity style={styles.navButton} onPress={prevTask}>
                  <Text style={styles.navButtonText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.taskCounter}>{currentTask + 1} / {tasks.length}</Text>
                <TouchableOpacity style={styles.navButton} onPress={nextTask}>
                  <Text style={styles.navButtonText}>›</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Task Cards */}
            <View style={styles.taskCards}>
              <View style={styles.taskCard}>
                <View style={styles.taskContent}>
                  <Image 
                    source={tasks[currentTask].image} 
                    style={styles.taskImage}
                    resizeMode="contain"
                  />
                  <View style={styles.taskTextContainer}>
                    <View style={styles.taskTitleContainer}>
                      <Text style={styles.taskTitle}>{tasks[currentTask].title}</Text>
                      <Text style={styles.taskDescription}>{tasks[currentTask].description}</Text>
                    </View>
                    <View style={styles.taskButtons}>
                      <TouchableOpacity style={styles.completeButton}>
                        <Text style={styles.buttonText}>Complete mission</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.proofButton} onPress={showImageOptions}>
                        <Text style={styles.buttonText}>Add proof</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.taskCard}>
                <View style={styles.taskContent}>
                  <Image 
                    source={tasks[currentTask].image} 
                    style={styles.taskImage}
                    resizeMode="contain"
                  />
                  <View style={styles.taskTextContainer}>
                    <View style={styles.taskTitleContainer}>
                      <Text style={styles.taskTitle}>{tasks[currentTask].title}</Text>
                      <Text style={styles.taskDescription}>{tasks[currentTask].description}</Text>
                    </View>
                    <View style={styles.taskButtons}>
                      <TouchableOpacity style={styles.completeButton}>
                        <Text style={styles.buttonText}>Complete mission</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.proofButton} onPress={showImageOptions}>
                        <Text style={styles.buttonText}>Add proof</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Image Preview Section */}
            {selectedImage && (
              <View style={styles.imagePreviewSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Proof Photo</Text>
                </View>
                <View style={styles.imagePreviewCard}>
                  <Image source={{ uri: selectedImage }} style={styles.previewImage} />
                  <View style={styles.imageActions}>
                    <TouchableOpacity style={styles.submitButton} onPress={submitProof}>
                      <Text style={styles.submitButtonText}>Submit for AI Analysis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.changeImageButton} onPress={showImageOptions}>
                      <Text style={styles.changeImageText}>Change Photo</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* AI Analysis Modal */}
      <Modal
        visible={showAnalysisModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAnalysisModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{aiAnalysis?.title}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowAnalysisModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Image 
                source={{ uri: selectedImage }} 
                style={styles.modalImage}
                resizeMode="cover"
              />
              <Text style={styles.modalMessage}>{aiAnalysis?.message}</Text>
              <View style={styles.pointsContainer}>
                <Text style={[styles.pointsText, { color: aiAnalysis?.color }]}>
                  {aiAnalysis?.points}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => {
                setShowAnalysisModal(false);
                setSelectedImage(null);
              }}
            >
              <Text style={styles.modalButtonText}>Awesome!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* AI Analyzing Loading Modal */}
      <Modal
        visible={isAnalyzing}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContent}>
            <View style={styles.loadingSpinner}>
              <Text style={styles.loadingSpinnerText}>🤖</Text>
            </View>
            <Text style={styles.loadingTitle}>AI Analyzing...</Text>
            <Text style={styles.loadingSubtitle}>Please wait while our AI analyzes your photo</Text>
            <View style={styles.loadingDots}>
              <Text style={styles.loadingDot}>●</Text>
              <Text style={styles.loadingDot}>●</Text>
              <Text style={styles.loadingDot}>●</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 13,
    paddingTop: 20,
    paddingBottom: 100,
  },
  greetingSection: {
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  profileContainer: {
    width: 62,
    height: 62,
  },
  profileCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.2,
    borderColor: 'rgba(13, 91, 16, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 34,
    height: 50,
    borderRadius: 17,
  },
  userText: {
    flex: 1,
    gap: 6,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    letterSpacing: -0.5,
  },
  subGreetingText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
  },
  searchContainer: {
    height: 40,
    backgroundColor: '#FEFEFE',
    borderWidth: 0.2,
    borderColor: 'rgba(13, 91, 16, 0.6)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 7,
  },
  searchIcon: {
    width: 25,
    height: 25,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#6A6A6A',
    letterSpacing: -0.5,
  },
  fimoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  messageBubble: {
    width: 286,
    height: 100,
    backgroundColor: 'rgba(229, 245, 224, 0.43)',
    borderWidth: 0.2,
    borderColor: 'rgba(35, 139, 69, 0.6)',
    borderRadius: 25,
    paddingHorizontal: 21,
    paddingVertical: 8,
    marginRight: -22,
  },
  messageText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    lineHeight: 18,
    letterSpacing: -0.5,
  },
  fimoCharacter: {
    width: 83,
    height: 124,
  },
  statsSection: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    height: 90,
    backgroundColor: 'rgba(229, 245, 224, 0.43)',
    borderWidth: 0.2,
    borderColor: 'rgba(35, 139, 69, 0.6)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#0D5B10',
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
  },
  tasksSection: {
    marginBottom: 15,
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(0, 0, 0, 0.6)',
    letterSpacing: -0.5,
  },
  taskCards: {
    gap: 10,
  },
  taskCard: {
    width: 349,
    height: 126,
    backgroundColor: '#FFFCF4',
    borderWidth: 0.2,
    borderColor: 'rgba(255, 192, 0, 0.6)',
    borderRadius: 15,
    position: 'relative',
  },
  taskContent: {
    position: 'absolute',
    width: 317,
    height: 109,
    left: '50%',
    marginLeft: -158.5,
    top: '50%',
    marginTop: -54.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskImage: {
    width: 109,
    height: 109,
    borderRadius: 54.5,
  },
  taskIconContainer: {
    width: 109,
    height: 109,
    borderRadius: 54.5,
    backgroundColor: 'rgba(13, 91, 16, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  taskIcon: {
    fontSize: 50,
    textAlign: 'center',
  },
  taskTextContainer: {
    width: 192,
    height: 93,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    marginLeft: 10,
  },
  taskTitleContainer: {
    width: 192,
    height: 56,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    letterSpacing: -0.5,
    width: 192,
    height: 17,
    lineHeight: 17,
  },
  taskDescription: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    lineHeight: 17,
    letterSpacing: -0.5,
    width: 162,
    height: 34,
  },
  taskButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 208,
    height: 27,
  },
  completeButton: {
    backgroundColor: '#62AFA7',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 27,
  },
  proofButton: {
    backgroundColor: '#F3CB80',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 27,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    lineHeight: 17,
  },
  // Task Navigation Styles
  taskNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  navButton: {
    width: 30,
    height: 30,
    backgroundColor: '#0D5B10',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  taskCounter: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    letterSpacing: -0.5,
  },
  // Image Preview Styles
  imagePreviewSection: {
    gap: 15,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
  },
  imagePreviewCard: {
    width: 344,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(13, 91, 16, 0.2)',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    gap: 16,
  },
  previewImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  imageActions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#0D5B10',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  changeImageButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0D5B10',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeImageText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#0D5B10',
    letterSpacing: -0.5,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 350,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    letterSpacing: -0.5,
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666666',
    fontWeight: 'bold',
  },
  modalBody: {
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  modalMessage: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
    textAlign: 'center',
    lineHeight: 22,
  },
  pointsContainer: {
    backgroundColor: 'rgba(13, 91, 16, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: -0.5,
  },
  modalButton: {
    backgroundColor: '#0D5B10',
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  // Loading Screen Styles
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    minWidth: 280,
  },
  loadingSpinner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(13, 91, 16, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingSpinnerText: {
    fontSize: 40,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  loadingDot: {
    fontSize: 16,
    color: '#0D5B10',
    opacity: 0.6,
  },
});

export default HomeScreen;

