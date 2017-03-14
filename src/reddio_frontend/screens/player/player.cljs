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
      [:div
       [:div.player
        [:div.controls
         [:button "Previous"]
         [:button "Play"]
         [:button "Next"]]]
       [:div.iframe
        [react-player-adapter data]]])))
