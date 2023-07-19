import { Model } from 'mongoose';

export type ITitles = 'Autumn' | 'Summer' | 'Fall';

export type ICodes = '01' | '02' | '03';

export type ISemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemester = {
  title: ITitles;
  year: string;
  code: ICodes;
  startMonth: ISemesterMonths;
  endMonth: ISemesterMonths;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;

export type IAcademicSemesterFilters = {
  searchTerm?: string;
};
