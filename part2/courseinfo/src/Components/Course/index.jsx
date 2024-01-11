const Course = ({ course }) => {
    return <div>
        <Header text={course.name} />
        <Content parts={course.parts} />
    </div>
}

const Header = ({ text }) => {
    return <h1>{text}</h1>
}

const Content = ({ parts }) => {
    return parts.map(part => <Part part={part} />)
}

const Part = ({ part }) => {
    return <div>{part.name} {part.exercises}</div>
}

export default Course