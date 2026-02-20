"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Send, Menu, MoreVertical, Image, CheckCheck } from "lucide-react";
import { useGetAllConversationsQuery, useGetMessagesByReceiverIdQuery } from "@/Redux/api/chat/chatApi";
import { useMyProfileQuery } from "@/Redux/api/user/userApi";
import { imgUrl } from "@/config/envConfig";
import { io, Socket } from "socket.io-client";

const Chat = () => {
    const { data: conversationData, isLoading: isConversationsLoading, refetch: refetchConversations } = useGetAllConversationsQuery({});
    const { data: profileData } = useMyProfileQuery({});
    const currentUserId = profileData?.data?._id;

    console.log("currentUserId asdf", currentUserId);

    const conversations = conversationData?.data?.conversations || [];

    const [selectedConversation, setSelectedConversation] = useState<any>(null);
    const otherParticipant = selectedConversation?.participants?.[0];

    // Fetch messages for the selected conversation's recipient
    const { data: messagesData, isLoading: isMessagesLoading, refetch: refetchMessages } = useGetMessagesByReceiverIdQuery(
        otherParticipant?._id,
        { skip: !otherParticipant?._id }
    );

    const apiMessages = messagesData?.data?.messages || [];

    const [newMessage, setNewMessage] = useState("");
    const [showSidebar, setShowSidebar] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const socketRef = useRef<Socket | null>(null);

    // Socket Initialization
    useEffect(() => {
        if (!currentUserId) {
            console.log('[Socket] No currentUserId, skipping connection');
            return;
        }

        console.log(`[Socket] Attempting to connect for user: ${currentUserId}`);

        // Connect to server with userId as query parameter
        const socket = io('http://localhost:3000', {
            query: { userId: currentUserId },
            transports: ['websocket', 'polling']
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            console.log(`[Socket] Connected to server. Socket ID: ${socket.id}`);
        });

        // Listen for incoming messages
        socket.on('single-chat-receive-message', (data) => {
            console.log('[Socket] Received message (single-chat-receive-message):', data);
            refetchMessages();
            refetchConversations();
        });

        socket.on('new-message', (data) => {
            console.log('[Socket] Received message (new-message):', data);
            refetchMessages();
            refetchConversations();
        });

        // Listen for message sent confirmation
        socket.on('single-chat-message-sent', (data) => {
            console.log('[Socket] Message sent successfully (confirmation):', data);
            refetchMessages();
            refetchConversations();
        });

        socket.on('connect_error', (error) => {
            console.error('[Socket] Connection error:', error);
        });

        socket.on('error', (error) => {
            console.error('[Socket] Socket error:', error);
        });

        socket.on('disconnect', (reason) => {
            console.log(`[Socket] Disconnected from server. Reason: ${reason}`);
        });

        // Debug: Listen to all events
        socket.onAny((eventName, ...args) => {
            console.log(`[Socket Event] ${eventName}:`, args);
        });

        return () => {
            console.log('[Socket] Cleaning up socket connection');
            socket.disconnect();
            socketRef.current = null;
        };
    }, [currentUserId, refetchMessages, refetchConversations]);

    useEffect(() => {
        if (conversations.length > 0 && !selectedConversation) {
            console.log('[Chat] Auto-selecting first conversation');
            setSelectedConversation(conversations[0]);
        }
    }, [conversations, selectedConversation]);

    const filteredConversations = conversations.filter((conv: any) => {
        const participant = conv.participants?.[0];
        return participant?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    });


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [apiMessages]);

    const sendMessage = () => {
        if (newMessage.trim() && socketRef.current && otherParticipant?._id) {
            const messageData = {
                text: newMessage,
                receiverId: otherParticipant._id
            };

            console.log('[Socket] Emitting single-chat-send-message:', messageData);
            socketRef.current.emit('single-chat-send-message', messageData);
            setNewMessage("");
        } else {
            console.warn('[Chat] Cannot send message: socket not connected or missing recipient', {
                hasSocket: !!socketRef.current,
                hasRecipient: !!otherParticipant?._id
            });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Socket logic for files can be complex, usually involves base64 or a separate upload endpoint
            // For now, we'll keep it as a placeholder or implement base64 if expected
            console.log('File upload requested:', file.name);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 px-5 py-3 md:hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <Menu
                            className="w-6 h-6 cursor-pointer text-gray-600"
                            onClick={() => setShowSidebar(!showSidebar)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar - User List */}
                <div
                    className={`absolute md:relative top-0 left-0 w-80 md:w-96 h-full bg-white shadow-lg md:shadow-none md:border-r border-gray-200 flex flex-col transition-all duration-300 z-50 ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                        }`}
                >
                    {/* Mobile close button */}
                    <div className="md:hidden flex justify-end p-4 border-b">
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setShowSidebar(false)}
                        >
                            ✖
                        </button>
                    </div>

                    {/* Search Bar */}
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

                    {/* User List */}
                    <div className="flex-1 overflow-y-auto">
                        {isConversationsLoading ? (
                            <div className="flex justify-center items-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                            </div>
                        ) : filteredConversations.length > 0 ? (
                            filteredConversations.map((conv: any) => {
                                const participant = conv.participants?.[0];
                                const lastMsg = conv.lastMessage;
                                return (
                                    <div
                                        key={conv._id}
                                        className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-50 hover:bg-gray-50 transition-colors ${selectedConversation?._id === conv._id
                                            ? "bg-teal-50 border-r-4 border-r-teal-600"
                                            : ""
                                            }`}
                                        onClick={() => {
                                            setSelectedConversation(conv);
                                            setShowSidebar(false);
                                        }}
                                    >
                                        <div className="relative">
                                            <img
                                                src={participant?.image?.startsWith('http') ? participant.image : `${imgUrl}${participant?.image}`}
                                                alt={participant?.name}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-gray-900 truncate">
                                                    {participant?.name}
                                                </h3>
                                                <span className="text-xs text-gray-500">
                                                    {lastMsg?.createdAt ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 truncate mt-1">
                                                {lastMsg?.text}
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

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-white w-full">
                    {!selectedConversation ? (
                        <div className="flex-1 flex items-center justify-center bg-gray-50">
                            <div className="text-center">
                                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">Select a conversation</h3>
                                <p className="text-gray-500">Pick a user from the sidebar to start chatting</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Chat Header */}
                            <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img
                                            src={otherParticipant?.image?.startsWith('http') ? otherParticipant.image : `${imgUrl}${otherParticipant?.image}`}
                                            alt={otherParticipant?.name}
                                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-100"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-gray-900">{otherParticipant?.name}</h2>
                                        <p className="text-sm text-teal-600">
                                            Active
                                        </p>
                                    </div>
                                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
                                {isMessagesLoading ? (
                                    <div className="flex justify-center items-center py-10">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                                    </div>
                                ) : (
                                    apiMessages.map((msg: any) => {
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
                                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                                    <div className="flex items-center justify-between mt-2 gap-2">
                                                        <span
                                                            className={`text-xs ${isMe ? "text-teal-100" : "text-gray-500"}`}
                                                        >
                                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                        {isMe && (
                                                            <div className="flex items-center">
                                                                {msg.seen ? (
                                                                    <CheckCheck className="w-3 h-3 text-white" />
                                                                ) : (
                                                                    <CheckCheck className="w-3 h-3 text-teal-200" />
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}

                                {/* Typing Indicator */}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div
                                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                    style={{ animationDelay: "0.1s" }}
                                                ></div>
                                                <div
                                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                    style={{ animationDelay: "0.2s" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <div className="bg-white border-t border-gray-200 p-4">
                                <div className="flex items-end gap-3">
                                    <div className="flex-1 relative">
                                        <textarea
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={handleKeyPress}
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
                                            disabled={!newMessage.trim()}
                                            className={`p-3 rounded-full transition-all ${newMessage.trim()
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
