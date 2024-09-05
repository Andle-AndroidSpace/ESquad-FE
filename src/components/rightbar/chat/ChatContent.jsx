import React from 'react';
import ChatChannels from './ChatChannels';
import ChatInput from './ChatInput';
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