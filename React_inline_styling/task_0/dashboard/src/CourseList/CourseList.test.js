import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';

describe('<CourseList />', () => {
  const wrapper = shallow(<CourseList />);
  
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true); // Add proper assertion
  });

  it('renders rows correctly', () => {
    const row = wrapper.find('CourseListRow');
    expect(row.at(0).prop('textFirstCell')).toEqual('Available courses');
    expect(row.at(0).prop('isHeader')).toEqual(true);
    expect(row.at(1).prop('textFirstCell')).toEqual('Course name');
    expect(row.at(1).prop('textSecondCell')).toEqual('Credit');
    expect(row.at(1).prop('isHeader')).toEqual(true);
    expect(row.at(2).prop('isHeader')).toEqual(false);
  });
});

describe('listCourses with values', () => {
  let listCourses = undefined;
  beforeEach(() => {
    listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];
  });

  it('renders rows for provided courses', () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    const row = wrapper.find('CourseListRow');
    expect(row).toHaveLength(5); // 2 header rows + 3 course rows
    expect(row.at(0).prop('textFirstCell')).toEqual('Available courses');
    expect(row.at(1).prop('textFirstCell')).toEqual('Course name');
    expect(row.at(2).prop('textFirstCell')).toEqual('ES6');
    expect(row.at(3).prop('textFirstCell')).toEqual('Webpack');
    expect(row.at(4).prop('textFirstCell')).toEqual('React');
  });
});

describe('listCourses without values', () => {
  let listCourses = undefined;
  beforeEach(() => {
    listCourses = [];
  });

  it('renders message when no courses are available', () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    const row = wrapper.find('CourseListRow');
    expect(row).toHaveLength(3); // 2 header rows + 1 "no courses" row
    expect(row.at(2).prop('textFirstCell')).toEqual('No course available yet');
    expect(row.at(2).prop('textSecondCell')).toBe(null);
  });
});
