(ns reddio-frontend.screens.listings.listings
  (:require [reagent.core :as r]
            [reddio-frontend.utilities.core :as u]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.components.loading-indicator :as loading-indicator]))

(defn listing-post [data post]
  [:div.listing-post
   [:p (:title post)]])

(defn listings-posts [data]
  (js/console.log "data" data)
  (let [posts (:posts data)
        fetch-more (:fetch-more data)]
    [:div.listings-posts
     [:h2 "Posts"]
     [:ul
      (for [post posts]
        ^{:key (:id post)} [listing-post data post])]
     [:button {:on-click #(fetch-more)}
      "Fetch more"]]))

(defn listings-pure [data]
  [:div.listings
   [:h1 "Listings"]
   (if (:loading data)
     [loading-indicator/loading-indicator]
     [listings-posts data])])

(defn listings-container [apollo-props]
  (let [props (u/kebab-case-keywordize-keys (js->clj apollo-props))
        data (:data props)]
    [listings-pure data]))

(def listings (-> (r/reactify-component listings-container)
                  (bridge/enhance-listings-query)
                  (r/adapt-react-class)))
