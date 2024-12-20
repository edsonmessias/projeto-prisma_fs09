import { Author, Post, PrismaClient, User } from "@prisma/client";
import { title } from "process";
import { text } from "stream/consumers";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// Create a new user
async function createUser(user: Omit<User, "userId">) {
  console.log("Criando novo usuário...");

  const userCreated = await prisma.user.create({
    data: user,
  });

  console.log("usuário criado: ", userCreated);
}

// Create a new author
async function createAuthor(author: Omit<Author, "authorId">) {
  console.log("Criando novo autor...");

  const authorCreated = await prisma.author.create({
    data: author,
  });

  console.log("Autor criado: ", authorCreated);
}

// Create a new post
async function createPost(post: Omit<Post, "postId">) {
  console.log("Criando novo post...");

  const postCreated = await prisma.post.create({
    data: post,
  });

  console.log("Post criado: ", postCreated);
}

// Create a new comment
async function createComment(text: string, commentPostId: number) {
  console.log("Criando novo comentário...");

  const commentCreated = await prisma.comment.create({
    data: {
      text,
      commentPostId,
    },
  });

  console.log("Comentário criado: ", commentCreated);
}

// Get all users
async function getAllUsers() {
  console.log("Buscando todos os usuários...");
  return await prisma.user.findMany({
    include: {
      Author: true,
    },
  });
}

// Get all author
async function getAllAuthors() {
  console.log("Buscando todos os autores...");

  return await prisma.author.findMany({
    include: {
      Post: true,
    },
  });
}

// Get all posts
async function getAllPosts() {
  console.log("Buscando todos os posts...");

  return await prisma.post.findMany({
    include: {
      Comment: true,
    },
  });
}

// Get all comments
async function getAllComments() {
  console.log("Buscando todos os comentários...");

  return await prisma.comment.findMany({
    include: {
      commentPost: true,
    },
  });
}

// Get one user
async function getUserById(userId: number) {
  console.log("Buscando o usuário de id : " + userId);

  const userById = await prisma.user.findFirst({
    where: {
      userId: userId,
    },
    include: {
      Author: { select: { tags: true, surname: true } },
    },
  });

  return userById;
}

// Get one author
async function getAuthorById(authorId: number) {
  console.log("Buscando o autor de id : " + authorId);

  const authorById = await prisma.author.findFirst({
    where: {
      authorId: authorId,
    },
    include: {
      Post: { include: { Comment: true } },
    },
  });

  return authorById;
}

// Get one comment
async function getCommentById(commentId: number) {
  console.log("Buscando o comentário de id : " + commentId);

  const commentById = await prisma.comment.findFirst({
    where: {
      commentId: commentId,
    },
    include: {
      commentPost: true,
    },
  });

  return commentById;
}

// Update a user
async function updateUser(
  userIdUpd: number,
  nameUpd: string,
  emailUpd: string
) {
  console.log("Alterando o usuário de id: " + userIdUpd);

  const updatedUser = await prisma.user.update({
    where: { userId: userIdUpd },
    data: {
      name: nameUpd,
      email: emailUpd,
    },
  });
  console.log("Usuário alterado com sucesso...", updatedUser);
}

// Update a author
async function updateAuthor(
  authorIdUpd: number,
  tagsUpd: string,
  surnameUpd: string
) {
  console.log("Alterando o autor de id: " + authorIdUpd);

  const updatedAuthor = await prisma.author.update({
    where: { authorId: authorIdUpd },
    data: {
      tags: tagsUpd,
      surname: surnameUpd,
    },
  });
  console.log("Author alterado com sucesso...", updatedAuthor);
}

// Update a post
async function updatePost(
  postIdUpd: number,
  titleUpd: string,
  textUpd: string
) {
  console.log("Alterando o post de id: " + postIdUpd);

  const updatedPost = await prisma.post.update({
    where: { postId: postIdUpd },
    data: {
      title: titleUpd,
      text: textUpd,
    },
  });
  console.log("Post alterado com sucesso...", updatedPost);
}

