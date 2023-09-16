import React, { forwardRef } from "react";
import { Text, View, type ViewStyle, type ViewProps } from "react-native";

export interface NeuViewProps {
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
     * Border radius of the view in px
     *
     * @default 50
     */
    borderRadius: number;
    /**
     * The View style of the component.
     * @default {}
     */
    style: ViewStyle;
  }

  const NeuView:React.FC<Partial<NeuViewProps>> = forwardRef<
  ViewProps,
  Partial<NeuViewProps>
>(
  (
    {
      height = 50,
      width = 50,
      borderRadius = 10,
      style = {},
      ...props
    },
    ref,
  ) => {

    const children = (
        typeof props.children === "string" ? (
          <Text>
            {props.children}
          </Text>
        ) : (
          props.children
        )
      ) as React.ReactNode;

    return (
        <View ref={ref} style={style}>
            {children}
        </View>
    )
  })

  export default NeuView