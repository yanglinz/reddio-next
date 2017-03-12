(ns reddio-frontend.screens.home.top-subreddits
  (:require [reagent.core :as r]
            [reddio-frontend.utilities.core :as u]
            [reddio-frontend.bridge :as bridge]))

(defn subreddit-card [subreddit]
  [:div.subreddit-card
   [:div.card
    [:div.card-thumbnail-list
     (for [post (:posts subreddit)]
       ^{:key (:name post)}
       [:div.card-thumbnail
        [:img {:src (:thumbnail post)}]])]
    [:div.card-block
     [:h3.card-title
      [:a {:href (:url-path subreddit)}
       (:url-path subreddit)]]
     [:p.card-text (:custom-description subreddit)]]]])

(defn top-subreddits [data]
  (let [top-subreddits (:top-subreddits data)]
    [:div.top-subreddits.container
     [:div.row.no-gutters
      [:div.col-sm-10.offset-sm-1
       [:div.row.no-gutters
        (for [subreddit top-subreddits]
          ^{:key (:id subreddit)}
          [:div.col-sm-6.col-lg-4
           [subreddit-card subreddit]])]]]]))

(defn top-subreddits-container [apollo-props]
  (let [props (u/kebab-case-keywordize-keys (js->clj apollo-props))
        data (:data props)]
    [top-subreddits data]))

(def main (-> (r/reactify-component top-subreddits-container)
              (bridge/enhance-home-top-subreddits-query)
              (r/adapt-react-class)))
