<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <preLoader v-if="preLoader" />
          <div class="card" v-else>
            <div class="card-header text-center">Shipment List</div>
            <div class="form-row p-3">
              <div class="col-md-12 filter_feilds">
                <input
                  class="form-control"
                  type="text"
                  v-model="searchtable"
                  placeholder="Search by id"
                />
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover table-borderless">
                  <thead class="thead-light">
                    <tr>
                      <th>#</th>
                      <th>
                        <div class="sort-parent">
                          <div class="text-left">ID</div>
                          <div class="ml-1">
                            <i
                              v-if="sort.asc == true"
                              class="fa fa-sort-up cursor-pointer"
                              @click="sortBy('Asending','id')"
                            ></i>
                            <i
                              v-if="sort.dsc == true"
                              class="fa fa-sort-down cursor-pointer"
                              @click="sortBy('Desending','id')"
                            ></i>
                          </div>
                        </div>
                      </th>
                      <th>
                        <div class="sort-parent">
                          <div class="text-left">Name</div>
                          <!-- sorting -->
                          <div class="ml-1">
                            <i
                              v-if="sort.asc == true"
                              class="fa fa-sort-up cursor-pointer"
                              @click="sortBy('Asending','name')"
                            ></i>
                            <i
                              v-if="sort.dsc == true"
                              class="fa fa-sort-down cursor-pointer"
                              @click="sortBy('Desending','name')"
                            ></i>
                          </div>
                        </div>
                      </th>
                      <th>
                        <div class="sort-parent">
                          <div class="text-left">Mode</div>
                          <!-- sorting -->
                          <div class="ml-1">
                            <i
                              v-if="sort.asc == true"
                              class="fa fa-sort-up cursor-pointer"
                              @click="sortBy('Asending','mode')"
                            ></i>
                            <i
                              v-if="sort.dsc == true"
                              class="fa fa-sort-down cursor-pointer"
                              @click="sortBy('Desending','mode')"
                            ></i>
                          </div>
                        </div>
                      </th>
                      <th>Type</th>
                      <th>Origin</th>
                      <th>Status</th>
                      <th>
                        <!-- sorting -->
                        <div class="sort-parent">
                          <div class="text-left">User ID</div>
                          <div class="ml-1">
                            <i
                              v-if="sort.asc == true"
                              class="fa fa-sort-up cursor-pointer"
                              @click="sortBy('Asending','userId')"
                            ></i>
                            <i
                              v-if="sort.dsc == true"
                              class="fa fa-sort-down cursor-pointer"
                              @click="sortBy('Desending','userId')"
                            ></i>
                          </div>
                        </div>
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(shipment,i) in filterData" :key="i">
                      <td>{{ i+1 }}</td>
                      <td class>
                        <router-link
                          :to="{ name: 'detail', params: { id: shipment.id }}"
                        >{{ shipment.id }}</router-link>
                      </td>
                      <td>{{ shipment.name}}</td>
                      <td>{{ shipment.mode}}</td>
                      <td>{{ shipment.type}}</td>
                      <td>{{ shipment.origin}}</td>
                      <td>{{ shipment.status}}</td>
                      <td>{{ shipment.userId}}</td>
                      <td>
                        <button
                          class="btn btn-sm btn-info"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          @click="edit(shipment)"
                        >Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="filterData.length ==0 ">
                <h4 class="text-center">No data found !</h4>
              </div>
              <div class="text-center" v-if="loadMore <= shipments.length && searchtable==''">
                <button @click="loadMore +=20" class="btn btn-outline-primary btn-sm">Load more</button>
              </div>
            </div>
            <div class="card-footer">
              <div class="text-center">Shipment List</div>
            </div>
          </div>
        </div>
      </div>

      <modal v-if="showModal" :data="modalData"></modal>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import { bus } from "../main";
import { mapGetters, mapActions, mapState } from "vuex";
import modal from "../components/homeModal";
import preLoader from "../components/preLoader";
export default {
  components: {
    modal,
    preLoader
  },
  data() {
    return {
      searchtable: "",
      loadMore: 20,
      sort: {
        value: "",
        asc: false,
        dsc: true
      },
      showModal: false,
      modalData: ""
    };
  },
  watch: {
    searchtable(newval) {
      this.searchtable = newval;
    }
  },

  created() {
    this.loadShipment();
  },
  mounted() {
    bus.$on("close", data => {
      this.showModal = data;
    });
  },

  computed: {
    ...mapGetters(["shipments"]),
    ...mapState(["preLoader"]),

    filterData() {
      if (this.searchtable.trim() != "") {
        return this.searchMethods();
      } else {
        return this.showMoreMethods();
      }
    }
  },
  methods: {
    ...mapActions(["loadShipment"]),

    searchMethods() {
      return this.shipments.filter(c =>
        c.id.toLowerCase().includes(this.searchtable.toLowerCase())
      );
    },
    showMoreMethods() {
      let totalLength = this.shipments.slice(0, this.loadMore);

      return totalLength;
    },
    sortBy(props, val) {
      this.sort.value = val;
      if (props == "Asending") {
        this.sort.asc = false;
        this.sort.dsc = true;
        return this.shipments.sort((a, b) =>
          a[this.sort.value] > b[this.sort.value] ? -1 : 1
        );
      } else {
        this.sort.asc = true;
        this.sort.dsc = false;
        return this.shipments.reverse();
      }
    },

    edit(shipment) {
      this.showModal = true;
      this.modalData = shipment;
    }
  }
};
</script>
<style lang="scss">
.link:hover {
  text-decoration: underline !important;
  cursor: pointer;
  color: blue;
}
.sort-parent {
  display: flex;
  .cursor-pointer {
    cursor: pointer;
  }
}
</style>