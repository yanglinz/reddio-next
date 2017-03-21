(ns reddio-frontend.screens.listings.listings
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [reddio-frontend.utilities.core :as u]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.components.loading-indicator :as loading-indicator]))

(defn listings-sort [sort-type sort-range]
  [:div.listing-sort
   [:h2 "sort type: " sort-type]
   [:h2 "sort range: " sort-range]
   [:ul
    [:li {:on-click #(rf/dispatch [:set-sort-type :hot])} "hot"]
    [:li {:on-click #(rf/dispatch [:set-sort-type :new])} "new"]
    [:li {:on-click #(rf/dispatch [:set-sort-type :random])} "random"]]])

(defn listing-post [data post]
  (let [posts (:post data)]
    [:div.listing-post
     [:p
      {:on-click #(rf/dispatch [:play-post post posts])}
      (:title post)]]))

(defn listings-posts [data]
  (let [posts (:posts data)
        fetch-more-posts (:fetch-more-posts data)]
    [:div.listings-posts
     [:h2 "Posts"]
     [:ul
      (for [post (:posts data)]
        ^{:key (:name post)} [listing-post data post])]
     [:button {:on-click #(fetch-more-posts)}
      "Fetch more"]]))

(defn listings [data sort-type sort-range]
  [:div.listings
   [listings-sort sort-type sort-range]
   (if (:loading data)
     [loading-indicator/loading-indicator]
     [listings-posts data])])

(defn listings-container [apollo-props]
  (let [props (u/kebab-case-keywordize-keys (js->clj apollo-props))
        data (:data props)
        sort-type (:sortType props)
        sort-range (:sortRage props)]
    [listings data sort-type sort-range]))

(def main (-> (r/reactify-component listings-container)
              (bridge/enhance-listings-query)
              (r/adapt-react-class)))
