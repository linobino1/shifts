import type { CollectionConfig } from 'payload/types';

const Admins: CollectionConfig = {
  slug: 'admins',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
  ],
};

export default Admins;