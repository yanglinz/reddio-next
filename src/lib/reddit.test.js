import {
  getCleanedPathname,
  getSortType,
  getSortRange,
  resolveSortTypePath,
  resolveSortRangePath
} from "./reddit";

describe("getCleanedPathname", () => {
  it("should handle a subreddit", () => {
    const path = "/r/listentothis";
    const cleaned = getCleanedPathname(path);
    expect(cleaned).toEqual("/r/listentothis");
  });

  it("should handle a subreddit with sortType", () => {
    const path = "/r/listentothis/new";
    const cleaned = getCleanedPathname(path);
    expect(cleaned).toEqual("/r/listentothis");
  });

  it("should handle a subreddit with sortRange", () => {
    const path = "/r/listentothis/top/?t=week";
    const cleaned = getCleanedPathname(path);
    expect(cleaned).toEqual("/r/listentothis");
  });
});

describe("getSortType", () => {
  it("should handle root path", () => {
    const path = "/";
    const sortType = getSortType(path);
    expect(sortType).toEqual("hot");
  });

  it("should handle root path with sortType", () => {
    const path = "/top";
    const sortType = getSortType(path);
    expect(sortType).toEqual("top");
  });

  it("should handle subreddit root", () => {
    const path = "/r/music";
    const sortType = getSortType(path);
    expect(sortType).toEqual("hot");
  });

  it("should handle subreddit with sortType", () => {
    const path = "/r/music/top";
    const sortType = getSortType(path);
    expect(sortType).toEqual("top");
  });

  // TODO: trailing slashes
  // TODO: multi-reddits
});

describe("getSortRange", () => {
  it("should get default sortRange", () => {
    const path = "/";
    const sortRange = getSortRange(path);
    expect(sortRange).toEqual("day");
  });

  it("should get sortRange", () => {
    const path = "/?foo=bar&t=week";
    const sortRange = getSortRange(path);
    expect(sortRange).toEqual("week");
  });
});

describe("resolveSortTypePath", () => {
  it("should handle root path and new sortType hot", () => {
    const path = "/";
    const resolved = resolveSortTypePath(path, "hot");
    expect(resolved).toEqual("/");
  });

  it("should handle root path and new sortType top", () => {
    const path = "";
    const resolved = resolveSortTypePath(path, "top");
    expect(resolved).toEqual("/top");
  });

  it("should handle root path with existing sortType and new sortType hot", () => {
    const path = "/hot";
    const resolved = resolveSortTypePath(path, "hot");
    expect(resolved).toEqual("/hot");
  });

  it("should handle root path with existing sortType and new sortType top", () => {
    const path = "/hot";
    const resolved = resolveSortTypePath(path, "top");
    expect(resolved).toEqual("/top");
  });

  it("should handle subreddit root and new sortType hot", () => {
    const path = "/r/music";
    const resolved = resolveSortTypePath(path, "hot");
    expect(resolved).toEqual("/r/music");
  });

  it("should handle subreddit root and new sortType top", () => {
    const path = "/r/music";
    const resolved = resolveSortTypePath(path, "top");
    expect(resolved).toEqual("/r/music/top");
  });

  it("should handle subreddit with existing sortType and new sortType hot", () => {
    const path = "/r/music/hot";
    const resolved = resolveSortTypePath(path, "hot");
    expect(resolved).toEqual("/r/music/hot");
  });

  it("should handle subreddit with existing sortType and new sortType top", () => {
    const path = "/r/music/hot";
    const resolved = resolveSortTypePath(path, "top");
    expect(resolved).toEqual("/r/music/top");
  });

  // TODO: trailing slashes
  // TODO: multi-reddits
});

describe("resolveSortRangePath", () => {
  it("should set new sortRange", () => {
    const path = "/";
    const resolved = resolveSortRangePath(path, "week");
    expect(resolved).toEqual("/?t=week");
  });

  it("should override existing sortRange", () => {
    const path = "/?t=day";
    const resolved = resolveSortRangePath(path, "week");
    expect(resolved).toEqual("/?t=week");
  });

  it("should set new subreddit sortRange", () => {
    const path = "/r/listentothis";
    const resolved = resolveSortRangePath(path, "week");
    expect(resolved).toEqual("/r/listentothis?t=week");
  });

  it("should override subreddit existing sortRange", () => {
    const path = "/r/listentothis/?t=day";
    const resolved = resolveSortRangePath(path, "week");
    expect(resolved).toEqual("/r/listentothis/?t=week");
  });
});
