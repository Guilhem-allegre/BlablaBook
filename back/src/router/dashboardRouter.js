import { Router } from "express";
import { dashboardController } from "../controller/dashboardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware.js";

export const router = Router();

/**
 * GET route to retrieve all users (admin only).
 *
 * @summary Get all users in the system.
 * @route GET /dashboard/users
 * @middleware authMiddleware - Ensures the user is authenticated.
 * @middleware isAdminMiddleware - Ensures the user is an admin.
 * @controller dashboardController.getAllUsers - Handles retrieving all users.
 * @return {Object} - The list of all users in the system.
 * @return {Error} - Error if the request fails.
 */
router.get("/dashboard/users", authMiddleware, isAdminMiddleware, dashboardController.getAllUsers);

/**
 * GET route to retrieve all categories (admin only).
 *
 * @summary Get all book categories in the system.
 * @route GET /dashboard/categories
 * @middleware authMiddleware - Ensures the user is authenticated.
 * @middleware isAdminMiddleware - Ensures the user is an admin.
 * @controller dashboardController.getAllCategories - Handles retrieving all categories.
 * @return {Object} - The list of all book categories in the system.
 * @return {Error} - Error if the request fails.
 */
router.get("/dashboard/categories", authMiddleware, isAdminMiddleware, dashboardController.getAllCategories);

/**
 * GET route to retrieve all authors (admin only).
 *
 * @summary Get all authors in the system.
 * @route GET /dashboard/authors
 * @middleware authMiddleware - Ensures the user is authenticated.
 * @middleware isAdminMiddleware - Ensures the user is an admin.
 * @controller dashboardController.getAllAuthors - Handles retrieving all authors.
 * @return {Object} - The list of all authors in the system.
 * @return {Error} - Error if the request fails.
 */
router.get("/dashboard/authors", authMiddleware, isAdminMiddleware, dashboardController.getAllAuthors);