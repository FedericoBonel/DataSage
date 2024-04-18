import { NavbarLayout } from "@/pages/layouts";
import { NewChat, ChatSettings } from "@/pages/chats";
import { ChatListLayout } from "@/pages/chats/layouts";
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
                {
                    path: `:chatId/${routes.SETTINGS}`,
                    element: <ChatSettings />,
                },
            ],
        },
    ],
};

export default ChatsRouter;
