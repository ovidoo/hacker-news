import {FC, useEffect} from "react";
import {useNewsDispatch, useNewsSelector} from "../../app/hooks";
import {getNewsAsync, isLoadingSelector, loadAllLatestAsync} from "./newsSlice";
import {Box, Button, Center, Divider, Progress, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {NewsList} from "../../components/NewsList/NewsList";

import * as Styles from './News.styles';
import {Menu} from "../../components/Menu/Menu";
import {Header} from "../../components/Header/Header";

export const News: FC = () => {
    const isLoading = useNewsSelector(isLoadingSelector);
    const newsList = useNewsSelector(state => state.news.list);
    const allStories = useNewsSelector(state => state.news.allStories);
    const dispatch = useNewsDispatch();

    console.log('render | News');

    useEffect(() => {
        if (!allStories.length) {
            dispatch(loadAllLatestAsync());
        } else {
            dispatch(getNewsAsync({latestStories: allStories, startFrom: newsList.length}));
        }
    }, [allStories])

    return <div>
        <Progress height='4px' colorScheme='brand' value={100} isIndeterminate={isLoading}/>
        <Styles.FeedWrapper>
            <Header/>
            <NewsList list={newsList}/>
            <Button colorScheme='brand'
                    onClick={() => dispatch(getNewsAsync({latestStories: allStories, startFrom: newsList.length}))}>
                show more
            </Button>
            <Divider mt={5} mb={5} h='2px' bg='brand.1'/>
        </Styles.FeedWrapper>
        <Styles.FooterWrapper mb={5}>
            <Text fontSize={20} fontWeight='bold'>Hacker News</Text>
            <Menu/>
        </Styles.FooterWrapper>
    </div>
}