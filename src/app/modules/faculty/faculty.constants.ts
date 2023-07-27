const GENDER = ['male', 'female'];
const BLOOD_GROUP = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const SEARCHABLE_FIELD = [
  'id',
  'email',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.middleName',
  'name.lastName',
  'presentAddress',
  'designation',
];
const FILTERS_FIELD = [
  'searchTerm',
  'id',
  'designation',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
  'academicDepartment',
  'academicFaculty',
];

export const FacultyConstant = {
  GENDER,
  BLOOD_GROUP,
  SEARCHABLE_FIELD,
  FILTERS_FIELD,
};
