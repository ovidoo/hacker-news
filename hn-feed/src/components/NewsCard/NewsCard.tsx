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
    const {title, url} = article;
    const { isOpen, onToggle, onClose } = useDisclosure()

    return <Popover onClose={onClose} closeOnBlur={true} isOpen={isOpen} closeDelay={500} placement='right-end' trigger='hover'>
        <PopoverTrigger>
            <div onFocus={onToggle} onMouseOver={onToggle}>{children}</div>
        </PopoverTrigger>
        <Portal>
            <PopoverContent opacity={0.8} width='50vw'>
                <PopoverArrow/>
                <PopoverCloseButton/>
                <PopoverHeader><a href={url}>{title}</a></PopoverHeader>
                <PopoverBody overflow='auto' height='60vh'>
                    <iframe src={url} width='100%' height='95%' />
                    <NewsItemMetadata article={article}/>
                </PopoverBody>
            </PopoverContent>
        </Portal>

    </Popover>
}

export default NewsCard