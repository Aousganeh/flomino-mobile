import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const CustomBottomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.bottomNavigation}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIcon = (routeName) => {
          switch (routeName) {
            case 'Home':
              return require('../../assets/home-2.png');
            case 'Mission':
              return require('../../assets/hugeicons_task-01.png');
            case 'Leaderboard':
              return require('../../assets/hugeicons_task-01.png');
            case 'Shop':
              return require('../../assets/image 29-2.png');
            case 'Settings':
              return require('../../assets/uil_setting.png');
            default:
              return require('../../assets/home-2.png');
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.navItem}>
            <View style={styles.navIcon}>
              <Image 
                source={getIcon(route.name)} 
                style={[
                  styles.icon,
                  isFocused && styles.activeIcon
                ]}
                resizeMode="contain"
              />
            </View>
            <Text style={[
              styles.navText,
              isFocused && styles.activeText
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    height: 80,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 20,
    gap: 46,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
  activeIcon: {
    opacity: 1,
  },
  navText: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    letterSpacing: -0.5,
    marginTop: 0,
  },
  activeText: {
    color: '#0D5B10',
    fontWeight: '500',
  },
});

export default CustomBottomTabBar;