// Update a comment
async function updateComment(commentIdUpd: number, textUpd: string) {
  console.log("Alterando o comentário de id: " + commentIdUpd);

  const updatedComment = await prisma.comment.update({
    where: { commentId: commentIdUpd },
    data: {
      text: textUpd,
    },
  });
  console.log("Comentário alterado com sucesso...", updatedComment);
}

// Delete a user
async function deleteUser(userId: number) {
  console.log("Deletando o usuário de id: " + userId);

  const deletedUser = await prisma.user.delete({
    where: {
      userId: userId,
    },
  });
  console.log("Usuário deletado com sucesso...");
}

// Delete a author
async function deleteAuthor(authorId: number) {
  console.log("Deletando o usuário de id: " + authorId);

  const deletedAuthor = await prisma.author.delete({
    where: {
      authorId: authorId,
    },
  });
  console.log("Autor deletado com sucesso...");
}

// Delete a Post
async function deletePost(postId: number) {
  console.log("Deletando o post de id: " + postId);

  const deletedPost = await prisma.post.delete({
    where: {
      postId: postId,
    },
  });
  console.log("Post deletado com sucesso...");
}

// Delete a Comment
async function deleteComment(commentId: number) {
  console.log("Deletando o comentário de id: " + commentId);

  const deletedComment = await prisma.comment.delete({
    where: {
      commentId: commentId,
    },
  });
  console.log("Commentário deletado com sucesso...");
}

// Delete all users
async function deleteAllUsers() {
  const deletedUser = await prisma.user.deleteMany({
    where: {
      userId: {
        gt: 0,
      },
    },
  });
  console.log("Todos os usuários foram deletados: ", deletedUser.count);
}

// Delete all authors
async function deleteAllAuthors() {
  const deletedAuthor = await prisma.author.deleteMany({
    where: {
      authorId: {
        gt: 0,
      },
    },
  });
  console.log("Todos os autores foram deletados: ", deletedAuthor.count);
}

// Delete all posts
async function deleteAllPosts() {
  const deletedPost = await prisma.post.deleteMany({
    where: {
      postId: {
        gt: 0,
      },
    },
  });
  console.log("Todos os posts foram deletados: ", deletedPost.count);
}

// Delete all comments
async function deleteAllComments() {
  const deletedComment = await prisma.comment.deleteMany({
    where: {
      commentId: {
        gt: 0,
      },
    },
  });
  console.log("Todos os posts foram deletados: ", deletedComment.count);
}

async function main() {
  //-------------USER-------------//
  await createUser({ name: "Edson Messias", email: "teste_email_6@email.com" });
  const users = await getAllUsers();
  console.log("Usuários cadastrados: ", users);

  //retornando um usuário apenas
  const userByid = await getUserById(40);
  console.log(userByid);

  await updateUser(39, "Edson Almeida", "edson.almeida1@impacta.com.br");

  await deleteUser(38);
  //await deleteAllUsers();

  //-------------AUTHOR-------------//
  await createAuthor({
    tags: "tag teste",
    surname: "messias_impacta",
    userId: 39,
  });

  const authors = await getAllAuthors();
  console.log("Autores cadastrados: ", authors);

  //retornando um autor apenas
  const authorById = await getAuthorById(10);
  console.log(authorById);

  await updateAuthor(1, "tag teste update", "messias_update");
  //await deleteAllAuthors();

  //-------------POST-------------//
  await createPost({
    title: "postando alguma coisa",
    text: "era uma vez um post de um autor",
    postAuthorId: 11,
  });

  //retornando todos os posts
  const posts = await getAllPosts();
  console.log("Posts cadastrados: ", posts);

  //atualizando um post
  await updatePost(3, "titulo post alterado", "este post foi alterado");

  //deletando um post
  await deletePost(2);

  //deletando todos os posts
  //await deleteAllPosts();

  //-------------COMMENT-------------//
  await createComment("comentário de um post", 6);

  //retornando todos os comentários
  const comments = await getAllComments();
  console.log(comments);

  //retornando um comentário apenas
  const commentById = await getCommentById(1);
  console.log(commentById);

  //atualizando um comentário
  await updateComment(1, "comentário alterado");

  //deletando um comentário
  await deleteComment(2);

  //deletando todos os comentários
  //await deleteAllComments();
}

// Run the main function
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.log(e);
    process.exit(1);
  });
