import {FC, memo, useEffect} from "react";
import {useNewsDispatch, useNewsSelector} from "../../app/hooks";
import {
    currentPageSelector,
    getNewsAsync,
    isLoadingSelector,
    setCurrentPage,
    storiesListSelector
} from "./newsSlice";
import {Button, Divider, Flex, Progress, Spacer, Text} from "@chakra-ui/react";
import {NewsList} from "../../components/NewsList/NewsList";

import * as Styles from './News.styles';
import {Menu} from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";
import {handleStoreChange, Pages} from "../../app/utils";
import {store} from "../../app/store";

const News: FC = () => {
    const isLoading = useNewsSelector(isLoadingSelector);
    const newsList = useNewsSelector(storiesListSelector);
    const allStories = useNewsSelector(state => state.news.allStories);
    const currentPage = useNewsSelector(currentPageSelector);
    const isStarred = currentPage === Pages.starred;
    const dispatch = useNewsDispatch();

    console.log('render | News');

    useEffect(() => {
        const unsubscribe = store.subscribe(() => handleStoreChange(store));

        return () => unsubscribe();
    }, []);

    return <div>
        <Progress height='4px' colorScheme='brand' value={100} isIndeterminate={isLoading}/>
        <Styles.FeedWrapper>
            <Header/>
            <NewsList isLoading={isLoading} list={isStarred ? newsList.filter(d => d.saved) : newsList}/>
            <Spacer mt={5}/>
            <Flex ml={10} justifyItems='start'>
                <Button colorScheme='brand'
                        onClick={() => {
                            dispatch(getNewsAsync({latestStories: allStories, startFrom: newsList.length}))
                            currentPage !== Pages.latest && dispatch(setCurrentPage(Pages.latest));
                        }}>
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

export default memo(News)