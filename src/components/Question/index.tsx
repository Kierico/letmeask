import { ReactNode } from "react"
import classX from "classnames";

import "./styles.scss";

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

/** desinstruturar o props. */
export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false,
}: QuestionProps) {
    return (
        // <div className={`question ${isAnswered ? "answered" : ""} ${isHighlight ? "highlight" : ""}`}>
        <div
            className={classX(
                "question",
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered },
            )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}