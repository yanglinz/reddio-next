export function fetchListing(listingPath) {
  const url = "https://www.reddit.com/.json?jsonp=fetchListing";
  const options = {
    method: "GET",
    redirect: "follow",
    jsonpCallbackFunction: "fetchListing",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  };
  return fetch(url, options).then(r => r.json());
}
