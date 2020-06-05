<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="vuemodal"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Shipment</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-row p-3">
              <div class="col-md-12">
                <label for="name">Id: {{ data.id}}</label>
              </div>
              <div class="col-md-12">
                <label for="name">Name</label>
                <input class="form-control" type="text" v-model="name" placeholder="name" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary btn-sm" @click="save()">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import { bus } from "../main";
import { mapMutations } from "vuex";
export default {
  props: ["data"],
  data() {
    return {
      name: "",
      modalId: "#exampleModal"
    };
  },
  created() {
    this.name = this.data.name;
  },

  mounted() {
    $(document).ready(function() {
      $("#exampleModal").on("hidden.bs.modal", function() {
        bus.$emit("close", false);
      });
    });
  },
  methods: {
    //...mapActions(["updateShipment"]),
    ...mapMutations(["UPDATE_shipment"]),
    save() {
      this.data.name = this.name;

      this.UPDATE_shipment(this.data);
      this.name = "";
      $("#exampleModal").modal("hide");
    }
  }
};
</script>
