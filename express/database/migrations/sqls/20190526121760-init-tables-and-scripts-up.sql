DROP TABLE IF EXISTS `tasks`;
CREATE TABLE IF NOT EXISTS `tasks` (
    `id` INT,
    `task_description` VARCHAR(255),
    `order` INT,

    PRIMARY KEY (`id`)
);