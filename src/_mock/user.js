import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
}));

export default users;
