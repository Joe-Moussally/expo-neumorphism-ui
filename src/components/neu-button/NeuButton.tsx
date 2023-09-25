// ** React, RN Imports
import React from 'react';
import { type PressableProps, StyleSheet } from 'react-native';

// ** Utils Imports
// import { createComponent } from 'src/utils/createComponent';

// ** Custom Components Imports
import { NeuText } from '../neu-text';
import { NeuView } from '../neu-view';
import { ActivityIndicator } from 'react-native';

export type NeuButtonSizes = 'sm' | 'md' | 'lg' | 'xl';
export type NeuButtonVariants = 'flat' | 'pressed' | 'outlined';
export type NeuButtonTheme =
  | 'base'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning';

export interface NeuButtonProps extends PressableProps {
  // /**
  //  * How large should the button be?
  //  *
  //  * @default md
  //  */
  // size: NeuButtonSizes;
  // /**
  //  * How the button should look?
  //  *
  //  * @default solid
  //  */
  // variant: NeuButtonVariants;
  // /**
  //  * How the button should be themed?
  //  *
  //  * @default flat
  //  */
  // themeColor: NeuButtonTheme;
  // /**
  //  * If `true`, the button will show a spinner.
  //  *
  //  * @default false
  //  */
  loading: boolean;
  /**
   * If `true`, the button will be disabled with a dim disabled styling.
   *
   * @default black
   */
  loadingIndicatorColor: string;
  /**
   * The Text opa city. It's 0.6 (60%) by default to look more shadowy and appealing in terms of the NeuView components
   * @default 0.6
   */
  labelOpacity: number;
  /**
  /**
   * Render an element before the button label (Preferable svgs and icons).
   *
   * @default undefined
   */
  prefixIcon?: React.ReactNode;
  /**
   * Render an element before the button label (Preferable svgs and icons).
   *
   * @default undefined
   */
  suffixIcon?: React.ReactNode;
  // /**
  //  * If `true`, the button will be disabled with a dim disabled styling.
  //  *
  //  * @default false
  //  */
  // disabled: boolean;
}

export const NeuButton: React.FC<Partial<NeuButtonProps>> = ({
  // size = 'md',
  // variant = 'flat',
  // themeColor = 'base',
  // disabled = false,
  loading = false,
  labelOpacity = 0.6,
  loadingIndicatorColor = 'black',
  prefixIcon,
  suffixIcon,
  ...props
}) => {
  const neuButtonStyles = StyleSheet.create({
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      // gap: 14,
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 30,
      paddingVertical: 14,
    },
    text: {
      marginRight: suffixIcon ? 12 : 0,
      marginLeft: prefixIcon ? 12 : 0,
      opacity: loading ? 0 : labelOpacity,
    },
    icon: {
      opacity: loading ? 0 : labelOpacity,
    },
    loadingIcon: {
      position: 'absolute',
      margin: 'auto',
      opacity: labelOpacity,
    },
  });

  return (
    <NeuView
      innerContainerStyle={{ ...neuButtonStyles.button }}
      pressable
      touchableProps={props}
    >
      {prefixIcon && (
        <NeuText style={neuButtonStyles.icon}>{prefixIcon}</NeuText>
      )}
      <NeuText style={neuButtonStyles.text}>{props.children}</NeuText>
      {suffixIcon && (
        <NeuText style={neuButtonStyles.icon}>{suffixIcon}</NeuText>
      )}

      {loading && (
        <ActivityIndicator
          color={loadingIndicatorColor}
          style={neuButtonStyles.loadingIcon}
        />
      )}
    </NeuView>
  );
};
