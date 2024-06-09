import Joi from "joi";

export const createCustomerValidate = (data) => {
  const Schema = Joi.object({
    userName: Joi.string().required().trim().messages({
        "string.empty": "Name should not be empty!",
      }),
      email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required()
        .messages({
          "string.empty": "Email should not be empty!",
          "string.pattern.base": "Email should be contain valid character!",
        }),
      password: Joi.string().required().trim().min(6).max(15).messages({
        "string.empty": "Password should not be empty!",
        "string.min": "Password should contain mininum 6 characters!",
        "string.max": "Password is too long!",
      }),
      phoneNumber: Joi.string()
        .required()
        .regex(/^[0-9]{10}$/)
        .messages({ "string.pattern.base": `Phone number must have 10 digits!` })
        .required(),
  });
  return Schema.validate(data);
};

export const loginValidation = async (data, res, next) => {
  const Schema = Joi.object({
    email: Joi.string()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .required()
      .messages({
        "any.required": "Email is required field!",
        "string.empty": "Email should not be empty!",
        "string.pattern.base": "Email should be contain valid character!",
      }),
    password: Joi.string().required().min(6).max(15).messages({
      "any.required": "Password is required field!",
      "string.empty": "Password should not be empty!",
      "string.min": "Password should contain mininum 6 characters!",
      "string.max": "Password is too long!",
    }),
  });
  return Schema.validate(data);
  
};


export const connectValidation = async (req, res, next) => {
  const Schema = Joi.object({
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
    redirect_uri: Joi.string().required(),
    code: Joi.string().required()
  });
return Schema.validate(req);
 
};

// export const updateUserValidate = (data) => {
//   const Schema = Joi.object({
//     email: Joi.string().email().required(),
//     name: Joi.string().required(),
//     salesArea: Joi.array().required(),
//     role: Joi.string().required(),
//   });
//   return Schema.validate(data);
// };

// export const changePasswordValidate = (data) => {
//   const Schema = Joi.object({
//     currentPassword: Joi.string().min(6).required(),
//     newPassword: Joi.string().min(6).required(),
//     confirmPassword: Joi.any()
//       .valid(Joi.ref("newPassword"))
//       .required()
//       .options({
//         messages: {
//           "any.only": "New password and Confirm password does not match.",
//         },
//       }),
//   });
//   return Schema.validate(data);
// };

// export const createNewPasswordValidate = (data) => {
//   const Schema = Joi.object({
//     email: Joi.string().required(),
//   });
//   return Schema.validate(data);
// };
