(ns reddio-frontend.screens.listings.listings
  (:require [reagent.core :as r]
            [reddio-frontend.utilities.core :as u]
            [reddio-frontend.bridge :as bridge]))

(defn listings-pure [data]
  [:div.listings
   [:h1 "Listings"]])

(defn listings-container [apollo-props]
  (let [props (u/kebab-case-keywordize-keys (js->clj apollo-props))
        data (:data props)]
    [listings-pure data]))

(def listings (-> (r/reactify-component listings-container)
                  (bridge/enhance-listings-query)
                  (r/adapt-react-class)))
