import {FC, memo, useCallback, useEffect, useState} from "react";
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text, useColorMode} from "@chakra-ui/react";
import NewsItemMetadata from "../NewsList/NewsItemMetadata";
import {ArticleComment} from "../../features/news/newsSlice";
import {fetchNews} from "../../features/news/newsApi";
import {ArticleDetails} from "../NewsList/ArticleProperty";

interface CommentProps {
    comment: ArticleComment;
}
const Comment: FC<CommentProps> = memo(({comment}) => {
    const {colorMode} = useColorMode();
    const {text, id} = comment;

    if(!text) {
        return <></>
    }

    return <AccordionItem>
        <AccordionButton>
            <Text width='100%' color={colorMode === 'light' ? 'blackAlpha.800' : 'whiteAlpha.800'}
                  fontWeight='400' key={id}>
                                        <span style={{display: "flex", width: '100%'}}
                                              dangerouslySetInnerHTML={{__html: `${text.split(' ').slice(0, 10).join(' ')}...`}}/>
            </Text>
            <AccordionIcon/>
        </AccordionButton>
        <AccordionPanel>
            <div style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{__html: text}}/>
        </AccordionPanel>
        <NewsItemMetadata isComment={true} article={comment as any}/>
        <Box ml={5}>
            <Comments isOpen={true} kids={comment.kids} />
        </Box>
    </AccordionItem>
})

interface CommentsProps {
    kids: number[];
    isOpen: boolean;
}
const Comments: FC<CommentsProps> = ({kids, isOpen= false}) => {
    const [comments, fetchComments] = useFetchComments(isOpen, kids);

    useEffect(() => {
        fetchComments();
    }, [isOpen])

    if(!comments) {
        return <></>;
    }

    return <Accordion defaultIndex={[comments[0].id]} allowMultiple style={{display: isOpen ? 'initial' : 'none'}}>
        {comments.filter(d => !!d.text)?.map(d => <Comment key={d.id} comment={d} />)}
    </Accordion>
}

export default memo(Comments);

const useFetchComments = (isOpen: boolean, kids: number[]): [ArticleComment[] | undefined, () => void] => {
    const [comments, setComments] = useState<ArticleComment[]>();

    const fetchComments = useCallback(() => {
        if(!kids || !isOpen) {
            return;
        }
        (async () => {
            const _comments = await fetchNews({
                latestStories: kids,
                storiesPerPage: kids.length,
                startFrom: 0
            }) as any as ArticleComment[];
            console.log(_comments);
            setComments(_comments)
        })()
    }, [isOpen, kids])

    return [comments, fetchComments];
}