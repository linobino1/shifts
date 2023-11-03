import type { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      required: true,
    },
    {
      type: 'select',
      name: 'role',
      options: [
        { label: 'Manager', value: 'manager' },
        { label: 'Staff', value: 'staff' },
      ],
      defaultValue: 'staff',
      required: true,
    },
  ],
};

export default Users;