import {FC} from "react";
import {useNewsDispatch, useNewsSelector} from "../../app/hooks";
import {getNewsAsync, isLoadingSelector} from "./newsSlice";
import {Button, Center, Divider, Progress, Text} from "@chakra-ui/react";
import {NewsList} from "../../components/NewsList/NewsList";

import * as Styles from './News.styles';
import {Menu} from "../../components/Menu/Menu";

export const News: FC = () => {
    const isLoading = useNewsSelector(isLoadingSelector);
    const newsList = useNewsSelector(state => state.news.list);
    const dispatch = useNewsDispatch();
    return <div>
        <Progress height='4px' colorScheme='brand' value={100} isIndeterminate={isLoading}/>
        <Styles.FeedWrapper>
            <Styles.HeaderWrapper>
                <Text fontSize={24} fontWeight='extrabold'>Hacker News</Text>
                <Menu/>
            </Styles.HeaderWrapper>
            <NewsList list={newsList}/>
            <Button colorScheme='brand' onClick={() => dispatch(getNewsAsync())}>show more</Button>
            <Divider mt={5} mb={5} h='2px' bg='brand.1'/>
        </Styles.FeedWrapper>
        <Styles.FooterWrapper mb={5}>
            <Text fontSize={20} fontWeight='bold'>Hacker News</Text>
            <Menu/>
        </Styles.FooterWrapper>
    </div>
}