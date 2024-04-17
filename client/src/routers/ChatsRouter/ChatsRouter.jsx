import { NewChat } from "@/pages/chats/components";
import { ChatListLayout, NavbarLayout } from "@/pages/layouts";
import { routes } from "@/utils/constants";

/** Router that routes all requests associated with chats */
const ChatsRouter = {
    path: routes.chats.CHATS,
    element: <NavbarLayout />,
    children: [
        {
            path: "*",
            element: <ChatListLayout />,
            children: [
                {
                    index: true,
                    element: <NewChat />,
                },
            ],
        },
    ],
};

export default ChatsRouter;
