(ns reddio-frontend.screens.home.top-subreddits
  (:require [reagent.core :as r]
            [reddio-frontend.utilities.core :as u]
            [reddio-frontend.bridge :as bridge]))

(defn subreddit-card [subreddit]
  [:div.subreddit-card
   [:h3 (:url-path subreddit)]])

(defn top-subreddits [data]
  (let [top-subreddits (:top-subreddits data)]
    [:div.top-subreddits.container-fluid
     [:div.row
      (for [subreddit top-subreddits]
        ^{:key (:id subreddit)}
        [:div.col-sm-4
         [subreddit-card subreddit]])]]))

(defn top-subreddits-container [apollo-props]
  (let [props (u/kebab-case-keywordize-keys (js->clj apollo-props))
        data (:data props)]
    [top-subreddits data]))

(def main (-> (r/reactify-component top-subreddits-container)
              (bridge/enhance-home-top-subreddits-query)
              (r/adapt-react-class)))
