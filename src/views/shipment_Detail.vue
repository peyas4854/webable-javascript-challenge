<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <preLoader v-if="preLoader" />
          <div class="card" v-else>
            <div class="card-header text-center">Shipment Details</div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 text-left">
                  <p>
                    <b>Id</b>
                    : {{ shipments.id }}
                  </p>
                  <p>
                    <b>User Id</b>
                    : {{ shipments.userId }}
                  </p>
                  <p>
                    <b>Name</b>
                    : {{ shipments.name }}
                  </p>
                  <p>
                    <b>Mode</b>
                    : {{ shipments.mode }}
                  </p>
                  <p>
                    <b>destination</b>
                    : {{ shipments.destination}}
                  </p>
                  <p>
                    <b>Type</b>
                    : {{ shipments.type }}
                  </p>
                  <p>
                    <b>Origin</b>
                    : {{ shipments.origin }}
                  </p>
                  <p>
                    <b>Status</b>
                    : {{ shipments.status }}
                  </p>
                  <p>
                    <b>Total</b>
                    :{{ shipments.total }}
                  </p>
                </div>
                <div class="col-md- text-left">
                  <p>Cargo</p>
                  <div v-for="(cargo,i) in shipments.cargo " :key=" 'c'+i" class="cargo">
                    <ul>
                      <li v-if="cargo.type">Type:{{ cargo.type }}</li>
                      <li v-if="cargo.description">Description:{{ cargo.description }}</li>
                      <li v-if="cargo.volume ">Volume:{{ cargo.volume }}</li>
                    </ul>
                  </div>

                  <p>Services</p>

                  <div v-for="(service,i) in shipments.services " :key=" 's'+i" class="service">
                    <ul>
                      <li class v-if="service.type">Type: {{ service.type }}</li>
                      <li class v-if="service.value">Value: {{ service.value }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer text-center">Shipment Details</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from "axios";
import preLoader from "../components/preLoader";
export default {
  components: {
    preLoader
  },
  data() {
    return {
      shipments: [],
      preLoader: true
    };
  },
  async created() {
    try {
      const res = await axios.get(
        `http://localhost:3000/shipments/` + this.$route.params.id
      );

      this.shipments = res.data;
      this.preLoader = false;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style lang="scss" scoped >
.cargo,
.service {
  border: 1px soid black;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid black;
}
</style>