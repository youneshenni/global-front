import React from "react";

interface AuthenticationContextProps {
    token: string;
    setToken(token: string): void;
}

export const authenticationContext = React.createContext<AuthenticationContextProps>({
    token: '',
    setToken: () => {},
});

export default function AuthenticationProvider(props: {children: React.ReactNode}) {
    const [token, setToken] = React.useState('');

    return (
        <authenticationContext.Provider value={{ token, setToken }}>
            {props.children}
        </authenticationContext.Provider>
    );
}