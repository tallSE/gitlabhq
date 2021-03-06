import { createLocalVue, shallowMount } from '@vue/test-utils';
import CommitsHeader from '~/vue_merge_request_widget/components/states/commits_header.vue';
import Icon from '~/vue_shared/components/icon.vue';

const localVue = createLocalVue();

describe('Commits header component', () => {
  let wrapper;

  const createComponent = props => {
    wrapper = shallowMount(localVue.extend(CommitsHeader), {
      localVue,
      sync: false,
      propsData: {
        isSquashEnabled: false,
        targetBranch: 'master',
        commitsCount: 5,
        ...props,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  const findHeaderWrapper = () => wrapper.find('.js-mr-widget-commits-count');
  const findCommitToggle = () => wrapper.find('.commit-edit-toggle');
  const findIcon = () => wrapper.find(Icon);
  const findCommitsCountMessage = () => wrapper.find('.commits-count-message');
  const findTargetBranchMessage = () => wrapper.find('.label-branch');
  const findModifyButton = () => wrapper.find('.modify-message-button');

  describe('when collapsed', () => {
    it('toggle has aria-label equal to Expand', () => {
      createComponent();

      expect(findCommitToggle().attributes('aria-label')).toBe('Expand');
    });

    it('has a chevron-right icon', () => {
      createComponent();
      wrapper.setData({ expanded: false });

      expect(findIcon().props('name')).toBe('chevron-right');
    });

    describe('when squash is disabled', () => {
      beforeEach(() => {
        createComponent();
      });

      it('has commits count message showing correct amount of commits', () => {
        expect(findCommitsCountMessage().text()).toBe('5 commits');
      });

      it('has button with modify merge commit message', () => {
        expect(findModifyButton().text()).toBe('Modify merge commit');
      });
    });

    describe('when squash is enabled', () => {
      beforeEach(() => {
        createComponent({ isSquashEnabled: true });
      });

      it('has commits count message showing one commit when squash is enabled', () => {
        expect(findCommitsCountMessage().text()).toBe('1 commit');
      });

      it('has button with modify commit messages text', () => {
        expect(findModifyButton().text()).toBe('Modify commit messages');
      });
    });

    it('has correct target branch displayed', () => {
      createComponent();

      expect(findTargetBranchMessage().text()).toBe('master');
    });
  });

  describe('when expanded', () => {
    beforeEach(() => {
      createComponent();
      wrapper.setData({ expanded: true });
    });

    it('toggle has aria-label equal to collapse', done => {
      wrapper.vm.$nextTick(() => {
        expect(findCommitToggle().attributes('aria-label')).toBe('Collapse');
        done();
      });
    });

    it('has a chevron-down icon', done => {
      wrapper.vm.$nextTick(() => {
        expect(findIcon().props('name')).toBe('chevron-down');
        done();
      });
    });

    it('has a collapse text', done => {
      wrapper.vm.$nextTick(() => {
        expect(findHeaderWrapper().text()).toBe('Collapse');
        done();
      });
    });
  });
});
