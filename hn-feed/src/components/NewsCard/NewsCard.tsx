import {
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal, useColorMode, useDisclosure
} from "@chakra-ui/react";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import {NewsArticle} from "../../features/news/newsSlice";
import NewsItemMetadata from "../NewsList/NewsItemMetadata";
import Comments from "./Comment";

interface NewsCardProps extends PropsWithChildren<any> {
    article: NewsArticle;
}

const NewsCard: FC<NewsCardProps> = ({article, children}) => {
    const {title, kids, url} = article;
    const { isOpen, onToggle, onClose } = useDisclosure()

    return <Popover onClose={onClose} closeOnBlur={true} isOpen={isOpen} closeDelay={500} placement='right-end' trigger='hover'>
        <PopoverTrigger>
            <div onFocus={onToggle} onMouseOver={onToggle}>{children}</div>
        </PopoverTrigger>
        <Portal>
            <PopoverContent width='40vw' height='40vh'>
                <PopoverArrow/>
                <PopoverCloseButton/>
                <PopoverHeader>{title}</PopoverHeader>
                <PopoverBody overflow='auto'>
                    {/*<iframe src={url} width='100%' height={300} />*/}
                    <Comments isOpen={isOpen} kids={kids}/>
                    <NewsItemMetadata article={article}/>
                </PopoverBody>
            </PopoverContent>
        </Portal>

    </Popover>
}

export default NewsCard