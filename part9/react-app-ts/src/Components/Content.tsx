import { CoursePart } from "../types";
import Part from "./Part";
export interface Content{
    name: string;
    exerciseCount: number;
}

export const Content = ({courseParts}: {courseParts: CoursePart[]}) : JSX.Element => {
    return (
        <div>
            {courseParts.map((part, index) => <div>
                <p key={index}><b>{part.name}</b> {part.exerciseCount}</p>
                <Part part={part} />
                </div>)}
        </div>
    );
}

