import { Box } from "@mui/material";
import { PaginatedList } from "@/components/list";
import ChatMessageList from "./components/ChatMessageList/ChatMessageList";
import ChatMessageForm from "./components/ChatMessageForm/ChatMessageForm";
import {
    ChatConversationWrapperStyles,
    ChatConversationMessageListStyles,
} from "./ChatConversation.styles";
import propTypes from "./ChatConversation.props";

const dummyData = [
    {
        _id: "661fc8e72002a4f28c5009af",
        createdAt: "2024-04-17T13:04:39.806Z",
        from: "AI",
        to: "Human",
        content:
            "I'm sorry, but the information provided does not include details on the synthesis of a cross-platform RSS pixel.",
        sources: [],
    },
    {
        _id: "661fc8e72002a4f28c5009ae",
        createdAt: "2024-04-17T13:04:39.800Z",
        from: "Human",
        to: "AI",
        content: "We need to synthesize the cross-platform RSS pixel!",
        sources: [],
    },
    {
        _id: "661cee30a07e64e247eed031",
        createdAt: "2024-04-15T09:06:56.295Z",
        from: "AI",
        to: "Human",
        content:
            '¡Claro que sí! Imagina que quieres hacer una aplicación de computadora que pueda responder preguntas que le hagan sobre documentos escritos en lenguaje natural, como si fuera una persona respondiendo preguntas. Esta aplicación se llamará "DataSage". El objetivo es crear un programa que pueda aprender sobre diferentes temas y responder a preguntas de manera automática. ¡Será como tener un amigo robot inteligente que te ayude a responder preguntas! Y lo bueno es que se podrá compartir con otras personas para que también lo puedan usar. ¡Es como tener un amigo robot que sabe un montón de cosas especiales!',
        sources: [
            {
                _id: "661c7248a94bda7c7e168a35",
                content: " \nPageContent\n ",
                locationPage: 1,
                document: "661c7247a94bda7c7e168a30",
            },
        ],
    },
    {
        _id: "661cee30a07e64e247eed030",
        createdAt: "2024-04-15T09:06:56.289Z",
        from: "Human",
        to: "AI",
        content: "No lo entiendo. Me lo puedes explicar como un niño?",
        sources: [],
    },
    {
        _id: "661cee0ea07e64e247eed02a",
        createdAt: "2024-04-15T09:06:22.925Z",
        from: "AI",
        to: "Human",
        content:
            'RAG significa "Generación Aumentada por Recuperación" (Recovery Augmented Generation) y es un marco de trabajo o técnica que mejora la calidad de las respuestas generadas por un Modelo de Lenguaje a través de información externa para complementar su conocimiento interno.',
        sources: [],
    },
    {
        _id: "661cee0ea07e64e247eed029",
        createdAt: "2024-04-15T09:06:22.919Z",
        from: "Human",
        to: "AI",
        content: "Que es RAG?",
        sources: [],
    },
    {
        _id: "661ceddaa07e64e247eed021",
        createdAt: "2024-04-15T09:05:30.521Z",
        from: "AI",
        to: "Human",
        content:
            'Basándonos en el contexto proporcionado, sabemos que se está desarrollando un Trabajo de Fin de Grado (TFG) sobre la creación de una aplicación web de respuesta a preguntas sobre documentos PDF, utilizando modelos lingüísticos de gran tamaño (LLM) y Generación Aumentada mediante Recuperación (RAG). El proyecto se llama "DataSage" y busca personalizar chatbots para responder a preguntas sobre temas específicos sin necesidad de reentrenarlos. Además, se ha mencionado la metodología Scrum para llevar a cabo el desarrollo del proyecto de manera ágil y flexible.',
        sources: [],
    },
];

/** Renders the chat history and chat message sending form for a specific chat by id. */
const ChatConversation = ({ chatId }) => {
    const chatMessagesQuery = {
        isLoading: false,
        isSuccess: true,
        data: {
            pages: [
                {
                    data: dummyData,
                },
            ],
        },
    };

    const sendMessageQuery = {
        mutate: (object) => console.log(object),
        isPending: true,
        isSuccess: true,
    };

    const onSubmitMessage = (content) => {
        sendMessageQuery.mutate({ chatId, content });
    };

    return (
        <Box sx={ChatConversationWrapperStyles}>
            <PaginatedList
                onLoadMore={() => console.log("Loaded more")}
                listContainerStyles={ChatConversationMessageListStyles}
                isLoading={chatMessagesQuery.isLoading}
            >
                <ChatMessageList
                    chatMessagePages={chatMessagesQuery.data.pages}
                    isResponding={sendMessageQuery.isPending}
                />
            </PaginatedList>
            <ChatMessageForm
                onSend={onSubmitMessage}
                disabled={sendMessageQuery.isPending}
            />
        </Box>
    );
};

ChatConversation.propTypes = propTypes;

export default ChatConversation;
