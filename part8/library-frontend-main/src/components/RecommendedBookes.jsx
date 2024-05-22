/* eslint-disable react/prop-types */
const RecommendedBooks = (props) => {
    if (!props.show) {
        return null;
    }

    const filteredBooks = props.books.filter(book => book.genres.includes(props.me.favoriteGenre));
    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre <b>{props.me.favoriteGenre}</b></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            Author
                        </th>
                        <th>
                            Published
                        </th>
                    </tr>
                    {filteredBooks.map(book =>
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default RecommendedBooks;
