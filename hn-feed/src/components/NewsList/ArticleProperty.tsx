import {FC, PropsWithChildren} from "react";
import {Text, useColorMode} from '@chakra-ui/react'

export const ArticleDetails: FC<PropsWithChildren> = ({children}) => {
    const { colorMode } = useColorMode();
    return <Text color={colorMode === 'light' ? 'blackAlpha.500' : 'whiteAlpha.500'} fontWeight='400'
                 fontSize={10}>{children}</Text>
}