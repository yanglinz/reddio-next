(ns reddio-frontend.screens.home.top-subreddits
  (:require [reagent.core :as r]
            [reddio-frontend.utilities.core :as u]
            [reddio-frontend.bridge :as bridge]))

(defn top-subreddits-pure [data]
  [:div.top-subreddits
   [:h1 "Top Subreddits"]])

(defn top-subreddits-container [apollo-props]
  (let [props (u/kebab-case-keywordize-keys (js->clj apollo-props))
        data (:data props)]
    [top-subreddits-pure data]))

(def top-subreddits (-> (r/reactify-component top-subreddits-container)
                        (bridge/enhance-home-top-subreddits-query)
                        (r/adapt-react-class)))
