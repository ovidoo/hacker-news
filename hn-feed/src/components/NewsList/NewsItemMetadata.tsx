import {FC, memo, useState} from "react";
import {ArticleDetails} from "./ArticleProperty";
import {formatTimeStamp} from "../../app/utils";
import * as Styles from "./NewsList.styles";
import {NewsArticle, saveById} from "../../features/news/newsSlice";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {useNewsDispatch} from "../../app/hooks";
import {Stack, useColorMode} from "@chakra-ui/react";
import Comments from "../NewsCard/Comment";

interface NewsItemMetadataProps {
    article: NewsArticle;
    isComment?: boolean;
}

const NewsItemMetadata: FC<NewsItemMetadataProps> = ({article, isComment}) => {
    const dispatch = useNewsDispatch();
    const {colorMode} = useColorMode();
    const [isOpen, setIsOpen] = useState(false);

    const {score, by, time, descendants, kids, saved} = article;
    return <Stack>
        <Styles.SecondRowWrapper>
            {score && <ArticleDetails>{score} points</ArticleDetails>}
            {by && <ArticleDetails>by {by}</ArticleDetails>}
            {time && <ArticleDetails>{formatTimeStamp(time)}</ArticleDetails>}
            <ArticleDetails>|</ArticleDetails>
            {!!descendants && <Styles.SavedWrapper $saved={false} $isDark={false}
                                                   onClick={() => setIsOpen(!isOpen)}>
                <ArticleDetails>comments {descendants}</ArticleDetails>
            </Styles.SavedWrapper>}
            <ArticleDetails>|</ArticleDetails>
            {!isComment && <Styles.SavedWrapper $saved={saved} $isDark={colorMode === 'dark'}
                                                onClick={() => dispatch(saveById(article))}>
                <Styles.StarWrapper>{saved ? <AiFillStar/> :
                    <AiOutlineStar/>}</Styles.StarWrapper>
                <ArticleDetails>{saved ? 'saved' : 'save'}</ArticleDetails>
            </Styles.SavedWrapper>}
        </Styles.SecondRowWrapper>
        {<Comments isOpen={isOpen} kids={kids}/>}
    </Stack>
}

export default memo(NewsItemMetadata)