async function newBlogHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="blog-title"]').value.trim();
    const content = document.querySelector('input[name="blog-content"]').value.trim();

    const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
}

document.querySelector('.new-blog-form').addEventListener('submit', newBlogHandler);