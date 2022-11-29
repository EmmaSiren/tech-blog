const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#postTitle').value.trim();
  const content = document.querySelector('#postContent').value.trim();

  await fetch('/api/posts/addPosts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {'Content-Type': 'application/json'},
  });

  document.location.replace('/dashboard');
};

document.querySelector('.post-form').addEventListener('submit', newPostHandler);