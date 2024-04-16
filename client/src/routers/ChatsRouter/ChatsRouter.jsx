import { NewChat } from "@/pages/chats/components";
import { routes } from "@/utils/constants";
import { ChatListLayout, NavbarLayout } from "@/pages/layouts";

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
