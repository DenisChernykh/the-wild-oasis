import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const Overlay = styled.div`
  position: absolute;
  display: ${(props) => (props.$isLoading ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
`;

const BlurredContent = styled.div`
  filter: ${(props) => (props.$$isLoading ? 'blur(5px)' : 'none')};
  pointer-events: ${(props) => (props.$isLoading ? 'none' : 'auto')};
`;

const SpinnerOverlay = ({ isLoading, children }) => {
  return (
    <div style={{ position: 'relative' }}>
      <BlurredContent $isLoading={isLoading}>{children}</BlurredContent>
      <Overlay $isLoading={isLoading}>
        <Spinner />
      </Overlay>
    </div>
  );
};

export default SpinnerOverlay;