import styled from "@emotion/styled";
import {Icon, ListItem} from "@chakra-ui/react";
import {theme} from "../../styles/theme";

export const ItemWrapper = styled(ListItem)`
  display: grid;
  justify-content: start;
  grid-template-columns: 30px 1fr;
  gap: 10px;
`

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  gap: 10px;
`;

export const FirstRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  justify-items: start;
  text-align: left;
  gap: 12px;
`

export const SecondRowWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
`

export const StarWrapper = styled.div`
`

export const SavedWrapper = styled.div<{$isDark: boolean, $saved: boolean}>`
  display: flex;
  gap: 5px;
  cursor: pointer;
  
  svg {
      fill: ${({$isDark}) => $isDark && theme.colors.whiteAlpha['600']};
      fill: ${({$isDark}) => !$isDark && theme.colors.blackAlpha['500']};
      fill: ${({$saved}) => $saved && theme.colors.brand['900']};
  }
  
  &:hover {
    .chakra-text {
      color: ${() => theme.colors.brand['900']}; 
    }
    svg {
      fill: ${() => theme.colors.brand['900']};
    }
  }
`