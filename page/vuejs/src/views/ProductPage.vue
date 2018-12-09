<template>
    <div>
        <!-- test -->
        <!-- <h1>Users List</h1> -->
        <!-- <em v-if="users.loading">Loading users...</em> -->
        <!-- <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span> -->
        <!-- <ul v-if="users.items">
            <li v-for="user in users.items" :key="user.ID">
                {{user.FullName}} ({{user.Email}})
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                <span v-else> - <a @click="deleteUser(user.ID)" class="text-danger">Delete</a></span>
            </li>
        </ul> -->
        <div>
            <md-table md-card>
                <md-table-toolbar>
                    <h1 class="md-title">รายการสินค้า</h1>
                    <md-button class="md-primary md-raised" @click="openDialog">เพิ่มสินค้า</md-button>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head>ID</md-table-head>
                    <md-table-head>ชื่อสินค้า</md-table-head>
                    <md-table-head>ประเภทสินค้า</md-table-head>
                    <md-table-head>ราคา 1 (/ชิ้น)</md-table-head>
                    <md-table-head>ราคา 2 (/ถุง 5k)</md-table-head>
                    <md-table-head>ราคา 3 (/ถุงใหญ่ 10k)</md-table-head>
                    <md-table-head></md-table-head>
                </md-table-row>
                <md-table-row v-for="product in products.items" :key="product.id">
                    <md-table-cell>{{product.id}}</md-table-cell>
                    <md-table-cell>{{product.name}}</md-table-cell>
                    <md-table-cell>-</md-table-cell>
                    <md-table-cell>{{product.price1}}</md-table-cell>
                    <md-table-cell>{{product.price2}}</md-table-cell>
                    <md-table-cell>{{product.price3}}</md-table-cell>
                    <md-table-cell>
                        <md-button class="md-primary md-dense md-raised" @click="openDialog">แก้ไข</md-button>
                        <md-button class="md-accent md-dense md-raised" @click="openDialog">ลบ</md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>

        <div>
            <div style="border:1px solid #000000;">
                <form novalidate class="md-layout" @submit.prevent="validateBeforeSubmit">
                    <md-dialog-content>
                        <!-- <md-field :class="{ 'md-invalid': errors.has('name') }">
                            <label for="name">ชื่อสินค้า</label>
                            <md-input type="input" name="name" id="name" v-model="product.name" v-validate="'required'" />
                            <span class="md-error" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                        </md-field> -->

                        <md-autocomplete v-model="selectedProduct" :md-options="productsList">
                            <label>ชื่อสินค้า</label>
                        </md-autocomplete>

                        <md-autocomplete v-model="selectedSupplier" :md-options="suppliersList">
                            <label>ราคา / หน่วย</label>
                        </md-autocomplete>

                        <md-autocomplete v-model="selectedSupplier" :md-options="suppliersList">
                            <label>ร้านค้า</label>
                        </md-autocomplete>

                        <md-autocomplete v-model="selectedSupplier" :md-options="suppliersList">
                            <label>เวลาจำหน่าย</label>
                        </md-autocomplete>

                        <!-- <md-field :class="{ 'md-invalid': errors.has('price1') }"> -->
                            <!-- <label for="price1">ราคา</label> -->
                            <!-- <md-input type="input" name="price1" id="price1" v-model="product.price1" v-validate="'required'" /> -->
                            <!-- <span class="md-error" v-show="errors.has('price1')">{{ errors.first('price1') }}</span> -->
                            <!-- unit dropdown -->
                        <!-- </md-field> -->
                        <!-- <md-field :class="{ 'md-invalid': errors.has('price2') }"> -->
                            <!-- <label for="price2">ร้านค้า</label> -->
                            <!-- <md-input type="input" name="price2" id="price2" v-model="product.price2" v-validate="'required'" /> -->
                            <!-- <span class="md-error" v-show="errors.has('price2')">{{ errors.first('price2') }}</span> -->
                        <!-- </md-field> -->
                        <!-- <md-field :class="{ 'md-invalid': errors.has('price3') }"> -->
                            <!-- <label for="price3">เวลาจำหน่าย</label> -->
                            <!-- <md-input type="input" name="price3" id="price3" v-model="product.price3" v-validate="'required'" /> -->
                            <!-- <span class="md-error" v-show="errors.has('price3')">{{ errors.first('price3') }}</span> -->
                            <!-- start -->
                            <!-- stop -->
                            <!-- all day price -->
                        <!-- </md-field> -->
                        <div style="width: 100%; text-align: right;">
                            <md-button class="md-default md-raised" @click="closeDialog">ปิด</md-button>
                            <md-button type="submit" class="md-primary md-raised">บันทึก</md-button>
                        </div>
                    </md-dialog-content>
                </form>
            </div>
        </div>

        <md-dialog :md-active.sync="showDialog">
            <md-progress-bar md-mode="indeterminate" v-if="submitted" />
            <md-dialog-title>เพิ่มสินค้า</md-dialog-title>
            <form novalidate class="md-layout" @submit.prevent="validateBeforeSubmit">
                <md-dialog-content>
                    <!-- <md-field :class="{ 'md-invalid': errors.has('name') }">
                        <label for="name">ชื่อสินค้า</label>
                        <md-input type="input" name="name" id="name" v-model="product.name" v-validate="'required'" />
                        <span class="md-error" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                    </md-field> -->

                    <md-autocomplete v-model="selectedProduct" :md-options="productsList">
                        <label>ชื่อสินค้า</label>
                    </md-autocomplete>

                    <md-autocomplete v-model="selectedSupplier" :md-options="suppliersList">
                        <label>ราคา / หน่วย</label>
                    </md-autocomplete>

                    <md-autocomplete v-model="selectedSupplier" :md-options="suppliersList">
                        <label>ร้านค้า</label>
                    </md-autocomplete>

                    <md-autocomplete v-model="selectedSupplier" :md-options="suppliersList">
                        <label>เวลาจำหน่าย</label>
                    </md-autocomplete>

                    <!-- <md-field :class="{ 'md-invalid': errors.has('price1') }"> -->
                        <!-- <label for="price1">ราคา</label> -->
                        <!-- <md-input type="input" name="price1" id="price1" v-model="product.price1" v-validate="'required'" /> -->
                        <!-- <span class="md-error" v-show="errors.has('price1')">{{ errors.first('price1') }}</span> -->
                        <!-- unit dropdown -->
                    <!-- </md-field> -->
                    <!-- <md-field :class="{ 'md-invalid': errors.has('price2') }"> -->
                        <!-- <label for="price2">ร้านค้า</label> -->
                        <!-- <md-input type="input" name="price2" id="price2" v-model="product.price2" v-validate="'required'" /> -->
                        <!-- <span class="md-error" v-show="errors.has('price2')">{{ errors.first('price2') }}</span> -->
                    <!-- </md-field> -->
                    <!-- <md-field :class="{ 'md-invalid': errors.has('price3') }"> -->
                        <!-- <label for="price3">เวลาจำหน่าย</label> -->
                        <!-- <md-input type="input" name="price3" id="price3" v-model="product.price3" v-validate="'required'" /> -->
                        <!-- <span class="md-error" v-show="errors.has('price3')">{{ errors.first('price3') }}</span> -->
                        <!-- start -->
                        <!-- stop -->
                        <!-- all day price -->
                    <!-- </md-field> -->
                    <div style="width: 100%; text-align: right;">
                        <md-button class="md-default md-raised" @click="closeDialog">ปิด</md-button>
                        <md-button type="submit" class="md-primary md-raised">บันทึก</md-button>
                    </div>
                </md-dialog-content>
            </form>
        </md-dialog>
    </div>
