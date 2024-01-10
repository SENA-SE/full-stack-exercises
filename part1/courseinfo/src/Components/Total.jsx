const Total = ({ parts }) => {
    let numExercises = 0
    // console.log(parts)
    parts.map(part => {
        part = Object.values(part)
        numExercises+=part[1]
    })
    return (
        <p>Number of exercises {numExercises}</p>
    )
}
export default Total