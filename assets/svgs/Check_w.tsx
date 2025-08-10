import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { normalizeHeight } from '../../components/Responsivescreen';

function SvgComponent(props) {
  return (
    <Svg
      width={
        props && props.width
          ? normalizeHeight(props.width)
          : normalizeHeight(10)
      }
      height={
        props && props.height
          ? normalizeHeight(props.height)
          : normalizeHeight(8)
      }
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
     <Path
  d="M9.75.276c.333.368.333.963 0 1.33L4.22 7.725A.81.81 0 013.617 8a.81.81 0 01-.602-.276L.25 4.665a1.012 1.012 0 010-1.33.794.794 0 011.203 0l2.164 2.393L8.547.276a.794.794 0 011.203 0z"
  fill="white"
/>

    </Svg>
  );
}

export default SvgComponent;
