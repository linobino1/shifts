import { User } from 'payload/generated-types';
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
    {
      type: 'checkbox',
      name: 'active',
      defaultValue: () => true,
    },
    {
      type: 'array',
      name: 'availabilities',
      fields: [
        {
          type: 'date',
          name: 'date',
          required: true,
        },
        {
          type: 'checkbox',
          name: 'available',
          required: true,
        },
      ],
      hooks: {
        beforeChange: [
          // sort the availabilities by date ASC
          ({ value }) => value.sort((a: User['availabilities'][0], b: User['availabilities'][0]) => new Date(a.date).getTime() - new Date(b.date).getTime())
        ],
      },
    },
    {
      type: 'date',
      name: 'submittedAt',
    },
    {
      type: 'date',
      name: 'submittedUntil'
    }

  ],
};

export default Users;