(ns reddio-frontend.screens.listings.listings
  (:require [clojure.string :as string]
            [goog.string :as gstring]
            [reagent.core :as r]
            [re-frame.core :as rf]
            [reddio-frontend.utilities.core :as u]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.components.thumbnail :as thumbnail]
            [reddio-frontend.components.loading-indicator :as loading-indicator]))

(defn listings-info [data]
  (let [info (:info (:info (:listing data)))
        custom-info (:custom-info (:listing data))]
    [:div.listings-info
     [:h3.listings-title (:pathname custom-info)]
     [:p.listings-description.lead (:description custom-info)]
     [:p.listings-subcount (:subscribers info) " subscribers"]]))

(defn listings-sort []
  (let [current-sort-type @(rf/subscribe [:sort-type])
        current-sort-range @(rf/subscribe [:sort-range])
        sort-types [:new
                    :rising
                    :hot
                    :top]
        sort-ranges [:hour
                     :day
                     :week
                     :month
                     :year
                     :all]]
    [:div.listings-sort
     [:div.listings-sort-type
      [:select.custom-select
       {:value current-sort-type
        :on-change #(rf/dispatch [:set-sort-type (-> % .-target .-value keyword)])}
       (for [sort-type sort-types]
         ^{:key sort-type}
         [:option {:value sort-type} sort-type])]]
     (when (= current-sort-type :top)
       [:div.listings-sort-range
        [:select.custom-select
         {:value current-sort-range
          :on-change #(rf/dispatch [:set-sort-range (-> % .-target .-value keyword)])}
         (for [sort-range sort-ranges]
           ^{:key sort-range}
           [:option {:value sort-range} sort-range])]])]))

(defn listings-post [data current-post post]
  (let [posts (:posts (:listing data))
        playable (u/playable? post)
        playing (= (:name post) (:name current-post))]
    [:div.listings-post
     {:class (string/join " " [(if playable "playable" "unplayable")
                               (if playing "playing" "not-playing")])}
     [:div.post-thumbnail
      [thumbnail/thumbnail (:thumbnail post) {:width 65 :height 65}]]
     [:div.post-info
      [:div.post-title
       {:on-click
        #(when playable (rf/dispatch [:play-post post posts]))}
       (gstring/unescapeEntities (:title post))]
      [:div.post-metadata
       [:span (:score post) " points"]
       [:span.divider]
       [:span "submitted by " (:author post)]
       [:span.divider]
       [:span (:num-comments post)
        (if (= (:num-comments post) 1) " comment" " comments")]]]]))

(defn listings-posts [data]
  (let [current-post @(rf/subscribe [:post])
        posts (:posts (:listing data))
        fetch-more-posts (:fetch-more-posts data)]
    [:div
     [:div.listings-posts
      (for [post posts]
        ^{:key (:name post)} [listings-post data current-post post])]
     [:div.listings-load-more
      [:button.btn.btn-secondary {:on-click #(fetch-more-posts)}
       "Load More"]]]))

(defn listings [data]
  [:div.listings
   (if (:loading data)
     [loading-indicator/loading-indicator]
     [:div.container
      [listings-info data]
      [listings-sort]
      [listings-posts data]])])

(defn listings-container [apollo-props]
  (let [props (u/kebab-case-keywordize-keys (js->clj apollo-props))
        data (:data props)]
    [listings data]))

(def main (-> (r/reactify-component listings-container)
              (bridge/enhance-listings-query)
              (r/adapt-react-class)))
