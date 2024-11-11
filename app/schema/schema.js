import mongoose from "mongoose";

export const categorySchema = mongoose.Schema({
    category: String,
    description: String,

}, {
    timestamps: true
})

export const ingredientsSchema = mongoose.Schema({
    value: String,
    label: String,

}, {
    timestamps: true
})

export const recipeSchema = mongoose.Schema({
    title: String,
    ingredients: Array,
    categories: Array,
    instructions: String,
    files: String,
    user_id: String,
    recipeStatus: String,

}, {
    timestamps: true
})

export const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,

}, {
    timestamps: true
})

export const userReviews = mongoose.Schema({
    name: String,
    comment: String,
    user_id: String,
    recipe_id: String,

}, {
    timestamps: true
})






