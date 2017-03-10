(ns reddio-frontend.screens.app
  (:require [re-frame.core :as rf]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.shared.header :as header]
            [reddio-frontend.screens.home.top-subreddits :as top-subreddits]
            [reddio-frontend.screens.listings.listings :as listings]))

(defn app []
  (let [route @(rf/subscribe [:route])]
    [:> bridge/root-provider
     [:div.app
      [header/main]
      (if (= route "/")
        [top-subreddits/main]
        [listings/main {:url-path route}])]]))
