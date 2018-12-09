<template>
    <div>
        <h1>Users List</h1>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
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
                    <h1 class="md-title">Users</h1>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head>ID</md-table-head>
                    <md-table-head>ชื่อ-นามสกุล</md-table-head>
                    <md-table-head>เลขประจำตัวประชาชน</md-table-head>
                    <md-table-head>อีเมล์</md-table-head>
                    <md-table-head>เบอร์โทรศัพท์</md-table-head>
                    <md-table-head>รูปบัตรประจำตัวประชาชน</md-table-head>
                    <md-table-head>วิดีโอใบหน้าปกติ</md-table-head>
                    <md-table-head>วิดีโอใบหน้าหลับตาซ้าย</md-table-head>
                    <md-table-head>วิดีโอใบหน้าหลับตาขวา</md-table-head>
                    <md-table-head>Facebook</md-table-head>
                </md-table-row>
                <md-table-row v-for="user in users.items" :key="user.ID">
                    <md-table-cell>{{user.ID}}</md-table-cell>
                    <md-table-cell>{{user.FirstName}} {{user.LastName}}</md-table-cell>
                    <md-table-cell>{{user.NationalID}}</md-table-cell>
                    <md-table-cell>{{user.Email}}</md-table-cell>
                    <md-table-cell>{{user.Tel}}</md-table-cell>
                    <md-table-cell><a @click="openDialog(user.IDCardImage,'image')">view</a></md-table-cell>
                    <md-table-cell><a @click="openDialog(user.FaceNormal,'video')">view</a></md-table-cell>
                    <md-table-cell><a @click="openDialog(user.FaceCloseLeftEye,'video')">view</a></md-table-cell>
                    <md-table-cell><a @click="openDialog(user.FaceCloseRightEye,'video')">view</a></md-table-cell>
                    <md-table-cell>{{user.FacebookID}}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>

        <md-dialog :md-active.sync="showDialog">
            <!-- <md-progress-bar md-mode="indeterminate" v-if="submitted" /> -->
            <!-- <md-dialog-title>{{Vending A1}}</md-dialog-title> -->
            <md-dialog-content>
                <iframe :src="viewFile" frameborder="0" v-if="viewFileType == 'video'"></iframe>
                <img style="width:600px;height:600px;" :src="viewFile" v-else />
            </md-dialog-content>
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
        showDialog: false,
        viewFileType: "image",
        viewFile: null
    }),
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    created () {
        this.getAllUsers();
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        }),
        openDialog(src, type) {
            this.viewFile = src
            this.viewFileType = type
            this.showDialog = true
        },
        closeDialog() {
            this.showDialog = false
        },
    }
};
</script>