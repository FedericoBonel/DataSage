import { lazy } from "react";
import { NavbarLayout } from "@/pages/layouts";
import Suspense from "@/routers/components/Suspense";
const ChatListLayout = lazy(() =>
    import("@/pages/chats/layouts/ChatListLayout")
);
const NewChat = lazy(() => import("@/pages/chats/NewChat"));
const ChatSettings = lazy(() => import("@/pages/chats/ChatSettings"));
const ChatParticipants = lazy(() => import("@/pages/chats/ChatParticipants"));
const ChatConversation = lazy(() => import("@/pages/chats/ChatConversation"));
import { routes } from "@/utils/constants";

/** Router that routes all requests associated with chats */
const ChatsRouter = {
    path: routes.chats.CHATS,
    element: <NavbarLayout />,
    children: [
        {
            path: "*",
            element: (
                <Suspense>
                    <ChatListLayout />
                </Suspense>
            ),
            children: [
                {
                    index: true,
                    element: (
                        <Suspense>
                            <NewChat />
                        </Suspense>
                    ),
                },
                {
                    path: ":chatId",
                    element: (
                        <Suspense>
                            <ChatConversation />
                        </Suspense>
                    ),
                },
                {
                    path: `:chatId/${routes.SETTINGS}`,
                    element: (
                        <Suspense>
                            <ChatSettings />
                        </Suspense>
                    ),
                },
                {
                    path: `:chatId/${routes.chats.PARTICIPANTS}`,
                    element: (
                        <Suspense>
                            <ChatParticipants />
                        </Suspense>
                    ),
                },
            ],
        },
    ],
};

export default ChatsRouter;
