import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const LeaderboardScreen = () => {
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
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Leaderboard Section */}
          <View style={styles.leaderboardSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Weekly Rankings</Text>
            </View>

            <View style={styles.leaderboardCards}>
              {/* First Place */}
              <View style={styles.leaderboardCard}>
                <View style={styles.rankContainer}>
                  <Text style={styles.rankNumber}>1</Text>
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankBadgeText}>🥇</Text>
                  </View>
                </View>
                <Image 
                  source={require('../../assets/image 25-3.png')} 
                  style={styles.leaderboardImage}
                  resizeMode="contain"
                />
                <View style={styles.leaderboardTextContainer}>
                  <View style={styles.leaderboardTitleContainer}>
                    <Text style={styles.leaderboardName}>Aytac</Text>
                    <Text style={styles.leaderboardScore}>2,450 points</Text>
                  </View>
                  <View style={styles.leaderboardStats}>
                    <Text style={styles.leaderboardStat}>15 missions completed</Text>
                  </View>
                </View>
              </View>

              {/* Second Place */}
              <View style={styles.leaderboardCard}>
                <View style={styles.leaderboardContent}>
                  <View style={styles.rankContainer}>
                    <Text style={styles.rankNumber}>2</Text>
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankBadgeText}>🥈</Text>
                    </View>
                  </View>
                <Image 
                  source={require('../../assets/image 25-3.png')} 
                  style={styles.leaderboardImage}
                  resizeMode="contain"
                />
                <View style={styles.leaderboardTextContainer}>
                  <View style={styles.leaderboardTitleContainer}>
                    <Text style={styles.leaderboardName}>Kamal</Text>
                    <Text style={styles.leaderboardScore}>2,180 points</Text>
                  </View>
                    <View style={styles.leaderboardStats}>
                      <Text style={styles.leaderboardStat}>12 missions completed</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Third Place */}
              <View style={styles.leaderboardCard}>
                <View style={styles.leaderboardContent}>
                  <View style={styles.rankContainer}>
                    <Text style={styles.rankNumber}>3</Text>
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankBadgeText}>🥉</Text>
                    </View>
                  </View>
                <Image 
                  source={require('../../assets/image 25-3.png')} 
                  style={styles.leaderboardImage}
                  resizeMode="contain"
                />
                <View style={styles.leaderboardTextContainer}>
                  <View style={styles.leaderboardTitleContainer}>
                    <Text style={styles.leaderboardName}>Fatima</Text>
                    <Text style={styles.leaderboardScore}>1,950 points</Text>
                  </View>
                    <View style={styles.leaderboardStats}>
                      <Text style={styles.leaderboardStat}>10 missions completed</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Your Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Progress</Text>
            </View>

            <View style={styles.progressCard}>
              <Image 
                source={require('../../assets/image 25-3.png')} 
                style={styles.progressImage}
                resizeMode="contain"
              />
              <View style={styles.progressTextContainer}>
                <View style={styles.progressTitleContainer}>
                  <Text style={styles.progressName}>Your Rank</Text>
                  <Text style={styles.progressScore}>1,320 points</Text>
                </View>
                <View style={styles.progressStats}>
                  <Text style={styles.progressStat}>8 missions completed</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={styles.progressBarFill} />
                </View>
                <Text style={styles.progressText}>Keep going! You're 200 points away from the top 10!</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  leaderboardSection: {
    gap: 15,
  },
  progressSection: {
    gap: 15,
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
  leaderboardCards: {
    gap: 10,
  },
  leaderboardCard: {
    width: 344,
    height: 126,
    backgroundColor: '#FFFCF4',
    borderWidth: 0.2,
    borderColor: 'rgba(255, 192, 0, 0.6)',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  leaderboardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  rankNumber: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#0D5B10',
    letterSpacing: -0.5,
  },
  rankBadge: {
    marginTop: 2,
  },
  rankBadgeText: {
    fontSize: 16,
  },
  leaderboardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  leaderboardTextContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  },
  leaderboardTitleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    letterSpacing: -0.5,
  },
  leaderboardScore: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#0D5B10',
    letterSpacing: -0.5,
  },
  leaderboardStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardStat: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
  },
  progressCard: {
    width: 344,
    height: 126,
    backgroundColor: 'rgba(229, 245, 224, 0.43)',
    borderWidth: 0.2,
    borderColor: 'rgba(35, 139, 69, 0.6)',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  progressContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  progressTextContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  },
  progressTitleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
  },
  progressName: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    letterSpacing: -0.5,
  },
  progressScore: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#0D5B10',
    letterSpacing: -0.5,
  },
  progressStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStat: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(13, 91, 16, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '65%',
    height: '100%',
    backgroundColor: '#0D5B10',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
    lineHeight: 14,
  },
});

export default LeaderboardScreen;
