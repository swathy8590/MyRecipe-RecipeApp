import mongoose from "mongoose";
import { categorySchema } from "../schema/schema";
import { ingredientsSchema } from "../schema/schema";
import { recipeSchema } from "../schema/schema";
import { userSchema } from "../schema/schema";
import { userReviews } from "../schema/schema";

export const categoryModel = mongoose.models.catogaries || mongoose.model("catogaries", categorySchema)

export const ingredientsModel = mongoose.models.ingredients || mongoose.model("ingredients", ingredientsSchema)

export const recipeModel = mongoose.models.recipes || mongoose.model("recipes", recipeSchema)

export const userModel = mongoose.models.users || mongoose.model("users", userSchema)

export const reviewModel = mongoose.models.userrevies || mongoose.model("userrevies", userReviews)