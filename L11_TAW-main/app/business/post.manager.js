const posts = []; 

const getAll = async () => {
  return posts;
};

const createNew = async (post) => {
  post.id = Math.random().toString(36).substr(2, 9); // Generowanie unikalnego ID
  posts.push(post);
  return post;
};

const getById = async (id) => {
  return posts.find((post) => post.id === id);
};

const updateById = async (id, postData) => {
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  posts[postIndex] = { ...posts[postIndex], ...postData };
  return posts[postIndex];
};

const deleteById = async (id) => {
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  posts.splice(postIndex, 1);
};

function create() {
  return {
    getAll,
    createNew,
    getById,
    updateById,
    deleteById,
  };
}

export default {
  create,
};
