import {Button} from "@chakra-ui/react";
import * as Styles from "../../features/news/News.styles";
import {FC} from "react";

export const Menu: FC = () => {
    return <Styles.MenuWrapper>
        <Button variant='unstyled'>latest</Button>
        |
        <Button variant='unstyled'>starred</Button>
    </Styles.MenuWrapper>
}