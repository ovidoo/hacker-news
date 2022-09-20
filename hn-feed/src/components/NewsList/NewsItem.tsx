import {FC} from "react";
import {NewsArticle, saveById} from "../../features/news/newsSlice";
import {Text} from "@chakra-ui/react";

import * as Styles from './NewsList.styles';
import {SkeletonArticle} from "./SkeletonArticle";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {ArticleDetails} from "./ArticleProperty";
import {formatTimeStamp, urlExtractor} from "../../app/utils";
import {useCounterDispatch} from "../../app/hooks";

interface NewsItemProps {
    article: NewsArticle;
    index: number;
    isLoading: boolean;
}
export const NewsItem: FC<NewsItemProps> = ({index, article, isLoading}) => {
  const dispatch = useCounterDispatch();
    const {title, saved, url, score, by, descendants, time} = article;

    const formattedUrl = urlExtractor(url) && urlExtractor(url)[4] ? urlExtractor(url)[4] : url;
    return <Styles.ItemWrapper>
        <SkeletonArticle isLoading={isLoading}>
            <Text color='blackAlpha.500' fontWeight='400'>{index}.</Text>
            <Styles.ContentWrapper>
                <Styles.FirstRowWrapper>
                    <Text color='black' fontWeight='700'>{title}</Text>
                    <a href={url} target='_blank' rel="noreferrer">
                        <ArticleDetails>({formattedUrl})</ArticleDetails></a>
                </Styles.FirstRowWrapper>
                <Styles.SecondRowWrapper>
                    <ArticleDetails>{score} points</ArticleDetails>
                    <ArticleDetails>by {by}</ArticleDetails>
                    <ArticleDetails>{formatTimeStamp(time)}</ArticleDetails>
                    <ArticleDetails>|</ArticleDetails>
                    <ArticleDetails>comments {descendants}</ArticleDetails>
                    <ArticleDetails>|</ArticleDetails>
                    <Styles.SavedWrapper onClick={() => dispatch(saveById(article))}>
                        <Styles.StarWrapper $saved={saved}>{saved ? <AiFillStar/> :
                            <AiOutlineStar/>}</Styles.StarWrapper>
                        <ArticleDetails>{saved ? 'saved' : 'save'}</ArticleDetails>
                    </Styles.SavedWrapper>
                </Styles.SecondRowWrapper>
            </Styles.ContentWrapper>
        </SkeletonArticle>
    </Styles.ItemWrapper>
}