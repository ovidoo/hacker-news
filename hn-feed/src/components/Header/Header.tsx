import * as Styles from "../../features/news/News.styles";
import {Box, Flex, Spacer, Text, Wrap} from "@chakra-ui/react";
import {Menu} from "../Menu/Menu";
import {FC} from "react";
import {MdDarkMode} from "react-icons/md";
import {BsSun} from "react-icons/bs";

export const Header: FC = () => {
    const darkMode = false;
    console.log('render | Header');
    return <Flex>
        <Box>
            <Styles.HeaderWrapper>
                <Wrap gap='24px'>
                    <Styles.Logo>Y</Styles.Logo>
                    <Text fontSize={24} fontWeight='extrabold'>Hacker News</Text>
                </Wrap>
                <Menu/>

            </Styles.HeaderWrapper>
        </Box>
        <Spacer/>
        <Box p={10}>
            {darkMode ? <BsSun /> : <MdDarkMode/>}
        </Box>
    </Flex>
}