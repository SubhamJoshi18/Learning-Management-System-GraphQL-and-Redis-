import Joi from 'joi';

const registerUserSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': 'Username must be a string.',
      'string.empty': 'Username is required.',
      'string.alphanum': 'Username must only contain letters and numbers.',
      'string.min': 'Username must be at least 3 characters long.',
      'string.max': 'Username cannot exceed 30 characters.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email address.',
    }),
  password: Joi.string()
    .min(8)
    .max(128)
    // .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password cannot exceed 128 characters.',
      // 'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),

    phoneNumber : Joi.string().min(10).max(10).required()
})


const loginSchemaBody = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': 'Username must be a string.',
      'string.empty': 'Username is required.',
      'string.alphanum': 'Username must only contain letters and numbers.',
      'string.min': 'Username must be at least 3 characters long.',
      'string.max': 'Username cannot exceed 30 characters.',}),
      password: Joi.string()
      .min(8)
      .max(128)
      // .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
      .required()
      .messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 8 characters long.',
        'string.max': 'Password cannot exceed 128 characters.',
        // 'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      }),
})



const forgetPasswordSchema  = Joi.object({
  email: Joi.string()
  .email()
  .required()
  .messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
})


const resetPasswordSchema = Joi.object({
    password: Joi.string()
    .min(8)
    .max(128)
    // .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password cannot exceed 128 characters.',
      // 'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
})

export  {
    registerUserSchema,
    loginSchemaBody,
    forgetPasswordSchema,
    resetPasswordSchema
}

