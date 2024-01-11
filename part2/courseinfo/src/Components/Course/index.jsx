import { useState } from 'react'


const Course = ({ courses }) => {

    return <>
        <h1>Web Development Curriculum</h1>
        {courses.map(course => (
            <>
                <Header text={course.name} />
                <Content parts={course.parts} />

            </>
        ))}
    </>
}

const Header = ({ text }) => {
    return <h2>{text}</h2>
}

const Content = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <div>
        {parts.map((part, i) => {
            return <Part key={i} part={part} />
        })}

        <div><b>Total of {total} exercises</b></div >
    </div>
}



const Part = ({ part }) => {
    return <div>{part.name} {part.exercises}</div>
}


export default Course