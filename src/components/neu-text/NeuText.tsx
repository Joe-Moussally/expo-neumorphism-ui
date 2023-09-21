import React from 'react';
import type { TextStyle } from 'react-native';
import { Text, type TextProps, StyleSheet } from 'react-native';

export interface NeuTextProps extends TextProps {
  /**
   * The Text font size.
   * @default 17
   */
  fontSize: number;
  /**
   * The Text font weight.
   * @default 600
   */
  fontWeight:
    | '600'
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '700'
    | '800'
    | '900'
    | undefined;
  /**
   * The Text opa city. It's 0.6 (60%) by default to look more shadowy and appealing in terms of the NeuView components
   * @default 0.6
   */
  opacity: number;
  /**
   * Text color, rgb, rgba, hex code...
   * @default black
   */
  color: string;
  /**
   * The View style of the component.
   * @default null
   */
  style: TextStyle;
  children: any;
}

export const NeuText: React.FC<Partial<NeuTextProps>> = ({
  opacity = 0.6,
  fontSize = 17,
  fontWeight = '700',
  color = 'black',
  children,
  style,
  ...props
}) => {
  const neuTextStyles = StyleSheet.create({
    text: {
      fontSize,
      fontWeight,
      opacity,
      color,
    },
  });

  return (
    <Text style={{ ...neuTextStyles.text, ...style }} {...props}>
      {children}
    </Text>
  );
};
