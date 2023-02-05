const BlogForm = ({ 
    addBlog,
    title, setTitle, 
    author, setAuthor, 
    url, setUrl }) => (
    <div>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
            <div>
                Title: 
                <input type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}>
                </input>
            </div>
            <div>
                Author:
                <input type="text"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}>
                </input>
            </div>
            <div>
                Url:
                <input type="text"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}>
                </input>
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
)

export default BlogForm