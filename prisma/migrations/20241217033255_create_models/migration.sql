-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Author" (
    "authorId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tags" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Author_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "postId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "postAuthorId" INTEGER NOT NULL,
    CONSTRAINT "Post_postAuthorId_fkey" FOREIGN KEY ("postAuthorId") REFERENCES "Author" ("authorId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "commentPostId" INTEGER NOT NULL,
    "commentUserId" INTEGER NOT NULL,
    CONSTRAINT "Comment_commentPostId_fkey" FOREIGN KEY ("commentPostId") REFERENCES "Post" ("postId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_commentUserId_fkey" FOREIGN KEY ("commentUserId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
