import styled from "styled-components";

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: hsla(333, 100%, 53%, 1);

  background: linear-gradient(
    90deg,
    hsla(333, 100%, 53%, 1) 0%,
    hsla(33, 94%, 57%, 1) 100%
  );

  background: -moz-linear-gradient(
    90deg,
    hsla(333, 100%, 53%, 1) 0%,
    hsla(33, 94%, 57%, 1) 100%
  );

  background: -webkit-linear-gradient(
    90deg,
    hsla(333, 100%, 53%, 1) 0%,
    hsla(33, 94%, 57%, 1) 100%
  );

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#FF0F7B", endColorstr="#F89B29", GradientType=1 );
`;
