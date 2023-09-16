// ** React Imports
import React, { forwardRef, useState } from "react";

// ** React Native Imports
import { View, type ViewStyle, type ViewProps, StyleSheet, TouchableWithoutFeedback, type GestureResponderEvent } from "react-native";

export interface NeuViewProps extends ViewProps {
    /**
     * Light direction for the shadow.
     * Allowed values: "topLeft", "topRight", "bottomLeft", "bottomRight"
     *
     * @default "topLeft"
     */
    lightSource?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
    /**
     * The shape type of the View. "flat" makes it look as if it's above the background, while "Pressed" makes it look as if it's indented into the screen.
     * Allowed values: "flat", "pressed"
     *
     * @default "flat"
     */
    type?: "flat" | "pressed";
    /**
     * The shape type of the View. "flat" makes it look as if it's above the background, while "Pressed" makes it look as if it's indented into the screen.
     * Allowed values: "flat", "pressed"
     *
     * @default false
     */
    pressable?: boolean;
    /**
     * Distance of the shadow from the view in px
     *
     * @default 15
     */
    shadowDistance: number;
    /**
     * Blur of the View shadow  in px
     *
     * @default 15
     */
    shadowBlur: number;
    /**
     * Void function that will be executed on View press
     *
     * @default () => void
     */
    onPress: () => void;
    /**
     * Heigh of the view in px
     *
     * @default 50
     */
    height: number;
    /**
     * Heigh of the view in px
     *
     * @default 50
     */
    width: number;
    /**
     * Background color of the view
     *
     * @default #F5F5F5
     */
    backgroundColor: string;
    /**
     * Border radius of the view in px
     *
     * @default 50
     */
    borderRadius: number;
    /**
     * Padding of the view in px
     *
     * @default 50
     */
    padding: number;
    /**
     * The View style of the component.
     * @default {}
     */
    style: ViewStyle;
    /**
     * The View style of the component.
     * @default null
     */
    children: React.ReactNode;
  }

  // ** Helpers
  const calculateDarkShadowOffset = (lightSource: NeuViewProps["lightSource"]) => {
      switch (lightSource) {
        case "topLeft":
          return { width: 10, height: 10 };
        case "topRight":
          return { width: -10, height: 10 };
        case "bottomLeft":
          return { width: 10, height: -10 };
        case "bottomRight":
          return { width: -10, height: -10 };
        default:
          return { width: 0, height: 0 }; // Default or undefined
    }
  }

  // ** Helpers
  const calculateLightShadowOffset = (lightSource: NeuViewProps["lightSource"]) => {
    switch (lightSource) {
      case "topLeft":
        return { width: -10, height: -10 };
      case "topRight":
        return { width: 10, height: -10 };
      case "bottomLeft":
        return { width: -10, height: 10 };
      case "bottomRight":
        return { width: 10, height: 10 };
      default:
        return { width: 0, height: 0 }; // Default or undefined
    }
  }

  const NeuView:React.FC<Partial<NeuViewProps>> = forwardRef<
  View | null,
  Partial<NeuViewProps>
>(
  (
    {
      height = 300,
      width = 300,
      backgroundColor = "#F5F5F5",
      borderRadius = 30,
      lightSource = "topLeft",
      style = {},
      onPress = (e: GestureResponderEvent) => {},
      pressable = false,
      shadowDistance = 10,
      shadowBlur = 10,
      padding = 30,
      children = null,
      type = "flat",
      ...props
    },
    ref,
  ) => {

    // ** States
    const [currentType, setCurrentType] = useState<NeuViewProps["type"]>(type)

    // ** Styles
    const neuViewStyles = StyleSheet.create({
      container: {
        width,
        height,
        backgroundColor,
        borderRadius,
      },
      darkShadowConatiner: (currentType === "flat" && type !== "pressed") ? ({
        borderWidth: 0.5,
        borderColor: 'white',
        shadowColor: '#c8c8c8',
        shadowOffset: {...calculateDarkShadowOffset(lightSource)},
        shadowOpacity: 0.65,
        shadowRadius: 12.5,
        elevation: 5,
        zIndex: 1
      }) : {
        borderWidth: 0.2,
        borderColor: 'white'
      },
      lightShadowContainer: (currentType === "flat" && type !== "pressed") ? {
        position: 'relative',
        shadowColor: 'white',
        backgroundColor,
        shadowOffset: {...calculateLightShadowOffset(lightSource)},
        shadowOpacity: 0.75,
        shadowRadius: 10,
        elevation: 5,
        padding,
        zIndex: -1
      } : {
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 0.25,
        borderColor: 'white'
      },
      topLeftInsetShadow: {
        position: 'absolute',
        backgroundColor: 'white',
        width,
        height,
        shadowColor: '#c8c8c8',
        shadowOpacity: 0.6,
        shadowRadius: shadowBlur,
        elevation: 5,
        zIndex: 1,
        borderRadius,
        shadowOffset: {width: 10, height: 10},
      }
    })

    // ** Handlers
    const handleOnpress = (e: GestureResponderEvent) => {
      onPress(e)
    }
    const handlePressIn = () => {
      if (!pressable) return
      if (type === "flat") {
        setCurrentType("pressed")
      }
    }
    const handlePressOut = () => {
      if (!pressable) return
      if (type === "flat") {
        setCurrentType("flat")
      } 
    }

    return (
      <TouchableWithoutFeedback onPress={handleOnpress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <View ref={ref} style={[neuViewStyles.container, neuViewStyles.darkShadowConatiner, style]} {...props}>
          <View style={[neuViewStyles.container, neuViewStyles.lightShadowContainer]}>

            {/* Inner Shadows */}
            {
              (currentType === "pressed" || type === "pressed") ? (
                <>
                  {/* Top */}
                  <View style={[neuViewStyles.topLeftInsetShadow, {top: -height, left: -width / 20, shadowOffset: {width: shadowDistance, height: shadowDistance}}]}/>

                  {/* Left */}
                  <View style={[neuViewStyles.topLeftInsetShadow, {top: -height / 20, left: -width, shadowOffset: {width: shadowDistance, height: shadowDistance}}]}/>

                  {/* Top Left */}
                  <View style={[neuViewStyles.topLeftInsetShadow, {top: -height, left: -width, shadowOffset: {width: shadowDistance + width / 30, height: shadowDistance + height / 30}}]}/>

                  {/* Right */}
                  <View style={[neuViewStyles.topLeftInsetShadow, {top: 0, right: -width, shadowOffset: {width: -shadowDistance / 2, height: 0}, shadowOpacity: 0.2}]}/>

                  {/* Bottom */}
                  <View style={[neuViewStyles.topLeftInsetShadow, {top: height, right: 0, shadowOffset: {width: 0, height: -shadowDistance / 2}, shadowOpacity: 0.2}]}/>

                  {/* Bottom Left */}
                  <View style={[neuViewStyles.topLeftInsetShadow, {top: height, left: width, shadowOffset: {width: -width / 30, height: -height / 30}, shadowOpacity: 0.2}]}/>
                </>
              ) : null
            }

            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  })

  export default NeuView