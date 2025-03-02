import { z } from 'zod';

const createOrganizationSchema = z.object({
    organizationName: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .nonempty('Email is required'),
  
  type: z
    .enum(['College','School']),
});


export {
    createOrganizationSchema
}