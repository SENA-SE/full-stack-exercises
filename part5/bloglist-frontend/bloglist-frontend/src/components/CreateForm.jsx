import { useState, useEffect } from 'react'


const CreateForm = ({ handleSubmitBlog, handleTitleChange, handleAuthorChange, handleUrlChange, errorMessage, title, url, author }) => {

  return <div>
    <form onSubmit={handleSubmitBlog}>
      <h1>Create a new blog</h1>
      {errorMessage && <div>{errorMessage}</div>}
      <div>
                title
        <input
          type="text"
          value={title}
          name="title"
          placeholder="please write your title here"
          onChange={({ target }) => handleTitleChange(target.value)}
        />
      </div>

      <div>
                author
        <input
          type="text"
          value={author}
          name="author"
          placeholder="please write the author here"
          onChange={({ target }) => handleAuthorChange(target.value)}
        />
      </div>

      <div>
                url
        <input
          type="text"
          value={url}
          name="url"
          placeholder="please write the url here"
          onChange={({ target }) => handleUrlChange(target.value)}
        />
      </div>
      <button type="submit" id='submit-blog'>Submit</button>

    </form>
  </div>
}

export default CreateForm