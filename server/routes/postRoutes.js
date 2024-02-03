const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsContoller,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

//router object
const router = express.Router();

// CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

// GET ALL POSTs
router.get("/get-all-posts", getAllPostsContoller);

//GET USER POSTs
router.get("/get-user-post", requireSignIn, getUserPostsController);

//DELETE POST
router.delete("/delete-post/:id", requireSignIn, deletePostController);

// //UPDATE POST
router.put("/update-post/:id", requireSignIn, updatePostController);

//export
module.exports = router;