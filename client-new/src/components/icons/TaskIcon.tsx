import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface TaskIcon {
  focused: boolean;
}

const TaskIcon = ({ focused }) => {
  return (
    <Svg width="28" height="26" viewBox="0 0 33 30" fill="none">
      <G clip-path="url(#clip0_3149_20830)">
        <Path
          d="M29.6038 8.49121H3.39621C1.52053 8.49121 0 9.96847 0 11.7908V26.7007C0 28.523 1.52053 30.0002 3.39621 30.0002H29.6038C31.4795 30.0002 33 28.523 33 26.7007V11.7908C33 9.96847 31.4795 8.49121 29.6038 8.49121Z"
          fill={focused ? 'green' : '#2F1D12'}
        />
        <Path
          d="M8.28765 0H24.7123C26.3467 0 27.6796 1.29505 27.6796 2.88288C27.6796 3.06306 27.529 3.22072 27.3319 3.22072H5.66805C5.48259 3.22072 5.32031 3.07432 5.32031 2.88288C5.32031 1.29505 6.65329 0 8.28765 0Z"
          fill={focused ? 'green' : '#2F1D12'}
        />
        <Path
          d="M5.49468 4.24536H27.5063C29.1406 4.24536 30.4736 5.54041 30.4736 7.12824C30.4736 7.30842 30.3229 7.46608 30.1259 7.46608H2.87508C2.68962 7.46608 2.52734 7.31969 2.52734 7.12824C2.52734 5.54041 3.86033 4.24536 5.49468 4.24536Z"
          fill={focused ? 'green' : '#2F1D12'}
        />
        <Path
          d="M19.9707 18.0405V16.2612H17.977V18.0405H19.9707Z"
          fill="white"
        />
        <Path
          d="M13.2139 22.2184C14.0137 22.241 14.825 22.2635 15.6248 22.2747C16.216 22.286 16.8303 22.2973 17.4099 22.1621C18.2908 21.9594 19.0674 21.4301 19.5195 20.7319C17.9662 20.7319 16.413 20.7094 14.8598 20.7094C14.9294 19.3468 14.941 17.9842 14.8946 16.6216C14.1875 16.8919 13.6891 17.5 13.4341 18.1419C13.1791 18.7837 13.1675 19.4932 13.1907 20.1801C13.2139 20.8671 13.295 21.554 13.2255 22.2184H13.2139Z"
          fill="white"
        />
        <Path
          d="M17.1546 16.2165C16.8301 16.2052 16.4939 16.2052 16.1694 16.2165C16.065 16.2165 15.9491 16.239 15.868 16.3065C15.7637 16.3854 15.7637 16.5318 15.7637 16.6556C15.7637 17.7705 15.7637 18.8966 15.7637 20.0115L19.6467 19.989C19.7394 19.989 19.8438 19.989 19.9133 19.9214C19.9828 19.8651 19.9828 19.7638 19.9828 19.6849C19.9828 19.3471 19.9828 19.0205 19.9713 18.6827H17.1546C17.1546 17.8493 17.1546 17.016 17.1662 16.2165H17.1546Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3149_20830">
          <Rect width="33" height="30" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default TaskIcon;
