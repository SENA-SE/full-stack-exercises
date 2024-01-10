const Content = ({ parts }) => {

    return (

        <>
            {parts.map(part => 
                // part = Object.values(part)
                // return (
                //     <p key={part[0]}>
                //         {part[0]} {part[1]}
                //     </p>
                // )
                
                 <Part part={part} />
            )}
        </>
    )

}

const Part = ({part}) => {
    
    part = Object.values(part)
    // console.log(part)
    return (
        <p key={part[0]}>
            {part[0]} {part[1]}
        </p>
    )

}
export default Content