import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NeuView } from '../neu-view';
import { Animated } from 'react-native';
import type { ViewStyle } from 'react-native';

export interface NeuSwitchProps {
  /**
   * The color of the dot indicator for when the switch is on
   * @default lime
   */
  accentColor: string;
  /**
   * On switch value change, execute a function
   * @param value - The new switch value
   */
  onChange: (value: boolean) => any;
  /**
   * The default value of the switch
   * @default false
   */
  defaultValue: boolean;
  /**
   * The style of the View container of the component.
   * @default {}
   */
  style: ViewStyle;
  // /**
  //  * The controlled value of the switch
  //  * @default undefined
  //  */
  // value: boolean;
}

export const NeuSwitch: React.FC<Partial<NeuSwitchProps>> = ({
  onChange,
  accentColor = 'lime',
  defaultValue = false,
  // style,
}) => {
  // ** States
  const [isOn, setIsOn] = useState(defaultValue);

  // ** Animation Variables
  const animationPosition = useRef(new Animated.Value(0)).current;
  const animationPoint = useRef(new Animated.Value(0)).current;

  // ** Function will change the styling animated values to turn on/off
  const toggleSwitch = () => {
    if (typeof onChange === 'function') onChange(!isOn);
    setIsOn(!isOn);
    Animated.timing(animationPosition, {
      toValue: isOn ? 0 : 45, // If it is on, then move back to 0, else move to 40
      duration: 160,
      useNativeDriver: true,
    }).start();
    Animated.timing(animationPoint, {
      toValue: isOn ? 0 : 1, // If it is on, then move back to 0, else move to 40
      duration: 160,
      useNativeDriver: true,
    }).start();
  };

  // ** Stlyes
  const neuSwitchStyle = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 55,
      width: 105,
      padding: 10,
    },
    outerContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      height: 50,
      width: 100,
      paddingHorizontal: 10,
      marginTop: -1,
      marginLeft: -1,
    },
    innerContainer: {
      height: 35,
      width: 35,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    animatedContainer: {
      zIndex: 1,
    },
    point: {
      backgroundColor: accentColor,
      opacity: 0.4,
      height: 11,
      width: 11,
      borderRadius: 15,
      marginLeft: -0.7,
      marginTop: -0.7,
    },
  });

  return (
    <NeuView innerContainerStyle={neuSwitchStyle.mainContainer}>
      <NeuView
        onPress={toggleSwitch}
        type="pressed"
        innerContainerStyle={neuSwitchStyle.outerContainer}
      >
        <Animated.View
          style={[
            neuSwitchStyle.animatedContainer,
            {
              transform: [{ translateX: animationPosition }],
            },
          ]}
        >
          <NeuView
            innerContainerStyle={neuSwitchStyle.innerContainer}
            onPress={toggleSwitch}
          >
            <Animated.View
              style={[
                neuSwitchStyle.point,
                { transform: [{ scale: animationPoint }] },
              ]}
            />
          </NeuView>
        </Animated.View>
      </NeuView>
    </NeuView>
  );
};
