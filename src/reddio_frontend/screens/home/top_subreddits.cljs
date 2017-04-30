(ns reddio-frontend.screens.home.top-subreddits
  (:require [reagent.core :as r]
            [reddio-frontend.utilities.core :as u]
            [reddio-frontend.bridge :as bridge]))

(defn listing-card [listing]
  (let [posts (->> listing
                   :posts
                   (filter :thumbnail)
                   (take 5))]
    [:div.listing-card
     [:div.card
      [:div.card-thumbnail-list
       (for [post posts]
         ^{:key (:name post)}
         [:div.card-thumbnail
          [:img {:src (:thumbnail post)}]])]
      [:div.card-block
       [:h5.card-title
        [:a {:href (:pathname listing)}
         (:pathname listing)]]
       [:p.card-text (:description (:custom-info listing))]]]]))

(defn top-subreddits [data]
  (let [top-subreddits (:top-subreddits data)
        listings (:listings top-subreddits)]
    [:div.home-section.top-subreddits.container
     [:div.row.no-gutters
      [:div.col-sm-10.offset-sm-1
       [:div.row.no-gutters
        [:div.col-sm-12
         [:h2 "Featured Communities"]
         [:div.divider]
         [:p "Top subreddits"]]]
       [:div.row.no-gutters
        (for [listing listings]
          ^{:key (:pathname listing :custom-info)}
          [:div.col-sm-6.col-lg-4
           [listing-card listing]])]]]]))

(defn top-subreddits-container [apollo-props]
  (let [props (u/kebab-case-keywordize-keys (js->clj apollo-props))
        data (:data props)]
    [top-subreddits data]))

(def main (-> (r/reactify-component top-subreddits-container)
              (bridge/enhance-home-top-subreddits-query)
              (r/adapt-react-class)))
