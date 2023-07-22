const GENDER = ['male', 'female'];
const BLOOD_GROUP = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const SEARCHABLE_FIELD = [
  'id',
  'email',
  'contactNo',
  'name.firstName',
  'name.middleName',
  'name.lastName',
];
const FILTERS_FIELD = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];

export const StudentConstant = {
  GENDER,
  BLOOD_GROUP,
  SEARCHABLE_FIELD,
  FILTERS_FIELD,
};
