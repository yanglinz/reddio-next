import { resolveSortTypePath } from "./PostListSort";

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
});
