import React, { createContext, useContext, useEffect, useState } from 'react';

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
    const [postLiked, setPostLiked] = useState(() =>{
        const savedLikes = localStorage.getItem('postLiked');
        return savedLikes? JSON.parse(savedLikes) : {}

    });

    useEffect(() => {
        localStorage.setItem('postLiked', JSON.stringify(postLiked))
    }, [postLiked])

    return (
        <LikeContext.Provider value={{ postLiked, setPostLiked }}>
            {children}
        </LikeContext.Provider>
    );
};

export const useLikes = () => useContext(LikeContext);
