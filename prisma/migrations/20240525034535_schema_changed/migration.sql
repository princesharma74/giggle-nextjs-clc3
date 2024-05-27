-- CreateTable
CREATE TABLE `User` (
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `bio` VARCHAR(191) NULL,
    `gender` ENUM('Male', 'Female', 'Other') NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `avatar` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Codechef` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codechef_id` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `user_email` VARCHAR(191) NOT NULL,
    `rating` INTEGER NULL,
    `global_rank` INTEGER NULL,
    `number_of_contests` INTEGER NULL,
    `number_of_questions` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Codechef_user_email_key`(`user_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Codeforces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codeforces_id` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `user_email` VARCHAR(191) NOT NULL,
    `rating` INTEGER NULL,
    `global_rank` INTEGER NULL,
    `number_of_contests` INTEGER NULL,
    `number_of_questions` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Codeforces_user_email_key`(`user_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Leetcode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leetcode_id` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `user_email` VARCHAR(191) NOT NULL,
    `rating` INTEGER NULL,
    `global_rank` INTEGER NULL,
    `number_of_contests` INTEGER NULL,
    `number_of_questions` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Leetcode_user_email_key`(`user_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `host_email` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Room_host_email_idx`(`host_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` VARCHAR(191) NOT NULL,
    `sender_email` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Message_room_id_idx`(`room_id`),
    INDEX `Message_sender_email_idx`(`sender_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Problem` (
    `title` VARCHAR(191) NOT NULL,
    `platform` ENUM('codeforces', 'leetcode', 'codechef') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`title`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contest` (
    `title` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `platform` ENUM('codeforces', 'leetcode', 'codechef') NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NULL,
    `total_questions` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`title`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topic` (
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Submission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `submittedAt` DATETIME(3) NOT NULL,
    `link` VARCHAR(191) NULL,
    `problem_title` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Submission_problem_title_idx`(`problem_title`),
    INDEX `Submission_user_email_idx`(`user_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RatingChange` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contest_title` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `rating_change` INTEGER NOT NULL,
    `end_time` DATETIME(3) NULL,
    `rank` INTEGER NOT NULL,
    `number_of_problems_solved` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `RatingChange_contest_title_idx`(`contest_title`),
    INDEX `RatingChange_user_email_idx`(`user_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UsersToRoom` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UsersToRoom_AB_unique`(`A`, `B`),
    INDEX `_UsersToRoom_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoomToTopic` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_RoomToTopic_AB_unique`(`A`, `B`),
    INDEX `_RoomToTopic_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
