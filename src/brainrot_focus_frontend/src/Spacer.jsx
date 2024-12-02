import styled from "styled-components";

export const Spacer = styled.div`
    margin-${({ direction }) => direction}: ${({ size }) => size}px;
`;
