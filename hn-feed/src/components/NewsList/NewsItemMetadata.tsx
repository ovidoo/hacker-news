import {FC, memo} from "react";
import {ArticleDetails} from "./ArticleProperty";
import {formatTimeStamp} from "../../app/utils";
import * as Styles from "./NewsList.styles";
import {NewsArticle, saveById} from "../../features/news/newsSlice";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {useNewsDispatch} from "../../app/hooks";
import {useColorMode} from "@chakra-ui/react";

interface NewsItemMetadataProps {
    article: NewsArticle;
    isComment?: boolean;
}
const NewsItemMetadata: FC<NewsItemMetadataProps> = ({article, isComment}) => {
    const dispatch = useNewsDispatch();
    const {colorMode} = useColorMode();

    const {score, by, time, descendants, kids, saved} = article;
    return <Styles.SecondRowWrapper>
        {score && <ArticleDetails>{score} points</ArticleDetails>}
        {by && <ArticleDetails>by {by}</ArticleDetails>}
        {time && <ArticleDetails>{formatTimeStamp(time)}</ArticleDetails>}
        <ArticleDetails>|</ArticleDetails>
        {descendants && <ArticleDetails>comments {descendants}</ArticleDetails>}
        {kids && <ArticleDetails>kids {kids.length}</ArticleDetails>}
        <ArticleDetails>|</ArticleDetails>
        {!isComment && <Styles.SavedWrapper $saved={saved} $isDark={colorMode === 'dark'} onClick={() => dispatch(saveById(article))}>
            <Styles.StarWrapper>{saved ? <AiFillStar/> :
                <AiOutlineStar/>}</Styles.StarWrapper>
            <ArticleDetails>{saved ? 'saved' : 'save'}</ArticleDetails>
        </Styles.SavedWrapper>}
    </Styles.SecondRowWrapper>
}

export default memo(NewsItemMetadata)