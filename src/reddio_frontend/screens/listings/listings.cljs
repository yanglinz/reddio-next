(ns reddio-frontend.screens.listings.listings
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [reddio-frontend.utilities.core :as u]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.components.loading-indicator :as loading-indicator]))

(defn listings-sort []
  (let [current-sort-type @(rf/subscribe [:sort-type])
        current-sort-range @(rf/subscribe [:sort-range])
        sort-types [:new
                    :rising
                    :hot
                    :top]
        sort-ranges [:hour
                     :day
                     :month
                     :year
                     :all]]
    [:div.listing-sort
     [:ul
      (for [sort-type sort-types]
        ^{:key sort-type}
        [:li {:on-click #(rf/dispatch [:set-sort-type sort-type])}
         (if (= sort-type current-sort-type)
           [:b sort-type]
           [:span sort-type])])]
     (if (= current-sort-type :top)
       [:ul
        (for [sort-range sort-ranges]
          ^{:key sort-range}
          [:li {:on-click #(rf/dispatch [:set-sort-range sort-range])}
           (if (= sort-range current-sort-range)
             [:b sort-range]
             [:span sort-range])])])]))

(defn listing-post [data post]
  (let [posts (:posts data)]
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

(defn listings [data]
  [:div.listings
   [listings-sort]
   (if (:loading data)
     [loading-indicator/loading-indicator]
     [listings-posts data])])

(defn listings-container [apollo-props]
  (let [props (u/kebab-case-keywordize-keys (js->clj apollo-props))
        data (:data props)]
    [listings data]))

(def main (-> (r/reactify-component listings-container)
              (bridge/enhance-listings-query)
              (r/adapt-react-class)))
