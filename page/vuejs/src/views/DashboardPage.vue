<template>
    <div>
        <h1>Hi {{account.user.full_name}}!</h1>

        <div class="card-expansion">
            <md-card v-for="product in products" :key="product.id">
                <md-card-media>
                <img src="../assets/images/pexels-photo-73640.jpeg" alt="People">
                </md-card-media>

                <md-card-header>
                <div class="md-title">{{product.name}}</div>
                <div class="md-subhead">{{product.price}}</div>
                </md-card-header>

                <!-- <md-card-expand> -->
                <md-card-actions md-alignment="space-between">
                    <div>
                        <md-button>เพิ่ม</md-button>
                    </div>

                    <!-- <md-card-expand-trigger>
                    <md-button class="md-icon-button">
                        <md-icon>keyboard_arrow_down</md-icon>
                    </md-button>
                    </md-card-expand-trigger> -->
                </md-card-actions>
                <!-- </md-card-expand> -->
            </md-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .ota-status-log-container {
    height: 200px;
    border: solid #212121 1px;
    padding: 5px 10px 5px 10px;
    overflow: auto;
  }
  #ota-status-log {
    margin-bottom: 20px;
  }
</style>

<script>
import { mapState, mapActions } from "vuex";
// import * as emitterIO from "emitter-io";
// import moment from "moment";
// import _ from "lodash";
export default {
    data: () => ({
        products: [
            {id: 1, name: "carot", price: 100},
            {id: 2, name: "carot", price: 100},
            {id: 3, name: "carot", price: 100},
            {id: 4, name: "carot", price: 100},
            {id: 5, name: "carot", price: 100},
            {id: 6, name: "carot", price: 100},
            {id: 7, name: "carot", price: 100},
            {id: 8, name: "carot", price: 100},
            {id: 9, name: "carot", price: 100},
            {id: 10, name: "carot", price: 100}
        ],
        emitterClient: null,
        otaStatusLogs: "",
        vendingStatus: [],
        showDialog: false,
        otaVersion: '',
        hostVersion: '',
        uiVersion: '',
        selectedVending: ''
    }),
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    methods: {
        ...mapActions("users", {
            getAllUsers: "getAll",
            deleteUser: "delete"
        }),
        openDialog(id) {
            this.showDialog = true
            this.selectedVending = id
        },
        closeDialog() {
            this.showDialog = false
        }
    }
};
</script>