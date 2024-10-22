// 메세지 통합 클래스 import 클래스
import React from 'react';
import ChatChannels from './ChatChannels';
import ChatMessages from './ChatMessages';

const ChatContent = () => {
   return (
        <>
            <div className="flex flex-1 flex-col h-full">
                {/* Chat Messages */}
                <ChatMessages />

                {/*/!* Chat Input *!/*/}
                {/*<ChatInput />*/}
            </div>

            {/* Chat Channels */}
            <div className="flex h-full bg-gray-800">
                <ChatChannels />
            </div>
        </>
    );
}

export default ChatContent;