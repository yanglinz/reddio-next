(ns reddio-frontend.screens.app
  (:require [re-frame.core :as rf]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.shared.header :as header]
            [reddio-frontend.screens.home.top-subreddits :as top-subreddits]
            [reddio-frontend.screens.listings.listings :as listings]
            [reddio-frontend.screens.player.player :as player]))

(defn app []
  (let [route @(rf/subscribe [:route])
        sort-type @(rf/subscribe [:sort-type])
        sort-range @(rf/subscribe [:sort-range])]
    [:> bridge/root-provider
     [:div.app
      [header/main]
      (if (= route "/")
        [top-subreddits/main]
        [listings/main {:url-path route
                        :sort-type sort-type
                        :sort-range sort-range}])
      [player/main]]]))
