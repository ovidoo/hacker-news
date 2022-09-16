import {FC, PropsWithChildren} from "react";
import {Box, Skeleton, SkeletonCircle, SkeletonText} from "@chakra-ui/react";

interface SkeletonArticleProps extends PropsWithChildren<any> {
    isLoading: boolean;
}

export const SkeletonArticle: FC<SkeletonArticleProps> = ({isLoading, children}) => {
    if (!isLoading) {
        return children
    }

    return <>
        <Skeleton height='10px' width='10px'/>
        <Skeleton width='100%'/>
    </>
}