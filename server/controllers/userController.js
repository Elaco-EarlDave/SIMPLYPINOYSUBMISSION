const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
var { expressjwt: jwt } = require("express-jwt");

//middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

//register
const registerController = async (req, res) => {
  try {
    const { name, businessname, email, password } = req.body;
    //validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }
    if (!businessname) {
      return res.status(400).send({
        success: false,
        message: "business name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }
    if (!password || password.length < 7) {
      return res.status(400).send({
        success: false,
        message: "password is required and 7 character long",
      });
    }
    //exisiting user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(500).send({
        success: false,
        message: "User Already Register With This EMail",
      });
    }

//     //create user
//     const user = await userModel.create({
//       name, 
//       businessname, 
//       email, 
//       password
//  });
//  return res.status(201).send({
//    success: true,
//    message: "Registration is Successful. Please login",
//  });
// } catch (error) {
//  console.log(error);
//  return res.status(500).send({
//    success: false,
//    message: "Error in Register API",
//    error,
//  });
// }

  //hashed pasword
  const hashedPassword = await hashPassword(password);




  //save user
  const user = await userModel({
    name,
    businessname,
    email,
    password: hashedPassword,
  }).save();

  return res.status(201).send({
    success: true,
    message: "Registeration Successful! Try to login",
  });
} catch (error) {
  console.log(error);
  return res.status(500).send({
    success: false,
    message: "Error in Register API",
    error,
  });
}
};

//login backend
const loginController = async (req, res) => {
  try {
    const {email, password} = req.body
    //validation
    if (!email || !password){
        return res.status(500).send({
          success:false,
          message:'Please Provide an Email or Password'
      })
    }
    //find user
    const user = await userModel.findOne({email})
    if (!user){
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }
    //match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    //TOKEN JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // undefined password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message:'login succesfully',
      token,
      user,
      
    })

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'error in login api',
      error,
    })
  }
};

//// USER UPDATE ACCOUNT
// update user
const updateUserController = async (req, res) => {
  try {
    const { name, businessname, email, password  } = req.body;
    //user find
    const user = await userModel.findOne({ email });
    //password validate
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 character long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    //updated user account
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        businessname: businessname || user.businessname,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile Updated. Please Login",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In User Update Api",
      error,
    });
  }
};



module.exports = {
  requireSignIn,
  registerController,
  loginController,
  updateUserController,
};
