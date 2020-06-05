import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
Vue.use(VueAxios, axios);
export const store = new Vuex.Store({
    state: {
        shipment: [],
        preLoader: true,
    },
    getters: {
        shipments: (state) => state.shipment,
    },
    mutations: {
        SET_Data(state, data) {
            state.shipment = data;
            this.preLoader = false;
        },
        async UPDATE_shipment(state, updateData) {

            const result = await axios.put(
                `http://localhost:3000/shipments/${updateData.id}`,
                updateData
            );

            state.shipment = [...state.shipment, result.data];
        },
    },
    actions: {
        async loadShipment({
            commit,
            state
        }) {
            //   try {
            //     const res = axios.get(`http://localhost:3000/shipments`);
            //     commit("SET_Data", res.data);
            //   } catch (e) {
            //     console.error(e);
            //   }
            axios
                .get("http://localhost:3000/shipments")
                .then(function (response) {
                    // handle success

                    commit("SET_Data", response.data);
                    state.preLoader = false;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },


    },
    plugins: [createPersistedState()],
});