(ns reddio-frontend.components.react-player.core
  (:require [reagent.core :as r]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.lib.core :as lib]))

(defn clj-params->js-params [clj-params]
  (let [clj-yt-config (:youtube-config clj-params)
        clj-sc-config (:soundcloud-config clj-params)
        yt-config #js {:preload (:preload clj-yt-config)}
        sc-config #js {:clientId (:client-id clj-sc-config)
                       :showArtwork (:show-artwork clj-sc-config)}
        data (select-keys clj-params [:url
                                      :width
                                      :height
                                      :controls
                                      :playing
                                      :on-ready
                                      :on-start
                                      :on-play
                                      :on-progress
                                      :on-duration
                                      :on-pause
                                      :on-buffer
                                      :on-ended
                                      :on-error])]
    (merge data {:youtube-config yt-config
                 :soundcloud-config sc-config})))

(def react-player-adapter (r/adapt-react-class bridge/react-player))

(defn force-update-handler [handler]
  "Force a reagent render on player ended event"
  (handler)
  ;; since reagent batches renders using request animation frame callbacks
  ;; it won't render the react-player components if the tab is not focused.
  ;; this is a problem, particularly for skipping songs in the background.
  ;; as a workaround, we force all reagent components to re-render
  ;; on certain handler callbacks
  (js/setTimeout r/force-update-all 0))

(defn react-player [data]
  (let [on-ended #(force-update-handler (:on-ended data))
        on-error #(force-update-handler (:on-error data))
        data-with-handler (merge data {:on-ended on-ended
                                       :on-error on-error})]
    [react-player-adapter (clj-params->js-params data-with-handler)]))
