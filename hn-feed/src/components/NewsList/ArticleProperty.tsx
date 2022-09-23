import {FC, PropsWithChildren} from "react";
import {Text, useColorMode} from '@chakra-ui/react'

export const ArticleDetails: FC<PropsWithChildren> = ({children}) => {
    const { colorMode } = useColorMode();
    return children ? <Text color={colorMode === 'light' ? 'blackAlpha.500' : 'whiteAlpha.600'} fontWeight='400'
                 fontSize={10}>{children}</Text> : <></>
}