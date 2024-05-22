export interface Content{
    name: string;
    exerciseCount: number;
}

export const Content = ({courseParts}: {courseParts: Content[]}) : JSX.Element => {
    return (
        <div>
            {courseParts.map((part, index) => <p key={index}>{part.name} {part.exerciseCount}</p>)}
        </div>
    );
}

