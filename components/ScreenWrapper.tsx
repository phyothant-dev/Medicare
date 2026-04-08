import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  bg?: string; // optional background color
  style?: ViewStyle; // optional additional styles
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, bg = '#fff', style }) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View style={[{ flex: 1, paddingTop, backgroundColor: bg }, style]}>
      {children}
    </View>
  );
};

export default ScreenWrapper;