import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import "../styles/room.scss";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
}

type RoomParams = {
    id: string;
}

export function Room() {

    const { user } = useAuth();
    const params = useParams<RoomParams>(); /** gereric */
    const [newQuestion, setNewQuestion] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState("");

    const roomId = params.id!; /** !, nunca é nulo */

    /** hook que dispara um evento sempre que uma informação mudar. */
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        /** firebase */ /** once, ouvir uma única vez. on, ouvir mais de uma vez. */
        roomRef.on("value", room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            }); /** entries, retorna uma matriz. */

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });
    }, [roomId]);

    async function handleSendQuestioin(event: FormEvent) {

        event.preventDefault();

        if (newQuestion.trim() === "") {
            return;
        }

        if (!user) {
            throw new Error("You must be logged in");
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false, /** se está destacada */
            isAnswered: false     /** se está respondida */
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion("");
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestioin} action="">
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        { /** if em React */}
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}

            </main>
        </div>
    );
}