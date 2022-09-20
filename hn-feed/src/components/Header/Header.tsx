import * as Styles from "../../features/news/News.styles";
import {Box, Button, Flex, Spacer, Text, Wrap} from "@chakra-ui/react";
import {Menu} from "../Menu/Menu";
import {FC} from "react";
import {MdDarkMode} from "react-icons/md";
import {BsSun} from "react-icons/bs";
import {useCounterDispatch, useNewsSelector} from "../../app/hooks";
import {isDarkModeSelector, setDarkMode} from "../../features/news/newsSlice";

export const Header: FC = () => {
    const dispatch = useCounterDispatch();
    const isDarkMode = useNewsSelector(isDarkModeSelector);
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
        <Button variant='unstyled' p={5} onClick={() => dispatch(setDarkMode(!isDarkMode))}>
            {isDarkMode ? <BsSun/> : <MdDarkMode/>}
        </Button>
    </Flex>
}