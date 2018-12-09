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
                    <h1 class="md-title">ซัพพลายเออร์</h1>
                    <md-button class="md-primary md-raised" @click="openDialog">เพิ่มซัพพลายเออร์</md-button>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head>ID</md-table-head>
                    <md-table-head>ประเภทซัพพลายเออร์</md-table-head>
                    <md-table-head>Code</md-table-head>
                    <md-table-head></md-table-head>
                </md-table-row>
                <md-table-row v-for="supplier in suppliers.items" :key="supplier.id">
                    <md-table-cell>{{supplier.id}}</md-table-cell>
                    <md-table-cell>{{supplier.type}}</md-table-cell>
                    <md-table-cell>{{supplier.code}}</md-table-cell>
                    <md-table-cell>
                        <md-button class="md-primary md-dense md-raised" @click="openDialog">แก้ไข</md-button>
                        <md-button class="md-accent md-dense md-raised" @click="openDialog">ลบ</md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>

        <md-dialog :md-active.sync="showDialog">
            <md-progress-bar md-mode="indeterminate" v-if="submitted" />
            <md-dialog-title>เพิ่มซัพพลายเออร์</md-dialog-title>
            <form novalidate class="md-layout" @submit.prevent="validateBeforeSubmit">
                <md-dialog-content>
                    <md-radio name="type" id="type" v-model="supplier.type" value="temp">ล๊อกเสียบ</md-radio>
                    <md-radio name="type" id="type" v-model="supplier.type" value="perm">ประจำ</md-radio>
                    <md-field :class="{ 'md-invalid': errors.has('code') }">
                        <label for="code">Code</label>
                        <md-input type="input" name="code" id="code" v-model="supplier.code" v-validate="'required'" />
                        <span class="md-error" v-show="errors.has('code')">{{ errors.first('code') }}</span>
                    </md-field>
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
        supplier: {
            id: '',
            type: 'temp',
            code: ''
        },
        showDialog: false,
        submitted: false
    }),
    computed: {
        ...mapState({
            suppliers: state => state.suppliers.all
        })
    },
    created () {
        this.getAllSuppliers();
    },
    methods: {
        ...mapActions('suppliers', {
            getAllSuppliers: 'getAll',
            createSupplier: 'create',
            deleteSupplier: 'delete'
        }),
        openDialog() {
            this.showDialog = true
        },
        closeDialog() {
            this.showDialog = false
            this.submitted = false
            this.supplier = {
                id: '',
                type: 'temp',
                code: ''
            }
        },
        // eslint-disable-next-line
        handleSubmit () {
            this.submitted = true
            this.createSupplier(this.supplier)
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