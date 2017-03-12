(ns reddio-frontend.screens.player.player
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [reddio-frontend.bridge :as bridge]))

(def react-player-adapter (r/adapt-react-class bridge/react-player))

(defn main []
  (let [current-post @(rf/subscribe [:post])
        data {:url (:url current-post)
              :playing false}]
    (when current-post
      [:div.player
       [:h1 "Player"]
       [react-player-adapter data]])))
