import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const StrikeAnimationTypo = styled(Typography)`
  @keyframes strike {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }

  @keyframes opacity {
    100% {
      opacity: 50%;
    }
  }

  position: relative;
  animation: opacity 0.5s forwards;

  &::after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.palette.text.primary};
    animation-name: strike;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
`;

const StrikeTypo = styled(Typography)`
  opacity: 50%;
  text-decoration: line-through;
`;

const TimeTypo = styled(Typography)`
  opacity: 60%;
`;

export { TimeTypo, StrikeTypo, StrikeAnimationTypo };
