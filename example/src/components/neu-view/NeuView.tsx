// ** React Imports
import React, { forwardRef } from "react";

// ** React Native Imports
import { View, type ViewStyle, type ViewProps, StyleSheet } from "react-native";

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
      padding = 30,
      children = null,
      type = "flat",
      ...props
    },
    ref,
  ) => {

    const neuViewStyles = StyleSheet.create({
      container: {
        width,
        height,
        backgroundColor,
        borderRadius,
      },
      darkShadowConatiner: {
        borderWidth: 0.5,
        borderColor: 'white',
        shadowColor: '#c8c8c8',
        shadowOffset: {...calculateDarkShadowOffset(lightSource)},
        shadowOpacity: 0.65,
        shadowRadius: 12.5,
        elevation: 5,
        zIndex: 1
      },
      lightShadowContainer: {
        shadowColor: 'white',
        backgroundColor,
        shadowOffset: {...calculateLightShadowOffset(lightSource)},
        shadowOpacity: 0.75,
        shadowRadius: 10,
        elevation: 5,
        padding,
        zIndex: -1
      }
    })

    return (
        <View ref={ref} style={[neuViewStyles.container, neuViewStyles.darkShadowConatiner, style]} {...props}>
          <View style={[neuViewStyles.container, neuViewStyles.lightShadowContainer]}>
            {children}
          </View>
        </View>
    )
  })

  export default NeuView