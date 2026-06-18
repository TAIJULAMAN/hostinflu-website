"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Send, Menu, MoreVertical, Image, CheckCheck, X } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useGetAllConversationsQuery, useGetMessagesByReceiverIdQuery, useSendMessageMutation } from "@/Redux/api/chat/chatApi";
import { useMyProfileQuery } from "@/Redux/api/user/userApi";
import { imgUrl } from "@/config/envConfig";

type Participant = {
    _id?: string;
    name?: string;
    image?: string;
    email?: string;
    isActive?: boolean;
};

type Conversation = {
    _id?: string;
    participants?: Participant[];
    lastMessage?: {
        _id?: string;
        text?: string;
        seen?: boolean;
        msgByUserId?: string;
        createdAt?: string;
        conversationId?: string;
    };
};

type Message = {
    _id: string;
    text?: string;
    seen?: boolean;
    msgByUserId?: string;
    createdAt?: string;
    conversationId?: string;
    isOptimistic?: boolean;
    images?: string[];
    imageUrl?: any[];
};

const getMessageTime = (message?: { createdAt?: string }) =>
    message?.createdAt ? new Date(message.createdAt).getTime() : 0;

const areMessagesEquivalent = (
    firstMessage?: Pick<Message, "text" | "msgByUserId" | "createdAt">,
    secondMessage?: Pick<Message, "text" | "msgByUserId" | "createdAt">
) => {
    if (!firstMessage || !secondMessage) {
        return false;
    }

    return (
        firstMessage.msgByUserId === secondMessage.msgByUserId &&
        firstMessage.text === secondMessage.text &&
        Math.abs(getMessageTime(firstMessage) - getMessageTime(secondMessage)) < 120000
    );
};

const getImageSrc = (image?: string) => {
    if (!image) {
        return "/placeholder-user.jpg";
    }

    return image.startsWith("http") ? image : `${imgUrl}${image}`;
};

