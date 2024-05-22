import { CoursePart } from "../types";

const Part = ({ part } : {part: CoursePart}) => {
    switch(part.kind){
        case "basic":
            return <p><em>{part.description}</em></p>
        case "group":
            return <p>project exercises {part.groupProjectCount}</p>
        case "background":
            return (<div>
                <p><em>{part.description}</em></p>
                <div>Submit to {part.backgroundMaterial}</div>
                </div>)
        case "special":
            return (<div>
                <p><em>{part.description}</em></p>
                <div>required skills: {part.requirements.join(', ')}</div>
                </div>)
    }
}

export default Part;