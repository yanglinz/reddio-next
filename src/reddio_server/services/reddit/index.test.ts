import * as _ from 'lodash';

import * as r from './index';

describe('listing type predicates', () => {
  const subreddits = [
    '/r/listentothis/',
    '/r/metal/',
    '/r/hiphop/',
  ];

  const multireddits = [
    '/user/evilnight/m/truemusic/',
    '/user/evilnight/m/redditunes/',
    '/user/evilnight/m/thefountain/',
  ];

  const threads = [
    '/r/Metalcore/comments/68943v/periphery_stranger_things/',
    '/r/listentothis/comments/687rk5/potsu_im_closing_my_eyes_lofi_hiphop_2017/',
    '/r/vintageobscura/comments/68aic2/abaco_dream_cat_woman_us_weird_moog_funk_1969/',
  ];

  it('should detect subreddit', () => {
    _.each(subreddits, (s) => {
      expect(r.isSubreddit(s)).toEqual(true);
    });

    _.each(multireddits, (m) => {
      expect(r.isSubreddit(m)).toEqual(false);
    });

    _.each(threads, (t) => {
      expect(r.isSubreddit(t)).toEqual(false);
    });
  });

  it('should detect multireddit', () => {
    _.each(subreddits, (s) => {
      expect(r.isMultireddit(s)).toEqual(false);
    });

    _.each(multireddits, (m) => {
      expect(r.isMultireddit(m)).toEqual(true);
    });

    _.each(threads, (t) => {
      expect(r.isMultireddit(t)).toEqual(false);
    });
  });

  it('should detect comment thread', () => {
    _.each(subreddits, (s) => {
      expect(r.isCommentThread(s)).toEqual(false);
    });

    _.each(multireddits, (m) => {
      expect(r.isCommentThread(m)).toEqual(false);
    });

    _.each(threads, (t) => {
      expect(r.isCommentThread(t)).toEqual(true);
    });
  });
});
