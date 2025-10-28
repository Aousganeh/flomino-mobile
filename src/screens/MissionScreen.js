import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const {width} = Dimensions.get('window');

const MissionScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [currentMission, setCurrentMission] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const missions = [
    {
      id: 1,
      title: "Collect rainwater for plants",
      description: "Show your rainwater collection setup to earn 4 seeds.",
      image: require('../../assets/image 29-2.png'),
      type: "rainwater"
    },
    {
      id: 2,
      title: "Start a vegetable garden",
      description: "Take a photo of your new garden to earn 5 seeds.",
      image: require('../../assets/image 29-2.png'),
      type: "garden"
    },
    {
      id: 3,
      title: "Use a bike instead of car",
      description: "Show yourself biking to earn 6 seeds.",
      image: require('../../assets/image 29-2.png'),
      type: "biking"
    },
    {
      id: 4,
      title: "Make homemade cleaning products",
      description: "Show your eco-friendly cleaners to earn 3 seeds.",
      image: require('../../assets/image 29-2.png'),
      type: "cleaning"
    }
  ];

  // Fake AI Analysis Function
  const analyzeImage = (missionType) => {
    const responses = {
      rainwater: [
        {
          title: "Rainwater Collector! 🌧️",
          message: "Excellent rainwater collection! You're conserving water and helping plants. You've earned 4 seeds!",
          points: "+4 Seeds",
          color: "#0D5B10"
        },
        {
          title: "Water Wise! 💧",
          message: "Fantastic rainwater setup! You're making every drop count. You've earned 4 seeds!",
          points: "+4 Seeds",
          color: "#0D5B10"
        }
      ],
      garden: [
        {
          title: "Garden Master! 🌱",
          message: "Amazing vegetable garden! You're growing your own food sustainably. You've earned 5 seeds!",
          points: "+5 Seeds",
          color: "#0D5B10"
        },
        {
          title: "Green Thumb! 🥕",
          message: "Wonderful garden creation! You're reducing food miles and waste. You've earned 5 seeds!",
          points: "+5 Seeds",
          color: "#0D5B10"
        }
      ],
      biking: [
        {
          title: "Bike Champion! 🚴‍♂️",
          message: "Fantastic bike choice! You're reducing emissions and staying healthy. You've earned 6 seeds!",
          points: "+6 Seeds",
          color: "#0D5B10"
        },
        {
          title: "Eco Commuter! 🚴‍♀️",
          message: "Excellent biking decision! You're making a huge environmental impact. You've earned 6 seeds!",
          points: "+6 Seeds",
          color: "#0D5B10"
        }
      ],
      cleaning: [
        {
          title: "Natural Cleaner! 🧽",
          message: "Great homemade cleaners! You're avoiding harmful chemicals. You've earned 3 seeds!",
          points: "+3 Seeds",
          color: "#0D5B10"
        },
        {
          title: "Eco Cleaner! 🧼",
          message: "Perfect natural cleaning products! You're protecting your health and environment. You've earned 3 seeds!",
          points: "+3 Seeds",
          color: "#0D5B10"
        }
      ]
    };
    
    const missionResponses = responses[missionType] || responses.rainwater;
    const randomResponse = missionResponses[Math.floor(Math.random() * missionResponses.length)];
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
        const currentMissionData = missions[currentMission];
        analyzeImage(currentMissionData.type);
        setIsAnalyzing(false);
      }, 2000); // 2 second delay
    } else {
      Alert.alert("No Photo", "Please add a photo first to submit your proof.");
    }
  };

  const nextMission = () => {
    setCurrentMission((prev) => (prev + 1) % missions.length);
    setSelectedImage(null);
  };

  const prevMission = () => {
    setCurrentMission((prev) => (prev - 1 + missions.length) % missions.length);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <View style={styles.backButtonCircle}>
              <Text style={styles.backArrow}>←</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mission</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Let's make today greener Card */}
          <View style={styles.greenerCard}>
            <View style={styles.greenerTextContainer}>
              <Text style={styles.greenerTitle}>Let's make today greener</Text>
              <Text style={styles.greenerSubtitle}>Complete a mission and grow your Fimo.</Text>
            </View>
            <View style={styles.greenerImages}>
            <Image 
              source={require('../../assets/image 25-3.png')} 
              style={styles.greenerFimo}
              resizeMode="contain"
            />
              <Image 
                source={require('../../assets/image 27.png')} 
                style={styles.greenerLeaf1}
                resizeMode="contain"
              />
              <Image 
                source={require('../../assets/image 27.png')} 
                style={styles.greenerLeaf2}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Mission Cards Section */}
          <View style={styles.missionSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mission card</Text>
              <View style={styles.missionNavigation}>
                <TouchableOpacity style={styles.navButton} onPress={prevMission}>
                  <Text style={styles.navButtonText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.missionCounter}>{currentMission + 1} / {missions.length}</Text>
                <TouchableOpacity style={styles.navButton} onPress={nextMission}>
                  <Text style={styles.navButtonText}>›</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.missionCards}>
              {/* First Mission Card */}
              <View style={styles.missionCard}>
                <View style={styles.missionContent}>
                  <Image 
                    source={missions[currentMission].image} 
                    style={styles.missionImage}
                    resizeMode="contain"
                  />
                  <View style={styles.missionTextContainer}>
                    <View style={styles.missionTitleContainer}>
                      <Text style={styles.missionTitle}>{missions[currentMission].title}</Text>
                      <Text style={styles.missionDescription}>{missions[currentMission].description}</Text>
                    </View>
                    <View style={styles.missionButtons}>
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

              {/* Second Mission Card */}
              <View style={styles.missionCard}>
                <View style={styles.missionContent}>
                  <Image 
                    source={missions[currentMission].image} 
                    style={styles.missionImage}
                    resizeMode="contain"
                  />
                  <View style={styles.missionTextContainer}>
                    <View style={styles.missionTitleContainer}>
                      <Text style={styles.missionTitle}>{missions[currentMission].title}</Text>
                      <Text style={styles.missionDescription}>{missions[currentMission].description}</Text>
                    </View>
                    <View style={styles.missionButtons}>
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

          {/* Your Donates Section */}
          <View style={styles.donatesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your donates</Text>
            </View>

            <View style={styles.donateCards}>
              {/* First Donate Card */}
              <View style={styles.donateCard}>
                <View style={styles.donateContent}>
                  <View style={styles.donateTextContainer}>
                    <Text style={styles.donateText}>Donate 20 seeds</Text>
                    <Text style={styles.donateTree}>1 tree</Text>
                  </View>
                  <TouchableOpacity style={styles.donateButton}>
                    <Text style={styles.buttonText}>Donate now</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.donateImages}>
                  <Image 
                    source={require('../../assets/image 30.png')} 
                    style={styles.donateFimo}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* Second Donate Card */}
              <View style={styles.donateCard}>
                <View style={styles.donateContent}>
                  <View style={styles.donateTextContainer}>
                    <Text style={styles.donateText}>Donate 20 seeds</Text>
                    <Text style={styles.donateTree}>1 tree</Text>
                  </View>
                  <TouchableOpacity style={styles.donateButton}>
                    <Text style={styles.buttonText}>Donate now</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.donateImages}>
                  <Image 
                    source={require('../../assets/image 30.png')} 
                    style={styles.donateFimo}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 20,
    height: 80,
  },
  backButton: {
    width: 50,
    height: 50,
  },
  backButtonCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.3,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    letterSpacing: -0.5,
  },
  headerSpacer: {
    width: 50,
  },
  mainContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 20,
  },
  greenerCard: {
    width: 344,
    height: 109,
    backgroundColor: 'rgba(229, 245, 224, 0.43)',
    borderWidth: 0.2,
    borderColor: 'rgba(35, 139, 69, 0.6)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
    overflow: 'visible',
  },
  greenerTextContainer: {
    position: 'absolute',
    width: 227,
    height: 39,
    left: 64,
    top: 11,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  greenerTitle: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    letterSpacing: -0.5,
    textAlign: 'center',
    width: 169,
    height: 17,
    lineHeight: 17,
  },
  greenerSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
    textAlign: 'center',
    width: 227,
    height: 17,
    lineHeight: 17,
  },
  greenerImages: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'visible',
  },
  greenerFimo: {
    position: 'absolute',
    width: 70,
    height: 105,
    left: 143,
    top: 23,
  },
  greenerLeaf1: {
    position: 'absolute',
    width: 70,
    height: 105,
    left: 274,
    top: 40,
  },
  greenerLeaf2: {
    position: 'absolute',
    width: 70,
    height: 105,
    left: 0,
    top: 40,
  },
  missionSection: {
    gap: 15,
  },
  donatesSection: {
    gap: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  missionNavigation: {
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
  missionCounter: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    letterSpacing: -0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
  },
  missionCards: {
    gap: 10,
  },
  missionCard: {
    width: 349,
    height: 126,
    backgroundColor: '#FFFCF4',
    borderWidth: 0.2,
    borderColor: 'rgba(255, 192, 0, 0.6)',
    borderRadius: 15,
    position: 'relative',
  },
  missionImage: {
    width: 109,
    height: 109,
    borderRadius: 54.5,
  },
  missionIconContainer: {
    width: 109,
    height: 109,
    borderRadius: 54.5,
    backgroundColor: 'rgba(13, 91, 16, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  missionIcon: {
    fontSize: 50,
    textAlign: 'center',
  },
  missionContent: {
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
  missionTextContainer: {
    width: 192,
    height: 93,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    marginLeft: 10,
  },
  missionTitleContainer: {
    width: 192,
    height: 56,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5,
  },
  missionTitle: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    letterSpacing: -0.5,
    width: 192,
    height: 17,
    lineHeight: 17,
  },
  missionDescription: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    lineHeight: 17,
    letterSpacing: -0.5,
    width: 162,
    height: 34,
  },
  missionButtons: {
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
    fontSize: 9,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    lineHeight: 17,
  },
  donateCards: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'space-between',
  },
  donateCard: {
    width: 165,
    height: 126,
    backgroundColor: 'rgba(229, 245, 224, 0.43)',
    borderWidth: 0.2,
    borderColor: 'rgba(13, 91, 16, 0.6)',
    borderRadius: 15,
    position: 'relative',
  },
  donateContent: {
    position: 'absolute',
    width: 110,
    height: 79,
    left: 10,
    top: '50%',
    marginTop: -39.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  donateTextContainer: {
    width: 110,
    height: 40,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  },
  donateText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
    width: 110,
    height: 17,
    lineHeight: 17,
  },
  donateTree: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#0D5B10',
    letterSpacing: -0.5,
    width: 110,
    height: 17,
    lineHeight: 17,
  },
  donateButton: {
    backgroundColor: '#62AFA7',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 81,
    height: 27,
  },
  donateImages: {
    position: 'absolute',
    right: 8,
    top: 26,
    alignItems: 'center',
  },
  donateFimo: {
    width: 67,
    height: 101,
  },
  // Image Preview Styles
  imagePreviewSection: {
    gap: 15,
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

export default MissionScreen;
