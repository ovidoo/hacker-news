import styled from "@emotion/styled";
import {Box, Center} from "@chakra-ui/react";
import theme from "../../styles/theme";

export const Logo = styled.div`
  background-color: ${() => theme.colors.brand['1']};
  color: ${() => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 33px;
  font-size: 18px;
`

export const HeaderWrapper = styled(Box)`
  display: flex;
  gap: 36px;
  margin: 2vh 0 3vh;
`

export const FeedWrapper = styled(Box)`
  margin: 0 5vw;
`
export const FooterWrapper = styled(Box)`
  margin: 0 5vw;
`
export const MenuWrapper = styled(Center)`
  gap: 10px;

  .selected {
    color: ${() => theme.colors.brand['1']};
  }

  button {
    &:hover {
      color: ${() => theme.colors.brand['1']};
    }
  }
`