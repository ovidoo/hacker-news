import {FC} from "react";
import {NewsArticle} from "../../features/news/newsSlice";
import {Text, useColorMode} from "@chakra-ui/react";

import * as Styles from './NewsList.styles';
import {SkeletonArticle} from "./SkeletonArticle";
import {ArticleDetails} from "./ArticleProperty";
import {urlExtractor} from "../../app/utils";
import NewsItemMetadata from "./NewsItemMetadata";
import NewsCard from "../NewsCard/NewsCard";

interface NewsItemProps {
    article: NewsArticle;
    index: number;
    isLoading: boolean;
}

export const NewsItem: FC<NewsItemProps> = ({index, article, isLoading}) => {
    const {colorMode} = useColorMode();
    const {title, url} = article;

    const formattedUrl = urlExtractor(url) && urlExtractor(url)[4] ? urlExtractor(url)[4] : url;
    return <Styles.ItemWrapper>
        <SkeletonArticle isLoading={isLoading}>
            <Text color={colorMode === 'light' ? 'blackAlpha.500' : 'whiteAlpha.500'} fontWeight='400'>{index}.</Text>
            <Styles.ContentWrapper>
                <Styles.FirstRowWrapper>
                    <NewsCard article={article}>
                        <a href={url} target='_blank' rel='noreferrer'>
                            <Text color={colorMode === 'light' ? 'black' : 'white'} fontWeight='700'>{title}</Text>
                        </a>
                    </NewsCard>
                    <a href={url} target='_blank' rel="noreferrer">
                        <ArticleDetails>({formattedUrl})</ArticleDetails></a>
                </Styles.FirstRowWrapper>
                <NewsItemMetadata article={article}/>
            </Styles.ContentWrapper>
        </SkeletonArticle>
    </Styles.ItemWrapper>
}