</template>

<style lang="scss" scoped>
  iframe {
    width: 600px;
    height: 600px;
  }
</style>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data: () => ({
        product: {
            id: '',
            name: '',
            price1: '',
            price2: '',
            price3: ''
        },
        showDialog: false,
        submitted: false,
        selectedProduct: null,
        productsList: [
            'Jim Halpert',
            'Dwight Schrute',
            'Michael Scott',
            'Pam Beesly',
            'Angela Martin',
            'Kelly Kapoor',
            'Ryan Howard',
            'Kevin Malone',
            'Creed Bratton',
            'Oscar Nunez',
            'Toby Flenderson',
            'Stanley Hudson',
            'Meredith Palmer',
            'Phyllis Lapin-Vance'
        ],
        selectedSupplier: null,
        suppliersList: [
            'Jim Halpert',
            'Dwight Schrute',
            'Michael Scott',
            'Pam Beesly',
            'Angela Martin',
            'Kelly Kapoor',
            'Ryan Howard',
            'Kevin Malone',
            'Creed Bratton',
            'Oscar Nunez',
            'Toby Flenderson',
            'Stanley Hudson',
            'Meredith Palmer',
            'Phyllis Lapin-Vance'
        ]
    }),
    computed: {
        ...mapState({
            products: state => state.products.all
        })
    },
    created () {
        this.getAllProducts();
    },
    methods: {
        ...mapActions('products', {
            getAllProducts: 'getAll',
            createSupplier: 'create',
            deleteUser: 'delete'
        }),
        openDialog() {
            this.showDialog = true
        },
        closeDialog() {
            this.showDialog = false
            this.submitted = false
            this.supplier = {
                id: '',
                name: '',
                price1: '',
                price2: '',
                price3: ''
            }
        },
        // eslint-disable-next-line
        handleSubmit () {
            this.submitted = true
            this.createProduct(this.product)
            this.closeDialog()
        },
        // eslint-disable-next-line
        validateBeforeSubmit(e) {
            e.preventDefault()
            this.$validator.validateAll().then((valid) => {
                if (valid) {
                    this.handleSubmit()
                }
            }).catch(() => {
                return false
            });
        },
    }
};
</script>