import {Button} from "@chakra-ui/react";
import * as Styles from "../../features/news/News.styles";
import {FC} from "react";
import {useNewsDispatch, useNewsSelector} from "../../app/hooks";
import {currentPageSelector, setCurrentPage} from "../../features/news/newsSlice";
import {Pages} from "../../app/utils";

export const Menu: FC = () => {
    const dispatch = useNewsDispatch();
    const currentPage = useNewsSelector(currentPageSelector);
    const isPageSelected = (page: Pages) => currentPage === page ? 'selected' : '';
    return <Styles.MenuWrapper>
        <Button variant='unstyled' className={isPageSelected(Pages.latest)} onClick={() => dispatch(setCurrentPage(Pages.latest))}>latest</Button>
        |
        <Button variant='unstyled' className={isPageSelected(Pages.starred)} onClick={() => dispatch(setCurrentPage(Pages.starred))}>starred</Button>
    </Styles.MenuWrapper>
}