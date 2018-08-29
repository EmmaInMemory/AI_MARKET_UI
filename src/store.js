import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: {
    detailData: {},
    specification: {},
    dbots: [],
    categories: {},
    count: 0,
    current: 1,
    address: "",
    stateChannel: {
      status: "close", // syncing | open | close
      banlance: 0
    }
  },
  mutations: {
    [types.SET_DOC_DATA](state, data = {}) {
      state.specification = Object.freeze(data);
    },
    [types.SET_DBOTS](state, dbots = []) {
      state.dbots = Object.freeze(dbots);
    },
    [types.SET_COUNT](state, count = 0) {
      state.count = count;
    },
    [types.SET_CURRENT](state, current = 1) {
      state.current = current;
    },
    [types.SET_ADDRESS](state, address = "") {
      state.address = address;
    },
    [types.SET_DETAIL_DATA](state, payload = {}) {
      state.detailData = payload;
    },
    [types.SET_STATE_CHANNEL_BANLANCE](state, banlance) {
      state.stateChannel.banlance = banlance;
    },
    [types.SET_STATE_CHANNEL_STATUS](state, status) {
      state.stateChannel.status = status;
    },
    [types.SET_CATEGORIES](state, categories = {}) {
      state.categories = Object.freeze(categories);
    }
  },
  actions: {
    setDocData({ commit }, payload) {
      commit(types.SET_DOC_DATA, payload.data);
    },
    setDbots({ commit }, dbots) {
      const { data, count, current } = dbots;

      commit(types.SET_DBOTS, data);
      commit(types.SET_COUNT, count);
      commit(types.SET_CURRENT, current);
    },
    setAddress({ commit }, address) {
      commit(types.SET_ADDRESS, address);
    },
    setDetailData({ commit }, payload) {
      commit(types.SET_DETAIL_DATA, payload);
    },
    setStateChannel({ commit }, payload) {
      const { status, banlance } = payload;

      status && commit(types.SET_STATE_CHANNEL_STATUS, status);
      banlance && commit(types.SET_STATE_CHANNEL_BANLANCE, banlance);
    },
    setCategories({ commit }, categories) {
      commit(types.SET_CATEGORIES, categories);
    }
  },
  getters: {
    specification(state) {
      return state.specification;
    },
    count(state) {
      return state.count;
    },
    current(state) {
      return state.current;
    },
    dbots(state) {
      return state.dbots;
    },
    address(state) {
      return state.address;
    },
    addressInDetail(state) {
      return state.detailData.addr;
    },
    endpoints(state) {
      return state.detailData.endpoints || [];
    },
    stateChannelStatus(state) {
      return state.stateChannel.status;
    },
    stateChannelBanlance(state) {
      return state.stateChannel.banlance;
    },
    categories(state) {
      return state.categories;
    }
  }
});
