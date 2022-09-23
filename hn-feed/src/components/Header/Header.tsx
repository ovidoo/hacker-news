import * as Styles from "../../features/news/News.styles";
import {Box, Button, Flex, Spacer, Text, useColorMode, Wrap} from "@chakra-ui/react";
import {Menu} from "../Menu/Menu";
import {FC, memo} from "react";
import {MdDarkMode} from "react-icons/md";
import {BsSun} from "react-icons/bs";
import {useNewsDispatch, useNewsSelector} from "../../app/hooks";
import {isDarkModeSelector, setDarkMode} from "../../features/news/newsSlice";

const Header: FC = () => {
    const dispatch = useNewsDispatch();
    const {toggleColorMode} = useColorMode();
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
        <Button variant='unstyled' p={5} onClick={() => {
            dispatch(setDarkMode(!isDarkMode))
            toggleColorMode();
        }}>
            {isDarkMode ? <BsSun/> : <MdDarkMode/>}
        </Button>
    </Flex>
}

export default memo(Header);