import {FC, useEffect} from "react";
import {useNewsDispatch, useNewsSelector} from "../../app/hooks";
import {getNewsAsync, isLoadingSelector, loadAllLatestAsync, storiesListSelector} from "./newsSlice";
import {Box, Button, Center, Container, Divider, Flex, Progress, Spacer, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {NewsList} from "../../components/NewsList/NewsList";

import * as Styles from './News.styles';
import {Menu} from "../../components/Menu/Menu";
import {Header} from "../../components/Header/Header";

export const News: FC = () => {
    const isLoading = useNewsSelector(isLoadingSelector);
    const newsList = useNewsSelector(storiesListSelector);
    const allStories = useNewsSelector(state => state.news.allStories);
    const dispatch = useNewsDispatch();

    console.log('render | News');

    useEffect(() => {
        if (!allStories.length) {
            dispatch(loadAllLatestAsync());
        }
    }, []);

    return <div>
        <Progress height='4px' colorScheme='brand' value={100} isIndeterminate={isLoading}/>
        <Styles.FeedWrapper>
            <Header/>
            <NewsList isLoading={isLoading} list={newsList}/>
            <Spacer mt={5}/>
            <Flex ml={10} justifyItems='start'>
                <Button colorScheme='brand'
                        onClick={() => dispatch(getNewsAsync({latestStories: allStories, startFrom: newsList.length}))}>
                    show more
                </Button>
            </Flex>
            <Divider mt={5} mb={5} h='2px' bg='brand.1'/>
        </Styles.FeedWrapper>
        <Styles.FooterWrapper mb={5}>
            <Text fontSize={20} fontWeight='bold'>Hacker News</Text>
            <Menu/>
        </Styles.FooterWrapper>
    </div>
}