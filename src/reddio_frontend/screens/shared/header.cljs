(ns reddio-frontend.screens.shared.header
  (:require))

(defn main []
  [:div.header.container-fluid
   [:div.row
    [:div.col-sm-3
     [:div.header-brand
      [:h1 "Reddio"]]]
    [:div.col-sm-6
     [:div.header-search
      [:h1 "Search"]]]
    [:div.col-sm-3
     [:div.header-nav
      [:h1 "Navigation"]]]]])
