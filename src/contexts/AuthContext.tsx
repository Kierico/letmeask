// import { type } from "@testing-library/user-event/dist/type";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>; // função que não recebe parametros e também não tem retorno dentro dela.
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType); // objeto vazio. 'as any' ignorar o typescript para essa parte do contexto.

export function AuthContextProvider(props: AuthContextProviderProps) {

    /** State */
    const [user, setUser] = useState<User>(); // User do tipo <User> ou undefined (vazio).

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user;

                if (!displayName || !photoURL) {
                    throw new Error("Missing information from Google Account.");
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                });
            }
        }); // event listener (ouvindo).

        return () => {
            unsubscribe(); // sempre no final se desescrever.
        }

    }, []); // array vazio dispara uma unica vez a função.

    async function signInWithGoogle() {
        /** Autenticação */
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        // console.log(result);
        if (result.user) {
            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
                throw new Error("Missing information from Google Account.");
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            });
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}