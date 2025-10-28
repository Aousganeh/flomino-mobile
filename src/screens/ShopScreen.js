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
} from 'react-native';

const {width} = Dimensions.get('window');

const ShopScreen = () => {
  const [userSeeds, setUserSeeds] = useState(45); // Starting with 45 seeds
  const [purchasedItems, setPurchasedItems] = useState([]);

  const shopItems = [
    {
      id: 1,
      name: "Plant a Tree",
      description: "We'll plant a real tree in your name",
      price: 20,
      image: require('../../assets/image 30.png'),
      category: "environment"
    },
    {
      id: 2,
      name: "Ocean Cleanup",
      description: "Support ocean plastic cleanup efforts",
      price: 15,
      image: require('../../assets/image 27.png'),
      category: "ocean"
    },
    {
      id: 3,
      name: "Wildlife Protection",
      description: "Help protect endangered species",
      price: 25,
      image: require('../../assets/image 25-3.png'),
      category: "wildlife"
    },
    {
      id: 4,
      name: "Carbon Offset",
      description: "Offset 1 ton of CO2 emissions",
      price: 30,
      image: require('../../assets/image 25-2.png'),
      category: "carbon"
    },
    {
      id: 5,
      name: "Water Well",
      description: "Help build a water well in Africa",
      price: 50,
      image: require('../../assets/image 29-2.png'),
      category: "water"
    },
    {
      id: 6,
      name: "Solar Panel",
      description: "Support renewable energy projects",
      price: 40,
      image: require('../../assets/image 25-3.png'),
      category: "energy"
    }
  ];

  const handlePurchase = (item) => {
    if (userSeeds >= item.price) {
      Alert.alert(
        "Purchase Confirmed! 🌱",
        `You've successfully purchased "${item.name}"! Thank you for making a difference!`,
        [
          {
            text: "Awesome!",
            onPress: () => {
              setUserSeeds(userSeeds - item.price);
              setPurchasedItems([...purchasedItems, item]);
            }
          }
        ]
      );
    } else {
      Alert.alert(
        "Not Enough Seeds",
        `You need ${item.price - userSeeds} more seeds to purchase this item. Keep completing missions to earn more seeds!`,
        [{ text: "OK" }]
      );
    }
  };

  const isPurchased = (itemId) => {
    return purchasedItems.some(item => item.id === itemId);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eco Shop</Text>
          <View style={styles.seedsContainer}>
            <Text style={styles.seedsIcon}>🌱</Text>
            <Text style={styles.seedsText}>{userSeeds} Seeds</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Welcome Section */}
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Make a Real Impact! 🌍</Text>
            <Text style={styles.welcomeSubtitle}>
              Use your earned seeds to support real environmental causes and make the world a better place.
            </Text>
          </View>

          {/* Shop Items */}
          <View style={styles.shopSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Available Rewards</Text>
            </View>

            <View style={styles.shopGrid}>
              {shopItems.map((item) => (
                <View key={item.id} style={styles.shopItem}>
                  <View style={styles.itemImageContainer}>
                    <Image 
                      source={item.image} 
                      style={styles.itemImage}
                      resizeMode="contain"
                    />
                    {isPurchased(item.id) && (
                      <View style={styles.purchasedBadge}>
                        <Text style={styles.purchasedText}>✓</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.itemContent}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    
                    <View style={styles.itemFooter}>
                      <View style={styles.priceContainer}>
                        <Text style={styles.priceIcon}>🌱</Text>
                        <Text style={styles.priceText}>{item.price}</Text>
                      </View>
                      
                      <TouchableOpacity 
                        style={[
                          styles.purchaseButton,
                          userSeeds < item.price && styles.purchaseButtonDisabled,
                          isPurchased(item.id) && styles.purchaseButtonPurchased
                        ]}
                        onPress={() => handlePurchase(item)}
                        disabled={userSeeds < item.price || isPurchased(item.id)}
                      >
                        <Text style={[
                          styles.purchaseButtonText,
                          userSeeds < item.price && styles.purchaseButtonTextDisabled,
                          isPurchased(item.id) && styles.purchaseButtonTextPurchased
                        ]}>
                          {isPurchased(item.id) ? 'Purchased' : userSeeds < item.price ? 'Need More Seeds' : 'Purchase'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Impact Section */}
          <View style={styles.impactSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Impact</Text>
            </View>
            
            <View style={styles.impactCard}>
              <Text style={styles.impactTitle}>Together We're Making a Difference! 🌟</Text>
              <Text style={styles.impactText}>
                Every purchase you make contributes to real environmental projects around the world. 
                Thank you for being part of the solution!
              </Text>
              
              <View style={styles.impactStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{purchasedItems.length}</Text>
                  <Text style={styles.statLabel}>Items Purchased</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{purchasedItems.reduce((total, item) => total + item.price, 0)}</Text>
                  <Text style={styles.statLabel}>Seeds Spent</Text>
                </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    height: 80,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    letterSpacing: -0.5,
  },
  seedsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 91, 16, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  seedsIcon: {
    fontSize: 20,
  },
  seedsText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#0D5B10',
    letterSpacing: -0.5,
  },
  mainContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 20,
  },
  welcomeCard: {
    backgroundColor: 'rgba(229, 245, 224, 0.43)',
    borderWidth: 0.2,
    borderColor: 'rgba(35, 139, 69, 0.6)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
    textAlign: 'center',
    lineHeight: 20,
  },
  shopSection: {
    gap: 15,
  },
  impactSection: {
    gap: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    letterSpacing: -0.5,
  },
  shopGrid: {
    gap: 15,
  },
  shopItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(13, 91, 16, 0.2)',
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itemImageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  purchasedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    backgroundColor: '#0D5B10',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchasedText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  itemContent: {
    flex: 1,
    gap: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    letterSpacing: -0.5,
  },
  itemDescription: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    letterSpacing: -0.5,
    lineHeight: 16,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceIcon: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#0D5B10',
    letterSpacing: -0.5,
  },
  purchaseButton: {
    backgroundColor: '#0D5B10',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  purchaseButtonPurchased: {
    backgroundColor: '#4CAF50',
  },
  purchaseButtonText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  purchaseButtonTextDisabled: {
    color: '#999999',
  },
  purchaseButtonTextPurchased: {
    color: '#FFFFFF',
  },
  impactCard: {
    backgroundColor: '#FFFCF4',
    borderWidth: 0.2,
    borderColor: 'rgba(255, 192, 0, 0.6)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  impactText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  impactStats: {
    flexDirection: 'row',
    gap: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: '#0D5B10',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
});

export default ShopScreen;






