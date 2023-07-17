import { ICodes, ISemesterMonths, ITitles } from './academicSemester.interface';

const CODES: ICodes[] = ['01', '02', '03'];

const TITLES: ITitles[] = ['Autumn', 'Summer', 'Fall'];

const SEMESTER_MONTHS: ISemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SEMESTER_CODE_MAPER: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

const SEARCHABLE_FIELD = ['title', 'code'];
const FILTERS_FIELD = ['searchTerm', 'title', 'code', 'year'];
export const AcademicConstant = {
  CODES,
  TITLES,
  SEMESTER_MONTHS,
  SEMESTER_CODE_MAPER,
  SEARCHABLE_FIELD,
  FILTERS_FIELD,
};
