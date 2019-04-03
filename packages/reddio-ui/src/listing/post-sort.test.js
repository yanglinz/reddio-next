import {
  getSortType,
  getSortRange,
  resolveSortTypePath,
  resolveSortRangePath
} from "./post-list";

describe("getSortType", () => {
  it("should handle root path", () => {
    const location = { pathname: "/" };
    const sortType = getSortType(location);
    expect(sortType).toEqual("hot");
  });

  it("should handle root path with sortType", () => {
    const location = { pathname: "/top" };
    const sortType = getSortType(location);
    expect(sortType).toEqual("top");
  });

  it("should handle subreddit root", () => {
    const location = { pathname: "/r/music" };
    const sortType = getSortType(location);
    expect(sortType).toEqual("hot");
  });

  it("should handle subreddit with sortType", () => {
    const location = { pathname: "/r/music/top" };
    const sortType = getSortType(location);
    expect(sortType).toEqual("top");
  });

  // TODO: trailing slashes
  // TODO: multi-reddits
});

describe("getSortRange", () => {
  it("should get default sortRange", () => {
    const location = { pathname: "/", search: "" };
    const sortRange = getSortRange(location);
    expect(sortRange).toEqual("day");
  });

  it("should get sortRange", () => {
    const location = { pathname: "/", search: "?foo=bar&t=week" };
    const sortRange = getSortRange(location);
    expect(sortRange).toEqual("week");
  });
});

describe("resolveSortTypePath", () => {
  it("should handle root path and new sortType hot", () => {
    const location = { pathname: "/", search: "" };
    const path = resolveSortTypePath(location, "hot");
    expect(path).toEqual(location);
  });

  it("should handle root path and new sortType top", () => {
    const location = { pathname: "/", search: "" };
    const path = resolveSortTypePath(location, "top");
    expect(path).toEqual({ pathname: "/top", search: "" });
  });

  it("should handle root path with existing sortType and new sortType hot", () => {
    const location = { pathname: "/hot", search: "" };
    const path = resolveSortTypePath(location, "hot");
    expect(path).toEqual({ pathname: "/hot", search: "" });
  });

  it("should handle root path with existing sortType and new sortType top", () => {
    const location = { pathname: "/hot", search: "" };
    const path = resolveSortTypePath(location, "top");
    expect(path).toEqual({ pathname: "/top", search: "" });
  });

  it("should handle subreddit root and new sortType hot", () => {
    const location = { pathname: "/r/music", search: "" };
    const path = resolveSortTypePath(location, "hot");
    expect(path).toEqual({ pathname: "/r/music", search: "" });
  });

  it("should handle subreddit root and new sortType top", () => {
    const location = { pathname: "/r/music", search: "" };
    const path = resolveSortTypePath(location, "top");
    expect(path).toEqual({ pathname: "/r/music/top", search: "" });
  });

  it("should handle subreddit with existing sortType and new sortType hot", () => {
    const location = { pathname: "/r/music/hot", search: "" };
    const path = resolveSortTypePath(location, "hot");
    expect(path).toEqual({ pathname: "/r/music/hot", search: "" });
  });

  it("should handle subreddit with existing sortType and new sortType top", () => {
    const location = { pathname: "/r/music/hot", search: "" };
    const path = resolveSortTypePath(location, "top");
    expect(path).toEqual({ pathname: "/r/music/top", search: "" });
  });

  // TODO: trailing slashes
  // TODO: multi-reddits
});

describe("resolveSortRangePath", () => {
  it("should set new sortRange", () => {
    const location = { pathname: "/", search: "" };
    const path = resolveSortRangePath(location, "week");
    expect(path).toEqual({ pathname: "/", search: "?t=week" });
  });

  it("should override existing sortRange", () => {
    const location = { pathname: "/", search: "?t=day" };
    const path = resolveSortRangePath(location, "week");
    expect(path).toEqual({ pathname: "/", search: "?t=week" });
  });
});
