import  { createContext, useContext, useState } from 'react';

const DateContext = createContext();

// eslint-disable-next-line react/prop-types
export function DateProvider({ children }) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
}

export function useDate() {
    return useContext(DateContext);
}
