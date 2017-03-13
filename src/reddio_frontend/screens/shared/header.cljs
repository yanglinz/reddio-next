(ns reddio-frontend.screens.shared.header
  (:require))

(defn main []
  [:div.header.container-fluid
   [:div.row
    [:div.col-sm-3
     [:div.brand
      [:a {:href "/"}
       [:h1
        [:span "Reddio"]
        [:span " "]
        [:span.accent "Player"]]]]]]])
