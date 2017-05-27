(ns reddio-frontend.runner
  (:require [doo.runner :refer-macros [doo-tests]]
            [reddio-frontend.core-test]
            [reddio-frontend.lib.core-test]))

(doo-tests 'reddio-frontend.core-test
           'reddio-frontend.lib.core-test)
