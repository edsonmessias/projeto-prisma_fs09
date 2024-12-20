/*
  Warnings:

  - You are about to drop the column `commentUserId` on the `Comment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "commentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "commentPostId" INTEGER NOT NULL,
    CONSTRAINT "Comment_commentPostId_fkey" FOREIGN KEY ("commentPostId") REFERENCES "Post" ("postId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("commentId", "commentPostId", "text") SELECT "commentId", "commentPostId", "text" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
