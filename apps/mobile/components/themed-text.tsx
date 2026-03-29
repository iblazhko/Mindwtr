import React, { useMemo } from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { useFontScale } from '@/contexts/font-scale-context';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

const makeStyles = (scale: number) => StyleSheet.create({
  default: {
    fontSize: 16 * scale,
    lineHeight: 24 * scale,
  },
  defaultSemiBold: {
    fontSize: 16 * scale,
    lineHeight: 24 * scale,
    fontWeight: '600',
  },
  title: {
    fontSize: 32 * scale,
    fontWeight: 'bold',
    lineHeight: 32 * scale,
  },
  subtitle: {
    fontSize: 20 * scale,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30 * scale,
    fontSize: 16 * scale,
    color: '#0a7ea4',
  },
});

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const scale = useFontScale();
  const styles = useMemo(() => makeStyles(scale), [scale]);

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
