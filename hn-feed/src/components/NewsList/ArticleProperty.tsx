import {FC, PropsWithChildren} from "react";
import {Text} from '@chakra-ui/react'

export const ArticleDetails: FC<PropsWithChildren> = ({children}) => {
    return <Text color='blackAlpha.500' fontWeight='400'
                 fontSize={10}>{children}</Text>
}