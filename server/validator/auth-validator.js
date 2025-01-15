const { z } = require("zod")


const loginSchema = z.object({
  email: z.string({ required_error: "Email Is Required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(9, { message: "Name must be atleast 9 characters" })
    .max(56, { message: "Name must not be more then 56 characters" }),

  password: z.string({ required_error: "Password Is Required" })
    .min(8, { message: "Passsword Must be atleast 8 characters" })
    .max(24, { message: "Password must not be more then 24 characters" }),
})


const signupSchema = z.object({
  name: z.string({ required_error: "Name Is Required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 characters" })
    .max(24, { message: "Name must not be more then 24 characters" }),

  email: z.string({ required_error: "Email Is Required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(9, { message: "Name must be atleast 9 characters" })
    .max(56, { message: "Name must not be more then 56 characters" }),


  password: z.string({ required_error: "Password Is Required" })
    .min(8, { message: "Passsword Must be atleast 8 characters" })
    .max(24, { message: "Password must not be more then 24 characters" }),
})

module.exports = { signupSchema, loginSchema }