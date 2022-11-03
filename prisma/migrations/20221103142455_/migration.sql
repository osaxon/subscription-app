-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "data" JSONB,
    "userId" TEXT,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersLessons" (
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "UsersLessons_pkey" PRIMARY KEY ("userId","lessonId")
);

-- AddForeignKey
ALTER TABLE "UsersLessons" ADD CONSTRAINT "UsersLessons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersLessons" ADD CONSTRAINT "UsersLessons_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
