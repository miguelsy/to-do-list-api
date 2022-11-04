DROP TABLE IF EXISTS `tasks`;
CREATE TABLE IF NOT EXISTS `tasks` (
    `id` VARCHAR(50),
    `task_title` VARCHAR(255),
    `task_description` TEXT,
    `pos` INT,

    PRIMARY KEY (`id`)
);
CREATE INDEX idx_pos ON `tasks` (`pos`);

DROP PROCEDURE IF EXISTS `get_tasks`;
CREATE PROCEDURE `get_tasks` () 
BEGIN
    SELECT
        *
    FROM
        tasks
    ORDER BY
        pos;
END;

DROP PROCEDURE IF EXISTS `get_task`;
CREATE PROCEDURE `get_task` (
    IN p_id VARCHAR(50)
) BEGIN
    SELECT
        *
    FROM
        tasks
    WHERE
        id = p_id;
END;

DROP PROCEDURE IF EXISTS `create_task`;
CREATE PROCEDURE `create_task` (
    IN p_id VARCHAR(50),
    IN p_task_title VARCHAR(255),
    IN p_task_description TEXT
) BEGIN
    INSERT INTO tasks (
        id,
        task_title,
        task_description,
        pos
    )
    VALUES
    (
        p_id,
        p_task_title,
        p_task_description,
        (
            SELECT
            IF(MAX(pos) IS NULL, 0, MAX(pos) + 1)
            FROM
            tasks
        )
    );
END;

DROP PROCEDURE IF EXISTS `update_task`;
CREATE PROCEDURE `update_task` (
    IN p_id VARCHAR(50),
    IN p_task_title VARCHAR(255),
    IN p_task_description TEXT
) BEGIN
    UPDATE 
        tasks
    SET
        task_title = p_task_title,
        task_description = p_task_description
    WHERE
        id = p_id;
END;

DROP PROCEDURE IF EXISTS `delete_task`;
CREATE PROCEDURE `delete_task` (
    IN p_id VARCHAR(50)
) BEGIN
    DELETE FROM 
        tasks
    WHERE
        id = p_id;
END;