const Chat = () => {
    const searchParams = useSearchParams();
    const requestedUserId = searchParams.get("userId");
    const requestedUserName = searchParams.get("name");
    const requestedUserImage = searchParams.get("image");

    const { data: conversationData, isLoading: isConversationsLoading, refetch: refetchConversations } = useGetAllConversationsQuery({});
    const { data: profileData } = useMyProfileQuery({});

    const currentUserId = profileData?.data?._id;
    const conversations = (conversationData?.data?.conversations || []) as Conversation[];

    const resolveOtherParticipant = (conversation: Conversation) => {
        if (!conversation?.participants?.length) {
            return null;
        }

        return (
            conversation.participants.find((participant) => participant?._id !== currentUserId) ||
            conversation.participants[0]
        );
    };

    const normalizedConversations = useMemo(
        () =>
            conversations.map((conversation) => ({
                ...conversation,
                otherParticipant: resolveOtherParticipant(conversation),
            })),
        [conversations, currentUserId]
    );

    const conversationByRequestedUser = useMemo(
        () =>
            normalizedConversations.find(
                (conversation) => conversation.otherParticipant?._id === requestedUserId
            ),
        [normalizedConversations, requestedUserId]
    );

    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [manualRecipient, setManualRecipient] = useState<Participant | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(null);
    const [sendMessageMutation] = useSendMessageMutation();

    const [newMessage, setNewMessage] = useState("");
    const [showSidebar, setShowSidebar] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [optimisticMessages, setOptimisticMessages] = useState<Message[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!requestedUserId) {
            return;
        }

        if (conversationByRequestedUser?._id) {
            setSelectedConversationId(conversationByRequestedUser._id);
            setManualRecipient(null);
            return;
        }

        setSelectedConversationId(null);
        setManualRecipient({
            _id: requestedUserId,
            name: requestedUserName || "New conversation",
            image: requestedUserImage || undefined,
        });
    }, [conversationByRequestedUser, requestedUserId, requestedUserImage, requestedUserName]);

    useEffect(() => {
        if (requestedUserId || selectedConversationId || normalizedConversations.length === 0) {
            return;
        }

        setSelectedConversationId(normalizedConversations[0]?._id || null);
    }, [normalizedConversations, requestedUserId, selectedConversationId]);

    const selectedConversation = useMemo(
        () =>
            normalizedConversations.find((conversation) => conversation._id === selectedConversationId) || null,
        [normalizedConversations, selectedConversationId]
    );

    const otherParticipant = selectedConversation?.otherParticipant || manualRecipient;
    const receiverId = otherParticipant?._id;

    const { data: messagesData, isLoading: isMessagesLoading, refetch: refetchMessages } = useGetMessagesByReceiverIdQuery(
        receiverId,
        { skip: !receiverId }
    );

    const apiMessages = (messagesData?.data?.messages || []) as Message[];

    useEffect(() => {
        if (!currentUserId) {
            return;
        }

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const socket = io(imgUrl, {
            auth: token ? { token: `Bearer ${token}` } : undefined,
            query: { userId: currentUserId, token: token || "" },
            transports: ["websocket", "polling"],
            withCredentials: true,
        });

        socketRef.current = socket;

        const handleChatUpdate = () => {
            refetchMessages();
            refetchConversations();
        };

        socket.on("single-chat-receive-message", handleChatUpdate);
        socket.on("new-message", handleChatUpdate);
        socket.on("single-chat-message-sent", handleChatUpdate);

        return () => {
            socket.off("single-chat-receive-message", handleChatUpdate);
            socket.off("new-message", handleChatUpdate);
            socket.off("single-chat-message-sent", handleChatUpdate);
            socket.disconnect();
            socketRef.current = null;
        };
    }, [currentUserId, refetchConversations, refetchMessages]);

    useEffect(() => {
        setOptimisticMessages([]);
    }, [receiverId]);

    useEffect(() => {
        if (!apiMessages.length) {
            return;
        }

        setOptimisticMessages((currentOptimisticMessages) =>
            currentOptimisticMessages.filter((optimisticMessage) => {
                return !apiMessages.some((apiMessage) =>
                    areMessagesEquivalent(apiMessage, optimisticMessage)
                );
            })
        );
    }, [apiMessages]);

    const displayedMessages = useMemo(() => {
        const mergedMessages = new Map<string, Message>();

        apiMessages.forEach((message) => {
            mergedMessages.set(message._id, message);
        });

        if (selectedConversation?.lastMessage?._id && !mergedMessages.has(selectedConversation.lastMessage._id)) {
            const sidebarLastMessage: Message = {
                _id: selectedConversation.lastMessage._id,
                text: selectedConversation.lastMessage.text,
                seen: selectedConversation.lastMessage.seen,
                msgByUserId: selectedConversation.lastMessage.msgByUserId,
                createdAt: selectedConversation.lastMessage.createdAt,
                conversationId: selectedConversation.lastMessage.conversationId,
            };

            const hasEquivalentApiMessage = apiMessages.some((apiMessage) =>
                areMessagesEquivalent(apiMessage, sidebarLastMessage)
            );
            const hasEquivalentOptimisticMessage = optimisticMessages.some((optimisticMessage) =>
                areMessagesEquivalent(optimisticMessage, sidebarLastMessage)
            );

            if (!hasEquivalentApiMessage && !hasEquivalentOptimisticMessage) {
                mergedMessages.set(selectedConversation.lastMessage._id, sidebarLastMessage);
            }
        }

        optimisticMessages.forEach((message) => {
            const hasEquivalentMessage = Array.from(mergedMessages.values()).some((mergedMessage) =>
                areMessagesEquivalent(mergedMessage, message)
            );

            if (!hasEquivalentMessage) {
                mergedMessages.set(message._id, message);
            }
        });

        return Array.from(mergedMessages.values()).sort((firstMessage, secondMessage) => {
            return getMessageTime(firstMessage) - getMessageTime(secondMessage);
        });
    }, [apiMessages, optimisticMessages, selectedConversation?.lastMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayedMessages]);

    const filteredConversations = normalizedConversations.filter((conversation) =>
        conversation.otherParticipant?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectConversation = (conversationId: string) => {
        setSelectedConversationId(conversationId);
        setManualRecipient(null);
        setShowSidebar(false);
    };

    const sendMessage = async () => {
        if ((!newMessage.trim() && !selectedFile) || !receiverId) {
            return;
        }

        const trimmedMessage = newMessage.trim();
        const optimisticMessage: Message = {
            _id: `temp-${Date.now()}`,
            text: trimmedMessage,
            seen: false,
            msgByUserId: currentUserId,
            createdAt: new Date().toISOString(),
            conversationId: selectedConversation?._id,
            isOptimistic: true,
            images: selectedFilePreview ? [selectedFilePreview] : undefined,
        };

        setOptimisticMessages((currentOptimisticMessages) => [
            ...currentOptimisticMessages,
            optimisticMessage,
        ]);

        const currentFile = selectedFile;
        setNewMessage("");
        removeSelectedFile();

        if (currentFile) {
            const formData = new FormData();
            formData.append("images", currentFile, currentFile.name);
            formData.append("text", trimmedMessage || "");

            try {
                await sendMessageMutation({ receiverId, formData }).unwrap();
            } catch (err) {
                console.error("Failed to send file message", err);
            }
        } else if (socketRef.current) {
            socketRef.current.emit("single-chat-send-message", {
                text: trimmedMessage,
                receiverId,
            });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setSelectedFilePreview(URL.createObjectURL(file));
        }
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
        setSelectedFilePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white shadow-sm border-b border-gray-200 px-5 py-3 md:hidden">
                <div className="flex items-center justify-between">
                    <Menu
                        className="w-6 h-6 cursor-pointer text-gray-600"
                        onClick={() => setShowSidebar(!showSidebar)}
                    />
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                <div
                    className={`absolute md:relative top-0 left-0 w-80 md:w-96 h-full bg-white shadow-lg md:shadow-none md:border-r border-gray-200 flex flex-col transition-all duration-300 z-50 ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                        }`}
                >
                    <div className="md:hidden flex justify-end p-4 border-b">
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setShowSidebar(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-5 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {isConversationsLoading ? (
                            <div className="flex justify-center items-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                            </div>
                        ) : filteredConversations.length > 0 ? (
                            filteredConversations.map((conversation) => {
                                const participant = conversation.otherParticipant;
                                const lastMsg = conversation.lastMessage;

                                return (
                                    <div
                                        key={conversation._id}
                                        className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-50 hover:bg-gray-50 transition-colors ${selectedConversationId === conversation._id
                                            ? "bg-teal-50 border-r-4 border-r-teal-600"
                                            : ""
                                            }`}
                                        onClick={() => selectConversation(conversation._id || "")}
                                    >
                                        <div className="relative">
                                            <img
                                                src={getImageSrc(participant?.image)}
                                                alt={participant?.name || "User"}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-gray-900 truncate">
                                                    {participant?.name || "Unknown user"}
                                                </h3>
                                                <span className="text-xs text-gray-500">
                                                    {lastMsg?.createdAt
                                                        ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                                        : ""}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 truncate mt-1">
                                                {lastMsg?.text || "No messages yet"}
                                            </p>
                                        </div>
                                        {!lastMsg?.seen && lastMsg?.msgByUserId === participant?._id && (
                                            <div className="bg-teal-600 text-white text-xs rounded-full h-8 w-8 flex items-center justify-center">
                                                New
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                No conversations found
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex flex-col bg-white w-full">
                    {!otherParticipant ? (
                        <div className="flex-1 flex items-center justify-center bg-gray-50">
                            <div className="text-center">
                                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">Select a conversation</h3>
                                <p className="text-gray-500">Pick a user from the sidebar to start chatting</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img
                                            src={getImageSrc(otherParticipant.image)}
                                            alt={otherParticipant.name || "User"}
                                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-100"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-gray-900">{otherParticipant.name || "Unknown user"}</h2>
                                        <p className="text-sm text-teal-600">
                                            {otherParticipant.isActive ? "Active" : "Available"}
                                        </p>
                                    </div>
                                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
                                {isMessagesLoading ? (
                                    <div className="flex justify-center items-center py-10">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                                    </div>
                                ) : (
                                    displayedMessages.map((msg) => {
                                        const isMe = msg.msgByUserId === currentUserId;

                                        return (
                                            <div
                                                key={msg._id}
                                                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${isMe
                                                        ? "bg-teal-600 text-white rounded-br-md"
                                                        : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                                                        }`}
                                                >
                                                    {((msg.images && msg.images.length > 0) || msg.image || (msg.imageUrl && msg.imageUrl.length > 0)) && (
                                                        <div className="mb-2 space-y-2">
                                                            {(() => {
                                                                let imgs: string[] = [];
                                                                if (msg.images && Array.isArray(msg.images)) imgs = msg.images;
                                                                else if (msg.imageUrl && Array.isArray(msg.imageUrl)) imgs = msg.imageUrl.map((imgObj: any) => imgObj?.url || imgObj);
                                                                else if (msg.imageUrl && typeof msg.imageUrl === 'string') imgs = [msg.imageUrl];
                                                                else if (msg.image) imgs = [msg.image];

                                                                return imgs.map((img: string, idx: number) => (
                                                                    img && (
                                                                        <img
                                                                            key={idx}
                                                                            src={img.startsWith("blob:") || img.startsWith("http") ? img : `${imgUrl}${img}`}
                                                                            alt="Attachment"
                                                                            className="rounded-lg max-w-full h-auto max-h-48 object-cover"
                                                                        />
                                                                    )
                                                                ));
                                                            })()}
                                                        </div>
                                                    )}
                                                    {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
                                                    {!msg.text && (!msg.imageUrl || msg.imageUrl.length === 0) && (!msg.images || msg.images.length === 0) && !msg.image && (
                                                        <p className="text-xs text-red-500 break-all">{JSON.stringify(msg)}</p>
                                                    )}
                                                    <div className="flex items-center justify-between mt-2 gap-2">
                                                        <span className={`text-xs ${isMe ? "text-teal-100" : "text-gray-500"}`}>
                                                            {msg.createdAt
                                                                ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                                                : ""}
                                                        </span>
                                                        {isMe && (
                                                            <div className="flex items-center">
                                                                <CheckCheck className={`w-3 h-3 ${msg.seen ? "text-white" : "text-teal-200"}`} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="bg-white border-t border-gray-200 p-4">
                                <div className="flex items-end gap-3">
                                    <div className="flex-1 relative">
                                        <textarea
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type your message..."
                                            className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none max-h-32"
                                            rows={1}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            accept="image/*,application/pdf,.doc,.docx"
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-3 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
                                        >
                                            <Image className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={sendMessage}
                                            disabled={(!newMessage.trim() && !selectedFile) || !receiverId}
                                            className={`p-3 rounded-full transition-all ${(newMessage.trim() || selectedFile) && receiverId
                                                ? "bg-teal-500 hover:bg-teal-600 text-white shadow-lg"
                                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                }`}
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;