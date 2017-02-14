(ns reddio-frontend.screens.home
  (:require [reagent.core :as r]
            [reddio-frontend.bridge :as bridge]))

(defn top-subreddits-pure [props]
  [:div.top-subreddits
   [:h1 "Top Subreddits"]])

(defn top-subreddits-apollo [props]
  [top-subreddits-pure props])

(def top-subreddits (-> (r/reactify-component top-subreddits-apollo)
                        (bridge/enhance-home-top-subreddits-query)
                        (r/adapt-react-class)))
