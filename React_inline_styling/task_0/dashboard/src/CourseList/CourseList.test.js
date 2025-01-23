import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';

describe('<CourseList />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders rows when no courses are provided', () => {
    const wrapper = shallow(<CourseList listCourses={[]} />);
    const rows = wrapper.find('CourseListRow');
    expect(rows).toHaveLength(3); // 2 header rows + 1 "no courses" row
    expect(rows.at(0).prop('textFirstCell')).toEqual('Available courses');
    expect(rows.at(0).prop('isHeader')).toBe(true);
    expect(rows.at(1).prop('textFirstCell')).toEqual('Course name');
    expect(rows.at(1).prop('textSecondCell')).toEqual('Credit');
    expect(rows.at(1).prop('isHeader')).toBe(true);
    expect(rows.at(2).prop('textFirstCell')).toEqual('No course available yet');
    expect(rows.at(2).prop('textSecondCell')).toBe(null);
    expect(rows.at(2).prop('isHeader')).toBe(false);
  });

  it('renders rows with course data', () => {
    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];
    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    const rows = wrapper.find('CourseListRow');
    expect(rows).toHaveLength(5); // 2 header rows + 3 course rows
    expect(rows.at(0).prop('textFirstCell')).toEqual('Available courses');
    expect(rows.at(1).prop('textFirstCell')).toEqual('Course name');
    expect(rows.at(2).prop('textFirstCell')).toEqual('ES6');
    expect(rows.at(2).prop('textSecondCell')).toEqual(60);
    expect(rows.at(3).prop('textFirstCell')).toEqual('Webpack');
    expect(rows.at(3).prop('textSecondCell')).toEqual(20);
    expect(rows.at(4).prop('textFirstCell')).toEqual('React');
    expect(rows.at(4).prop('textSecondCell')).toEqual(40);
  });
});
