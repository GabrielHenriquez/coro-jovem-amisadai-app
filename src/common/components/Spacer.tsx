import * as RN from "react-native";

interface Props extends RN.ViewProps {
  width?: number;
  height?: any;
}

const Spacer = ({ width = 0, height = "0%", ...rest }: Props) => (
  <RN.View {...rest} style={{ height, width }} />
);

export default Spacer;
