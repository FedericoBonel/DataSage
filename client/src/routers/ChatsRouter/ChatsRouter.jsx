import { NewChat } from "@/pages/chats/components";
import { routes } from "@/utils/constants";
import { NavbarLayout } from "@/pages/layouts";

/** Router that routes all requests associated with chats */
const ChatsRouter = {
    path: routes.chats.CHATS,
    element: <NavbarLayout />,
    children: [
        {
            index: true,
            element: <NewChat />,
        },
    ],
};

export default ChatsRouter;
