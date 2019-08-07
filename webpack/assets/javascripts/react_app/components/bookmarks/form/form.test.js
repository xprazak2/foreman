import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import React from 'react';
import BookmarkForm from './BookmarkForm';
import { IntegrationTestHelper } from 'react-redux-test-utils';

function setup() {
  const props = {
    controller: 'hosts',
    url: '/api/bookmarks',
    onCancel: jest.fn(),
    submitForm: jest.fn(() => Promise.resolve(true)),
    initialValues: { public: true, query: '', name: '' },
  };

  const wrapper = mount(<BookmarkForm {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('bookmark form', () => {
  it('should include the correct initial values', () => {
    const { wrapper } = setup();

    expect(wrapper.find('BookmarkForm').props().initialValues).toEqual({
      public: true,
      query: '',
      name: '',
    });
  });
  it('should render the entire form', () => {
    const { wrapper } = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should allow creating a private bookmark', async () => {
    const { wrapper, props } = setup();

    wrapper
      .find('input[name="name"]')
      .simulate('change', { target: { name: 'name', value: 'Joe' } });
    wrapper
      .find('textarea[name="query"]')
      .simulate('change', { target: { name: 'query', value: 'search' } });
    wrapper
      .find('input[name="public"]')
      .simulate('change', { target: { name: 'public', value: false } });

    wrapper.find('form').simulate('submit');

    expect(wrapper.find('.spinner')).toHaveLength(1);
    await IntegrationTestHelper.flushAllPromises();
      expect(props.submitForm).toHaveBeenCalledWith({
        item: 'Bookmark',
        url: '/api/bookmarks',
        values: {
          controller: 'hosts',
          name: 'Joe',
          public: false,
          query: 'search',
        },
      });
    props.submitForm.mockReset();
    props.submitForm.mockRestore();
  });
  it('should not allow to submit an invalid bookmark', () => {
    const { wrapper } = setup();
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(true);
  });
  it('should allow submitting a bookmark with a dot', async () => {
    const { wrapper, props } = setup();

    wrapper
      .find('input[name="name"]')
      .simulate('change', { target: { name: 'name', value: 'Joe.D' } });
    wrapper
      .find('textarea[name="query"]')
      .simulate('change', { target: { name: 'query', value: 'search' } });
    wrapper
      .find('input[name="public"]')
      .simulate('change', { target: { name: 'public', value: false } });

    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.spinner')).toHaveLength(1);

    await IntegrationTestHelper.flushAllPromises();

    expect(props.submitForm).toHaveBeenCalledWith({
      item: 'Bookmark',
      url: '/api/bookmarks',
      values: {
        controller: 'hosts',
        name: 'Joe.D',
        public: false,
        query: 'search',
      },
    });
    props.submitForm.mockReset();
    props.submitForm.mockRestore();
  });
  it('should have "Cancel" button always enabled', () => {
    const { wrapper } = setup();
    expect(
      wrapper.find('button[className="btn btn-default"]').props().disabled
    ).toBe(false);
  });
  it('should convert params for submittion correctly', async () => {
    const { wrapper, props } = setup();

    wrapper
      .find('input[name="name"]')
      .simulate('change', { target: { name: 'name', value: 'Joe' } });
    wrapper
      .find('textarea[name="query"]')
      .simulate('change', { target: { name: 'query', value: 'search' } });
    wrapper
      .find('input[name="public"]')
      .simulate('change', { target: { name: 'public', value: true } });

    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.spinner')).toHaveLength(1);

    await IntegrationTestHelper.flushAllPromises();

    expect(props.submitForm).toHaveBeenCalledWith({
      item: 'Bookmark',
      url: '/api/bookmarks',
      values: {
        controller: 'hosts',
        name: 'Joe',
        public: true,
        query: 'search',
      },
    });
    props.submitForm.mockReset();
    props.submitForm.mockRestore();
  });
});
